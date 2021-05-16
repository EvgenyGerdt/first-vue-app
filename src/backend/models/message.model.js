const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    from: {
        type: String
    },
    to: {
      type: String
    },
    time: {
      type: Date,
      default: Date.now()
    },
    messageBody: {
        type: String
    }
})

const Message = mongoose.model("Message", MessageSchema)

module.exports = Message

