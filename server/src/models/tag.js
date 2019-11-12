export default (sequelize, DataTypes) => {
	var Tag = sequelize.define('Tag', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				is: /^\w+$/,
				notNull: true,
			}
		},
	}, {
		defaultScope: {
			attributes: {
				exclude: ['createdAt', 'updatedAt']
			}
		},
		underscored: true,
		tableName: 'tags'
	})
	
	Tag.associate = (models) => {
		Tag.belongsToMany(models.Trumpet, {through: 'trumpet_tags'})
	}

	return Tag
}
