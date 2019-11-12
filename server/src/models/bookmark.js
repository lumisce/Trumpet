export default (sequelize, DataTypes) => {
	var Bookmarks = sequelize.define('Bookmarks', {
		// only trums
		lineNumber: {
			type: DataTypes.INTEGER,
		},
	}, {
		defaultScope: {
			attributes: {
				exclude: ['updatedAt']
			}
		},
		underscored: true,
		tableName: 'bookmarks'
	})
	
	return Bookmarks
}
