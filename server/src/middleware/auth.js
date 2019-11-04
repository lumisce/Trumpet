import AuthService from '../services/auth'

export const verifyToken = async (req, res, next) => {
	if (!req.headers.authorization || req.headers.authorization.split(' ')[0] !== 'Bearer') {
		return res.status(403).json({
			status: 403,
			message: 'No token'
		})
	}
	req.client = req.protocol+'://'+req.get('host').split(':')[0]
	const token = req.headers.authorization.split(' ')[1]
	try {
		const jwtUser = await AuthService.jwtVerify(token, req.client)
		const user = {id: jwtUser.id, email: jwtUser.email}
		req.user = user
		return next()
	} catch (err) {
		return res.status(403).json({
			status: 403,
			message: err.message
		})
	}
}