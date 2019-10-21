import { expect } from 'chai'
import config from 'config'

let server
before(async () => {
	server = await require('../src/app')
})

describe('Server', () => {
	it('tests that server is running at current port', async () => {
		expect(server.port).to.equal(config.get('port'))
	})
})
