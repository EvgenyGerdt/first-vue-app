const express = require('express')
const router = express.Router()

const {
    setUserData,
    getUsersList,
    sendMessage,
    getMessages } = require('../controllers/user.controller')

// POST ROUTES
router.route('/set_username').post(setUserData)
router.route('/send_message').post(sendMessage)
router.route('/get_messages').post(getMessages)

// GET ROUTES
router.route('/get_all_users').get(getUsersList)

module.exports = router
