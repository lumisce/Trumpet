import AuthService from '../services/auth'

module.exports.login = async (req, res) => {
	try {
		const client = req.protocol+'://'+req.get('host')
		const data = await AuthService.login(req.body, client)
		return res.status(200).json({
			status: 200,
			data: data,
			message: 'User Logged In'
		})
	} catch (err) {
		return res.status(400).json({
			status: 400,
			message: err.message
		})
	}
}

module.exports.current = async (req, res) => {
	try {
		const user = await AuthService.getCurrentUser(req.user)
		return res.status(200).json({
			status: 200,
			data: user,
			message: 'Logged in User Returned'
		})
	} catch (err) {
		return res.status(400).json({
			status: 400,
			message: err.message
		})
	}
}