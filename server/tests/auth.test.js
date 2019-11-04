import request from 'supertest'
import { expect } from 'chai'
import db from '../src/models/index'
import userFactory from './factories/user'



describe('Trumpet Auth API Tests', () => {
	let server
	before(async () => {
		server = await require('../src/app')
		await db.sequelize.truncate()
		await userFactory(15)
		await userFactory(1, {
			username: 'applepie',
			email: 'apple@pie.com',
		})
	})
	
	it('fails validation in POST /api/auth/login', async () => {
		const user = {
			email: 'a',
		}
		const response = await request(server)
			.post('/api/auth/login').send(user)
		expect(response.status).to.equal(422)
		expect(response.body).to.be.an('object')
		expect(response.body).to.have.property('errors')
		const errors = response.body.errors
		expect(errors).to.be.an('object')
		expect(errors).to.have.property('email')
		expect(errors).to.have.property('password')
	})

	it('fails find model in POST /api/auth/login', async () => {
		const user = {
			email: 'a@pie.com',
			password: 'password'
		}
		const response = await request(server)
			.post('/api/auth/login').send(user)
		expect(response.status).to.equal(404)
	})

	it('fails password check in POST /api/auth/login', async () => {
		const user = {
			email: 'apple@pie.com',
			password: 'pass',
		}
		const response = await request(server)
			.post('/api/auth/login').send(user)
		expect(response.status).to.equal(404)
	})

	it('returns an object from POST /api/auth/login', async () => {
		const user = {
			email: 'apple@pie.com',
			password: 'password',
		}
		const response = await request(server)
			.post('/api/auth/login').send(user)
		expect(response.status).to.equal(200)
		expect(response.body).to.be.an('object')

		expect(response.body).to.have.property('data')
		const data = response.body.data
		expect(data).to.be.an('object')
		expect(data).to.have.property('user')
		expect(data).to.have.property('token')
	})

	it('fails in GET /api/auth/curr', async () => {
		const response = await request(server).get('/api/auth/curr')
		expect(response.status).to.equal(403)
		expect(response.body).to.be.an('object')
	})

	it('returns an object from GET /api/auth/curr after login', async () => {
		const user = {
			email: 'apple@pie.com',
			password: 'password',
		}
		const loginResponse = await request(server)
			.post('/api/auth/login').send(user)
		const token = loginResponse.body.data.token

		const response = await request(server)
			.get('/api/auth/curr')
			.set('Authorization', 'Bearer '+token)
		expect(response.status).to.equal(200)
		expect(response.body).to.be.an('object')
		const data = response.body.data
		expect(data).to.have.property('user')
		expect(data.user).to.have.property('id')
	})

})