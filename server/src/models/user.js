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
			default: false
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

		User.belongsToMany(models.User, {as: 'Followings', foreignKey: 'following_id', through: 'follows'})
		User.belongsToMany(models.User, {as: 'Followers', foreignKey: 'follower_id', through: 'follows'})
		
		User.belongsToMany(models.Trumpet, {as: 'Likes', through: 'likes'})
		User.belongsToMany(models.Trumpet, {through: models.Bookmarks})
	}

	return User
}
