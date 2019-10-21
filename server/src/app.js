import config from 'config'
import express from 'express'
import bodyParser from 'body-parser'
import models from './models/index'

const app = express()
const port = config.get('port')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

var userRouter = require('./routes/user')
app.use('/api/users', userRouter)

module.exports = (async () => {
	await models.sequelize.sync()
	const listen = app.listen(port, () => {
		console.log(`Listening on port ${port}`)
	})

	app.port = listen.address().port

	return app
})()