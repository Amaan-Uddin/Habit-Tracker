const { Task } = require('../../models')
module.exports = async function getAllTasks(req, res) {
	try {
		const { userTaskId } = req.user
		const allTask = await Task.findAll({ where: { userTaskId: userTaskId }, order: [['id', 'ASC']] })
		// console.log(allTask)
		res.status(200).json({ status: 200, message: 'Successfully retrieved all tasks', allTask: allTask })
	} catch (error) {
		console.log(error)
		res.status(500).json({ status: 500, message: 'Internal Server Error' })
	}
}
