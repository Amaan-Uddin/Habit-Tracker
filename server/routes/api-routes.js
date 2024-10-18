const express = require('express')
const router = express.Router()

const authenticateToken = require('../utils/middleware/authenticate-token')
const createTask = require('../controllers/api-controllers/create-task')
const getAllTasks = require('../controllers/api-controllers/get-all-tasks')
const deleteTask = require('../controllers/api-controllers/delete-task')
const updateTask = require('../controllers/api-controllers/update-task')
const getAllUserTask = require('../controllers/test-controllers/usertask-controller')
const completeTask = require('../controllers/api-controllers/complete-task')

router.use(authenticateToken)
router.post('/create-task', createTask)
router.get('/all-task', getAllTasks)
router.patch('/edit-task', updateTask)
router.patch('/complete-task', completeTask)
router.delete('/delete-task', deleteTask)

router.get('/test-user-task', getAllUserTask)

module.exports = router
