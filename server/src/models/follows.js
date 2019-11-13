export default (sequelize) => {
	var Follows = sequelize.define('Follows', {
	}, {
		defaultScope: {
			attributes: {
				exclude: ['updatedAt']
			}
		},
		underscored: true,
		tableName: 'follows'
	})
	
	return Follows
}
