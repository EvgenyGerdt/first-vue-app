const User = require('../models/user.model')
const log = require('../../../config/log4js.config')
const dotenv = require('dotenv')

const ErrorResponse = require('../utils/errorResponse')

dotenv.config()

// POST Регистрация пользователя
exports.register = async (req, res, next) => {
    const { email, password } = req.body
    try {
        User.findOne({ email: email }, async (err, user) => {
            if(err) {
                return next(new ErrorResponse(err.message, 500))
            } else if(user) {
                return next(new ErrorResponse('User already exists'), 400)
            } else {
                const user = await User.create({
                    email, password
                })

                await sendToken(user, 201, res)
            }
        })
    } catch (err) {
        return next(new ErrorResponse(err.message, 500))
    }
}

// POST Аутентификация пользователя
exports.login = async (req, res, next) => {
    const authCandidate = {
        email: req.body.email,
        password: req.body.password
    }

    if(!authCandidate.email || !authCandidate.password) {
        return next(new ErrorResponse("Please provide an email and password", 400))
    }

    try {
        await User.findOne({ email: authCandidate.email }, async (err, user) => {
            if(err) {
                return next(new ErrorResponse(err, 500))
            }
            if(!user) {
                return next(new ErrorResponse(`Invalid credentials, USER: ${authCandidate.email}`, 400))
            } else {
                const isMatch = await user.matchPasswords(authCandidate.password)

                if(!isMatch) {
                    return next(new ErrorResponse(`Invalid credentials, USER: ${authCandidate.email}`, 404))
                } else {
                    await sendToken(user, 200, res)
                }
            }
        }).select("password")
    } catch (err) {
        return next(new ErrorResponse(err, 500))
    }
}

exports.forgetPassword = async (req, res, next) => {
    const { email } = req.body

    try {
        const user = await User.findOne({ email: email }, async function (err, user) {
            if(err) {
                return next(new ErrorResponse(err, 500))
            } else {
                const resetToken = user.resetPasswordToken
                await user.save()

                const resetUrl = `http://localhost:3030/passwordreset/${resetToken}`

                log.info(`Recovery link successfully sent`)
                res.status(200).json({ success: true, link: resetUrl })
            }
        })

        if(!user) {
            return next(new ErrorResponse('Email could not be send', 404))
        }
    } catch (err) {
        return next(new ErrorResponse(err, 500))
    }
}

const sendToken = async (user, statusCode, res) => {
    const token = await user.getSignedJwtToken()
    log.info(`✅ User connected to server: \n ${user}`)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(statusCode).json({ success: true, token: token, user: user })
}