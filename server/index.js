require('dotenv').config()
const express = require('express')
const http = require('http')
const WebSocket = require('ws')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const cron = require('node-cron')

const { sequelize } = require('./models')
const { authRouter, apiRouter } = require('./routes')
const processCookies = require('./utils/functions/process-cookie')
const cronFunction = require('./utils/functions/cron-function')

const app = express()
const origins = process.env.ALLOWED_ORIGINS.split(',')
app.use(
	cors({
		origin: function (origin, callback) {
			if (origins.indexOf(origin) !== -1 || !origin) {
				callback(null, true)
			} else {
				callback(new Error('Not allowed by CORS'))
			}
		},
		credentials: true,
	})
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/auth', authRouter)
app.use('/api', apiRouter)

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

cron.schedule('0 0 * * *', async () => {
	await cronFunction()
	wss.clients.forEach((client) => {
		client.send(JSON.stringify({ type: 'notification', message: 'refresh page' }))
	})
})

wss.on('connection', async (socket, req) => {
	const cookie = req.headers?.cookie
	if (!cookie) {
		// console.log('No cookies')
		socket.close()
	}
	const { id: userId } = processCookies(req.headers.cookie)
	socket.id = userId

	socket.on('close', () => {
		// console.log(`Client with id ${userId} disconnected`)
		socket.close()
	})
})

const PORT = 3000
server.listen(PORT, async () => {
	await sequelize.authenticate()
	console.log('Connected to Database!!')
	console.log('Server is running on port:', PORT)
})
