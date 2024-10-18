const express = require('express')
const router = express.Router()

const signupUser = require('../controllers/auth-controllers/signup-controller')
const loginUser = require('../controllers/auth-controllers/login-controller')
const currentUser = require('../controllers/auth-controllers/current-user-controller')
const logoutUser = require('../controllers/auth-controllers/logout-controller')
const authenticateToken = require('../utils/middleware/authenticate-token')

router.post('/create-user', signupUser)
router.post('/login-user', loginUser)
router.get('/logout-user', logoutUser)
router.get('/current-user', authenticateToken, currentUser)

module.exports = router
