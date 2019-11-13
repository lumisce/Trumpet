export default (sequelize, DataTypes) => {
	const Op = sequelize.Sequelize.Op
	var Trumpet = sequelize.define('Trumpet', {
		type: {
			type: DataTypes.ENUM('TRUM', 'PET'),
			allowNull: false,
			validate: {
				notNull: true
			}
		},
		publishedAt: {
			type: DataTypes.DATE,
			validate: {
				isLaterThanNow(value) {
					if (Date(value) < Date.now()) {
						throw new Error('publishedAt must be later than now')
					}
				}
			}
		},
		// only pets
		content: {
			type: DataTypes.STRING,
			validate: {
				len: [0, 255]
			}
		},
		link: {
			type: DataTypes.TEXT,
			validate: {
				isUrl: true,
			}
		},
	}, {
		defaultScope: {
			attributes: {
				exclude: []
			}
		},
		underscored: true,
		tableName: 'trumpets'
	})

	Trumpet.associate = (models) => {
		Trumpet.User = Trumpet.belongsTo(models.User, 
			{foreignKey: { allowNull: false }})
		Trumpet.Histories = Trumpet.hasMany(models.TrumHistory, 
			{as: 'History'})	// only trums

		Trumpet.Prev = Trumpet.belongsTo(models.Trumpet, 
			{as: 'Prev', foreignKey: 'PrevId'})
		Trumpet.Nexts = Trumpet.hasMany(models.Trumpet,
			{as: 'Nexts', foreignKey: 'PrevId'})

		Trumpet.QuotedPet = Trumpet.belongsTo(models.Trumpet, 
			{as: 'QuotedPet', foreignKey: 'QuotedId'})
		Trumpet.Repets = Trumpet.hasMany(models.Trumpet, 
			{as: 'Repets', foreignKey: 'QuotedId'})

		Trumpet.Trum = Trumpet.belongsTo(models.Trumpet, 
			{as: 'Trum', foreignKey: 'TrumId'})
		Trumpet.Comments = Trumpet.hasMany(models.Trumpet, 
			{as: 'Comments', foreignKey: 'TrumId'})

		Trumpet.Likes = Trumpet.belongsToMany(models.User, 
			{as: 'LikedBy', through: models.Likes})
		Trumpet.Bookmarks = Trumpet.belongsToMany(models.User, 
			{as: 'BookmarkedBy', through: models.Bookmarks})
		Trumpet.Tags = Trumpet.belongsToMany(models.Tag, 
			{through: models.TrumpetTags})

		Trumpet.addScope('pet', {
			where: {
				type: 'PET'
			},
			include: [{
				association: Trumpet.Likes,
				attributes: ['username'],
			}, {
				association: Trumpet.Bookmarks,
				attributes: ['username'],
			}, {
				association: Trumpet.Tags,
				attributes: ['name']
			}]
		})

		Trumpet.addScope('published', {
			where: {
				publishedAt: {
					[Op.not]: null,
					[Op.lte]: new Date()
				}
			},
		})

		Trumpet.addScope('draft', {
			where: {
				publishedAt: null
			},
		})

		Trumpet.addScope('withUser', {
			include: [{
				association: Trumpet.User,
				attributes: ['username']
			}]
		})

	}

	return Trumpet
}
