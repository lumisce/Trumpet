export default (sequelize, DataTypes) => {
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
		Trumpet.belongsTo(models.User, {foreignKey: { allowNull: false }})
		Trumpet.hasMany(models.TrumHistory, {as: 'History'})	// only trums

		Trumpet.belongsTo(models.Trumpet, {as: 'PrevTrumpet', foreignKey: 'prevTrumpetId'})
		Trumpet.hasMany(models.Trumpet, {as: 'NextTrumpets', foreignKey: 'prevTrumpetId'})

		Trumpet.belongsTo(models.Trumpet, {as: 'QuotedPet', foreignKey: 'quotedPetId'})
		Trumpet.hasMany(models.Trumpet, {as: 'Repets', foreignKey: 'quotedPetId'})

		Trumpet.belongsTo(models.Trumpet, {
			as: 'Trum',
			foreignKey: { name: 'trumId', allowNull: false },
		})
		Trumpet.hasMany(models.Trumpet, {as: 'Comments', foreignKey: 'trumId'})

		Trumpet.belongsToMany(models.User, {as: 'Likes', through: 'likes'})
		Trumpet.belongsToMany(models.User, {through: models.Bookmarks})
		Trumpet.belongsToMany(models.Tag, {through: 'trumpet_tags'})
	}

	return Trumpet
}
