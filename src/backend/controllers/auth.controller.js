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

// POST Создание токена на восстановление пароля
exports.forgetPassword = async (req, res, next) => {
    const { email } = req.body

    try {
        const user = await User.findOne({ email: email }, async function (err, user) {
            if(err) {
                return next(new ErrorResponse(err, 500))
            } else {
                const resetToken = await user.getResetPasswordToken()
                await user.save()

                log.info(`Recovery token successfully sent`)
                res.status(200).json({ success: true, token: resetToken })
            }
        })

        if(!user) {
            return next(new ErrorResponse('Token could not be send', 404))
        }
    } catch (err) {
        return next(new ErrorResponse(err, 500))
    }
}

// POST Восстановление пароля по токену
exports.resetPassword = async (req, res, next) => {
    const { resetToken, password } = req.body

    try {
        const user = User.findOne({ resetPasswordToken: resetToken }, async function (err, user) {
            if(err) {
                return next(new ErrorResponse(err, 500))
            } else {
                await user.update({ password: await user.getHashedPassword(password) })

                log.info(`Password successfully change by user ${user.email}`)
                res.status(200).json({ success: true, message: 'Password successfully changed' })
            }
        })

        if(!user) {
            return next(new ErrorResponse('User not found', 404))
        }
    } catch (err) {
        return next(new ErrorResponse(err, 500))
    }
}

// GET Получаем данные пользователя после авторизации / регистрации
exports.getUserData = async (req, res, next) => {
    const { userId } = req.body

    try {
        const user = User.findOne({ _id: userId }, async function (err, user) {
            if(err) {
                return next(new ErrorResponse(err, 500))
            } else {
                log.info(`✅ User data has been sent: \n ${user}`)
                res.status(200).json({ user: user })
            }
        })

        if(!user) {
            return next(new ErrorResponse('Database error, user not found', 500))
        }
    } catch (err) {
        return next(new ErrorResponse(err, 500))
    }
}

// GET Проверяем наличие пользователя
exports.checkUserExists = async (req, res, next) => {
    const { email } = req.body

    try {
        User.findOne({ email: email }, async function (err, user) {
            if(err) {
                return next(new ErrorResponse(err, 500))
            } else if (user) {
                log.err('User already exists')
                res.status(409).json({ message: 'User already exists' })
            } else {
                log.info(`Email available for registration`)
                res.status(200).json({ message: 'Email address available for registration' })
            }
        })
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
