import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/api/hello', (req,res) => {
	res.send({ express: 'hello from express' })
})

app.post('/api/world', (req, res) => {
	console.log(req.body)
	res.send(`received your request ${req.body.post}`)
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})