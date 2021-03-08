const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const ErrorResponse = require('../utils/errorResponse')
const dotenv = require('dotenv')

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

exports.protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }

    if(!token) {
        return next(new ErrorResponse('Not authorized to access this route', 401))
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        const user = await User.findById(decoded.id)

        if(!user) {
            return next(new ErrorResponse(`No user found with this id`, 404))
        }
        req.user = user

        next()
    } catch (err) {
        return next(new ErrorResponse("Not authorized to access this route"), 500)
    }
}
