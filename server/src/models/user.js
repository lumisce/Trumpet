export default (sequelize, DataTypes) => {
	var User = sequelize.define('User', {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				len: [3, 32],
				is: /^\w+$/,
				notNull: true
			}
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
				notNull: true
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: true
			}
		},
		isPrivate: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	}, {
		defaultScope: {
			attributes: {
				exclude: ['password', 'createdAt', 'updatedAt']
			}
		},
		underscored: true,
		tableName: 'users'
	})
	
	User.associate = (models) => {
		User.hasMany(models.Trumpet)

		User.belongsToMany(models.User, 
			{as: 'Followings', foreignKey: 'following_id', through: models.Follows})
		User.belongsToMany(models.User, 
			{as: 'Followers', foreignKey: 'follower_id', through: models.Follows})
		
		User.belongsToMany(models.Trumpet, 
			{as: 'Liked', through: models.Likes})
		User.belongsToMany(models.Trumpet, 
			{as: 'Bookmarked', through: models.Bookmarks})
	}

	return User
}
