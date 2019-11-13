import { mapErrors } from '../common/helpers'
import UserService from '../services/user'

exports.getUsers = async (req, res, next) => {
	let {page, limit, ...query} = req.query
	page = req.query.page ? req.query.page : 1
	limit = req.query.limit ? req.query.limit : 10

	try {
		let users = await UserService.getUsers(query, page, limit)
		return res.status(200).json({
			status: 200,
			data: users,
			message: 'Users Retrieved'
		})
	} catch (err) {
		next(err)
	}
}

exports.createUser = async (req, res, next) => {
	try {
		let id = await UserService.createUser(req.body)
		return res.status(200).json({
			status: 200,
			data: id,
			message: 'User Created'
		})
	} catch (err) {
		if (err.errors) {
			return res.status(422).json({
				errors: mapErrors(err.errors),
			})
		}
		next(err)
	}
}
