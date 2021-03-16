const express = require('express')
const log = require('./config/log4js.config')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const errorHandler = require('./src/backend/middleware/error.middleware')
const cors = require('cors')

connectDB()

const app = express()
dotenv.config()

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Api running')
})

app.use('/api/auth', require('./src/backend/routes/auth.route'))
app.use('/api/user', require('./src/backend/routes/user.route'))
app.use('/api/private', require('./src/backend/routes/private.route'))

app.use(errorHandler)

const PORT = process.env.PORT || 3030

const server = app.listen(PORT, () => {
    log.info(`🚀 Server listening on http://localhost:${PORT} 🚀`)
})

process.on("unhandledRejection", (err) => {
    log.error(`Logged error: ${err.message}`)
    server.close(() => process.exit(1))
})
