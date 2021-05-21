const User = require('../models/user.model')
const Message = require('../models/message.model')
const log = require('../../../config/log4js.config')
const dotenv = require('dotenv')

const ErrorResponse = require('../utils/errorResponse')

dotenv.config()

// GET Получаем список пользователей
exports.getUsersList = async (req, res, next) => {
    try {
        User.find({}, function (err, users) {
            if (err) {
                return next(new ErrorResponse(err, 500))
            } else if (!users) {
                return next(new ErrorResponse('Users not found', 404))
            } else {
                let userMap = {}
                users.forEach(function (user) {
                    userMap[user._id] = user
                })
                log.info('User list successfully sent')
                res.status(200).json({ users: users })
            }
        })
    } catch (err) {
        return next(new ErrorResponse(err, 500))
    }
}

// POST Изменяем username пользователя
exports.setUserData = async (req, res, next) => {
    const { username, userId } = req.body

    try {
        User.findOne({ username: username }, async function (err, user) {
            if(err) {
                return next(new ErrorResponse(err, 500))
            } else if (user) {
                return next(new ErrorResponse('Username already exists', 409))
            } else {
                User.findOne({ _id: userId }, async function (err, user) {if(err) {
                        return next(new ErrorResponse(err, 500))
                    } else if (!user) {
                        return next(new ErrorResponse('Database search error, user not found'))
                    } else {
                        await user.updateOne({ username: username })
                        log.info('Username successfully changed')
                        res.status(200).json({ message: 'Username successfully changed' })
                    }
                })
            }
        })
    } catch (err) {
        return next(new ErrorResponse(err, 500))
    }
}

// POST Отправляем сообщение пользователю
exports.sendMessage = async (req, res, next) => {
    const {from, to, messageBody} = req.body

    try {
        await Message.create({
            from, to, messageBody
        })

        log.info('Message has been send successfully!')

        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json({success: true})
    } catch(err) {
        return next(new ErrorResponse(err.message, 500))
    }
}

// POST получение сообщений
exports.getMessages = async (req, res, next) => {
    let { id } = req.body

    try {
        Message.find({$or:[{from: id},{to: id}]}, async function(err, messages) {
            if(err) {
                return next(new ErrorResponse(err, 500))
            } else {
                res.status(200).json({messages: messages})
            }
        })
    } catch(err) {
        return next(new ErrorResponse(err, 500))
    }
}
