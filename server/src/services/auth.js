import db from '../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from 'config'

const User = db.User

exports.login = async ({password, ...data}, client) => {
	const user = await User.unscoped().findOne({where: data})
	if (!user) {
		throw Error('User not found')
	}

	const passwordMatches = await bcrypt.compare(password, user.password)
	if (!passwordMatches) {
		throw Error('User not found')
	}

	const token = jwtSign(user, client)

	return {
		user: {
			email: user.email,
			username: user.username,
		}, 
		token: token
	}
}

const jwtSign = (user, client) => {
	const data = {
		id: user.id,
		email: user.email
	}
	const signature = config.get('privatekey')
	const signOptions = {
		issuer: 'Trumpet',
		subject: user.email,
		audience: client,
		expiresIn: '12h',
		algorithm: 'RS256'
	}

	try {
		const token = jwt.sign(data, signature, signOptions)
		return token
	} catch (err) {
		throw Error('Cannot sign token')
	}
}

exports.jwtVerify = async (token, client) => {
	const publickey = config.get('publickey')
	const verifyOptions = {
		issuer: 'Trumpet',
		audience: client,
		expiresIn: '12h',
		algorithm: 'RS256'
	}
	try {
		const decoded = await jwt.verify(token, publickey, verifyOptions)
		return decoded
	} catch (err) {
		console.log(err)
		throw Error('Invalid token')
	}
}

exports.getCurrentUser = async (data) => {
	const user = await User.findOne({where: data})
	if (!user) {
		throw Error('User not found')
	}
	return {
		user: user
	}
}
