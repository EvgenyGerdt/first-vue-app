const mongoose = require('mongoose')
const log = require('./log4js.config')
const dotenv = require('dotenv')

dotenv.config()

const URI = process.env.MONGO_DB

const connectDB = async () => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: true
    }, (err) => {
        if(err) {
            log.error(err)
        }
    })
    log.info("🚀 MongoDB successfully connected 🚀")
}

module.exports = connectDB
