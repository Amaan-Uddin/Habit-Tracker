const { Task } = require('../../models')
module.exports = async function createTask(req, res) {
	try {
		const { description } = req.body
		const { userTaskId } = req.user
		if (!description) return res.status(400).json({ status: 400, message: 'Task must have a description' })
		const task = await Task.create({ description: description, userTaskId: userTaskId })
		res.status(201).json({ status: 201, message: 'Successfully created task', task: task })
	} catch (error) {
		console.log(error)
		res.status(500).json({ status: 500, message: 'Internal Server Error' })
	}
}
