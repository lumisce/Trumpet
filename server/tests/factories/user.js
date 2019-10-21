import faker from 'faker'
import db from '../../src/models/index'

const make = async (count=1, props={}) => {
	let data = []
	for (let i = 0; i < count; i++) {
		const defaultProps = {
			username: faker.random.word(),
			email: faker.internet.email(),
			password: 'password',
		}
		data.push({...defaultProps, ...props})
	}
	return data
}

export default async (count=1, props={}) => {
	const data = await make(count, props)
	db.User.bulkCreate(data)
}