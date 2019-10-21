export default (sequelize, DataTypes) => {
	var User = sequelize.define('User', {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				len: [3, 32],
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
		}
	}, {
		defaultScope: {
			attributes: {
				exclude: ['password']
			}
		},
		tableName: 'users'
	})

	return User
}