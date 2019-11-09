import request from 'supertest'
import { expect } from 'chai'
import db from '../../src/models/index'
import userFactory from '../factories/user'


describe('Trumpet User API Tests', () => {
	let server
	before(async () => {
		server = await require('../../src/app')
		await db.sequelize.truncate()
		await userFactory(15)
	})
	
	it('returns an object from GET /api/users', async () => {
		const response = await request(server).get('/api/users')
		expect(response.status).to.equal(200)
		expect(response.body).to.be.an('object')
		const data = response.body.data
		expect(data).to.have.property('count')
		expect(data.count).to.be.a('number')
		expect(data).to.have.property('rows')
		expect(data.rows).to.be.an('array').that.has.lengthOf(10)
	})

	it('returns an object from GET /api/users?page=1&limit=5', async () => {
		const response = await request(server).get('/api/users?page=1&limit=5')
		expect(response.status).to.equal(200)
		expect(response.body).to.be.an('object')
		expect(response.body).to.have.property('data')
		const data = response.body.data
		expect(data).to.have.property('count')
		expect(data.count).to.be.a('number')
		expect(data).to.have.property('rows')
		expect(data.rows).to.be.an('array').that.has.lengthOf(5)
	})

	it('fails validation middleware in POST /api/users', async () => {
		const user = {
			username: 'a',
			email: 'abcexample.com',
			password: 'pass',
			passwordConfirmation: 'p'
		}
		const response = await request(server)
			.post('/api/users').send(user)
		expect(response.status).to.equal(422)
		expect(response.body).to.be.an('object')
		expect(response.body).to.have.property('errors')
		const errors = response.body.errors
		expect(errors).to.be.an('object')
		expect(errors).to.have.property('username')
		expect(errors).to.have.property('email')
		expect(errors).to.have.property('password')
		expect(errors).to.have.property('passwordConfirmation')
	})

	it('returns an object after creating user in POST /api/users', async () => {
		const user = {
			username: 'abc',
			email: 'abc@example.com',
			password: 'password',
			passwordConfirmation: 'password'
		}
		const response = await request(server)
			.post('/api/users').send(user)
		expect(response.status).to.equal(200)
		expect(response.body).to.be.an('object')
		expect(response.body).to.have.property('data')
		const data = response.body.data
		expect(data).to.be.an('object')
		expect(data).to.have.property('id').that.is.a('number')
		expect(data).to.have.property('username').that.is.a('string')
	})

	it('fails because duplicate username in POST /api/users', async () => {
		const user = {
			username: 'abc',
			email: 'abcdef@example.com',
			password: 'password',
			passwordConfirmation: 'password'
		}
		const response = await request(server)
			.post('/api/users').send(user)
		expect(response.status).to.equal(422)
		expect(response.body).to.be.an('object')
		expect(response.body).to.have.property('errors')
		const errors = response.body.errors
		expect(errors).to.be.an('object')
		expect(errors).to.have.property('username').that.is.a('string')
	})

})