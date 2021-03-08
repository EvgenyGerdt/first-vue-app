const mongoose = require('mongoose')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const Schema = mongoose.Schema

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRE = process.env.JWT_EXPIRE
const SALT_PORTION = parseInt(process.env.SALT_PORTION)

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please, provide your email"],
        unique: true,
        maxlength: 255,
        minlength: 6,
        match: [
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please, provide a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please, provide your password"],
        maxlength: 1024,
        minlength: 6,
        select: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

UserSchema.pre("save", async function(next) {
        if(!this.isModified("password")) {
            next()
    }

    const salt = await bcrypt.genSalt(SALT_PORTION)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.matchPasswords = async function(password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getSignedJwtToken = async function () {
    return new Promise(((resolve, reject) => {
        jwt.sign({ id: this._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRE
        }, function (err, token) {
            if(err) reject(err)
            else resolve(token)
        })
    }))
}

UserSchema.methods.getResetPasswordToken = async function () {
    const resetToken = crypto.randomBytes(20).toString("hex")
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)
    return resetToken
}

const User = mongoose.model("User", UserSchema)

module.exports = User
