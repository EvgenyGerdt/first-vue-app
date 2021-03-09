const express = require('express')
const router = express.Router()

const { register, login, forgetPassword, resetPassword } = require('../controllers/auth.controller')

router.route("/register").post(register)

router.route("/login").post(login)

router.route("/forget_password").post(forgetPassword)

router.route('/reset_password').post(resetPassword)

module.exports = router
