const express = require('express')
const router = express.Router()

const {
    setUserData,
    getUsersList } = require('../controllers/user.controller')

// POST ROUTES
router.route('/set_username').post(setUserData)

// GET ROUTES
router.route('/get_all_users').get(getUsersList)

module.exports = router
