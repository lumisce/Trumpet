import UserService from '../services/user'

module.exports.getUsers = async (req, res) => {
	let {page, limit, ...query} = req.query
	page = req.query.page ? req.query.page : 1
	limit = req.query.limit ? req.query.limit : 10
	console.log(query, page, limit)

	try {
		var users = await UserService.getUsers(query, page, limit)
		return res.status(200).json({
			status: 200,
			data: users,
			message: 'Users Successfully Retrieved'
		})
	} catch (err) {
		return res.status(400).json({
			status: 400,
			message: err.message
		})
	}
}

module.exports.createUser = async (req, res) => {
	try {
		var id = await UserService.createUser(req.body)
		return res.status(200).json({
			status: 200,
			data: id,
			message: 'User Successfully Created'
		})
	} catch (err) {
		return res.status(400).json({
			status: 400,
			message: err.message
		})
	}
}