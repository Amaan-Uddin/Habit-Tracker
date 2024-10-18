const { UserTask, Task } = require('../../models')
const formatUserTask = require('./format-UserTask')
module.exports = async function getAllUserTask() {
	const allUserTasks = await UserTask.findAll({
		attributes: ['id', 'userId'],
		include: [
			{
				model: Task,
				as: 'tasks',
				attributes: ['id', 'userTaskId', 'description'],
				where: { status: true },
			},
		],
	})
	if (!allUserTasks.length) return
	else return formatUserTask(allUserTasks)
}
