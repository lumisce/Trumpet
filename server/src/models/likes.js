export default (sequelize) => {
	var Likes = sequelize.define('Likes', {
	}, {
		defaultScope: {
			attributes: {
				exclude: ['updatedAt']
			}
		},
		underscored: true,
		tableName: 'likes'
	})
	
	return Likes
}
