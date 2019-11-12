export default (sequelize, DataTypes) => {
	var TrumHistory = sequelize.define('TrumHistory', {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: true,
				len: [1, 255]
			}
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				notNull: true,
			}
		},
	}, {
		defaultScope: {
			attributes: {
				exclude: []
			}
		},
		underscored: true,
		tableName: 'trum_histories'
	})
	
	TrumHistory.associate = (models) => {
		TrumHistory.belongsTo(models.Trumpet, {foreignKey: { allowNull: false }})
	
		TrumHistory.hasMany(models.Image)
	}

	return TrumHistory
}
