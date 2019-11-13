import db from '../models'
import bcrypt from 'bcrypt'

const User = db.User

exports.getUsers = async (query, page, limit) => {
	try {
		const offset = (page-1)*limit
		const users = await User.findAndCountAll({
			where: query, 
			limit: limit, 
			offset: offset
		})
		return users
	} catch (err) {
		console.log('Error in getUsers')
		throw(err)
	}
}

exports.createUser = async (data) => {
	const hashed = await bcrypt.hash(data.password, 10)
	const newData = {...data, password: hashed}
	try {
		const user = await User.create(newData)
		const {id, username, ...rest} = user
		return {id, username}
	} catch (err) {
		console.log('Error in createUser')
		throw(err)
	}
}

exports.hasUsername = async (username) => {
	try {
		const user = await User.findOne({where: {username}})
		return !!user
	} catch(err) {
		console.log('Error in hasUsername')
		throw(err)
	}
}

exports.hasEmail = async (email) => {
	try {
		const user = await User.findOne({where: {email}})
		return !!user
	} catch(err) {
		console.log('Error in hasEmail')
		throw(err)
	}
}

exports.getUser = async (id) => {
	try {
		const user = await db.User.findByPk(id)
		if (!user) {
			throw Error('No user')
		}
		return user
	} catch (err) {
		console.log('Error in getUser')
		throw(err)
	}
}