const ErrorResponse = require('../utils/errorResponse')
const log = require('../../../config/log4js.config')

const errorHandler = (err, req, res, next) => {
    let error = {...err}

    error.message = err.message

    log.error(`${err}`)

    if (err.code === 11000) {
        const message = 'Duplicate field Value error'
        error = new ErrorResponse(message, 400)
    }

    if (err.name === 'ValidationError') {
        const message = Object.values(err.message).map((val) => val.message)
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server error'
    })

    next()
}

module.exports = errorHandler
