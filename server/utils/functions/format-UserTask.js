module.exports = function formatUserTask(userTasks) {
	return userTasks.map((userTask) => {
		const { id, userId, tasks } = userTask.dataValues

		return {
			id,
			userId,
			tasks: tasks.map((task) => {
				const { id: taskId } = task.dataValues
				return {
					id: taskId,
				}
			}),
		}
	})
}
