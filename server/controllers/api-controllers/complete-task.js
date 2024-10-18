const { Task, sequelize } = require('../../models')
module.exports = async function completeTask(req, res) {
	try {
		const { taskId } = req.body
		const { userTaskId } = req.user
		if (!taskId) return res.status(400).json({ status: 400, message: 'Task id must be present' })
		const [taskComplete] = await Task.update(
			{ status: sequelize.literal('NOT status') },
			{
				where: { id: taskId, userTaskId: userTaskId },
			}
		)
		if (taskComplete === 0) {
			return res.status(404).json({ status: 404, message: 'Task not found' })
		} else {
			return res.status(200).json({ status: 200, message: 'Successfully updated task status' })
		}
	} catch (error) {
		console.log(error)
		res.status(500).json({ status: 500, message: 'Internal Server Error' })
	}
}
