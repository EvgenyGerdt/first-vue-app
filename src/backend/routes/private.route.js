const express = require('express')
const router = express.Router()
const { getPrivateData } = require('../controllers/private.contoller')
const { protect } = require('../middleware/auth.middleware')

router.route('/').get(protect, getPrivateData)

module.exports = router
