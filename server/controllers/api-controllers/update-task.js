const { Task } = require('../../models')
module.exports = async function updateTask(req, res) {
	try {
		const { taskId, description } = req.body
		const { userTaskId } = req.user
		if (!description) return res.status(400).json({ status: 400, message: 'Task must have a description' })
		const [updateTask] = await Task.update(
			{ description: description },
			{
				where: {
					id: taskId,
					userTaskId: userTaskId,
				},
			}
		)
		if (updateTask === 0) {
			return res.status(404).json({ status: 404, message: 'Task not found' })
		} else {
			return res.status(200).json({ status: 200, message: 'Successfully updated task' })
		}
	} catch (error) {
		console.log(error)
		res.status(500).json({ status: 500, message: 'Internal Server Error' })
	}
}
