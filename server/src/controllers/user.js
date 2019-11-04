import UserService from '../services/user'

module.exports.getUsers = async (req, res, next) => {
	let {page, limit, ...query} = req.query
	page = req.query.page ? req.query.page : 1
	limit = req.query.limit ? req.query.limit : 10

	try {
		let users = await UserService.getUsers(query, page, limit)
		return res.status(200).json({
			status: 200,
			data: users,
			message: 'Users Successfully Retrieved'
		})
	} catch (err) {
		next(err)
	}
}

module.exports.createUser = async (req, res, next) => {
	try {
		let id = await UserService.createUser(req.body)
		return res.status(200).json({
			status: 200,
			data: id,
			message: 'User Successfully Created'
		})
	} catch (err) {
		next(err)
	}
}