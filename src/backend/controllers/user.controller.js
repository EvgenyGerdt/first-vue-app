const User = require('../models/user.model')
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
                User.findOne({ _id: userId }, async function (err, user) {
                    if(err) {
                        return next(new ErrorResponse(err, 500))
                    } else if (!user) {
                        return next(new ErrorResponse('Database search error, user not found'))
                    } else {
                        await user.update({ username: username })
                    }
                })
            }
        })
    } catch (err) {
        return next(new ErrorResponse(err, 500))
    }
}

