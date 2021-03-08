const express = require('express')
const router = express.Router()

const { register, login, forgetPassword } = require('../controllers/auth.controller')

router.route("/register").post(register)

router.route("/login").post(login)

router.route("/forget_password").post(forgetPassword)

module.exports = router
