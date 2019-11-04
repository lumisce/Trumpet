import config from 'config'
import express from 'express'
import bodyParser from 'body-parser'
import models from './models/index'

import userRouter from './routes/user'
import authRouter from './routes/auth'

const app = express()
const port = config.get('port')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)

app.use((err, req, res) => {
	console.error(err.stack)
	res.status(500).send('Something went wrong.')
})

module.exports = (async () => {
	await models.sequelize.sync()
	const listen = app.listen(port, () => {
		console.log(`Listening on port ${port}`)
	})

	app.port = listen.address().port

	return app
})()