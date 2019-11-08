import AuthService from '../services/auth'

module.exports.login = async (req, res, next) => {
	try {
		const client = req.protocol+'://'+req.get('host').split(':')[0]
		const data = await AuthService.login(req.body, client)
		return res.status(200).json({
			status: 200,
			data: data,
			message: 'User Logged In'
		})
	} catch (err) {
		let code = 500
		switch (err.message) {
			case 'Invalid credentials':
				code = 404
				break
			default:
				next(err)
		}
		return res.status(code).json({
			status: code,
			message: err.message
		})
	}
}

module.exports.current = async (req, res, next) => {
	try {
		const user = await AuthService.getCurrentUser(req.user)
		return res.status(200).json({
			status: 200,
			data: user,
			message: 'Logged in User Returned'
		})
	} catch (err) {
		let code = 500
		switch (err.message) {
			case 'User not found':
				code = 404
				break
			default:
				next(err)
		}
		return res.status(code).json({
			status: code,
			message: err.message
		})
	}
}