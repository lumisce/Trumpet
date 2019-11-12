export default (sequelize, DataTypes) => {
	var Image = sequelize.define('Image', {
		location: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
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
		tableName: 'images'
	})
	
	Image.associate = (models) => {
		Image.belongsTo(models.Trumpet)		// pet
		Image.belongsTo(models.TrumHistory)		// trum
	}

	return Image
}
