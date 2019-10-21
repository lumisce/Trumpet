import db from '../models'
import bcrypt from 'bcrypt'

const User = db.User

exports.getUsers = async (query, page, limit) => {
	try {
		const offset = (page-1)*limit
		const users = await User.findAndCountAll({
			...query, 
			limit: limit, 
			offset: offset
		})
		console.log(users)
		return users
	} catch (err) {
		console.log(err)
		throw Error('Error in getUsers')
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
		console.log(err)
		throw Error('Error in createUser')
	}
}