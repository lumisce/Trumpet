import faker from 'faker'
import bcrypt from 'bcrypt'
import db from '../../src/models/index'

const make = async (count=1, props={}) => {
	let data = []
	const hashed = await bcrypt.hash('password', 10)
	let usernames = []
	let emails = []
	for (let i = 0; i < count; i++) {
		const defaultProps = {
			username: faker.random.word(),
			email: faker.internet.email(),
			password: hashed
		}
		let merged = {...defaultProps, ...props}
		if (usernames.includes(merged.username)) {
			console.log('duplicate username')
			merged.username += '2'
			console.log(merged)
		}
		if (emails.includes(merged.email)) {
			console.log('duplicate email')
			merged.email = merged.email.split('@')[0]+'2@'+merged.email.split('@')[1]
			console.log(merged)
		}
		usernames.push(merged.username)
		emails.push(merged.email)
		data.push(merged)
	}
	return data
}

export default async (count=1, props={}) => {
	const data = await make(count, props)
	return db.User.bulkCreate(data)
}