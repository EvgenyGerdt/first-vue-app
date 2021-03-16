const express = require('express')
const router = express.Router()

const {
    register,
    login,
    forgetPassword,
    resetPassword,
    getUserData,
    checkUserExists } = require('../controllers/auth.controller')

// POST ROUTES
router.route('/register').post(register)

router.route('/login').post(login)

router.route('/forget_password').post(forgetPassword)

router.route('/reset_password').post(resetPassword)

router.route('/check_email').post(checkUserExists)

router.route('/get_user').post(getUserData)

module.exports = router
