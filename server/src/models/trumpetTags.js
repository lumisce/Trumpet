export default (sequelize) => {
	var TrumpetTags = sequelize.define('TrumpetTags', {
	}, {
		defaultScope: {
			attributes: {
				exclude: ['updatedAt']
			}
		},
		underscored: true,
		tableName: 'trumpet_tags'
	})
	
	return TrumpetTags
}
