const { Task, Progress } = require('../../models')
const getAllTasks = require('./get-all-user-task')
module.exports = async function cronFunction() {
	try {
		const formatUT = await getAllTasks()
		if (!formatUT) {
			console.log('no operations to perform')
			return
		}
		console.log('cron function start')
		await Promise.all(
			formatUT.map(async (ut) => {
				await Progress.create({
					userId: ut.userId,
					tasksCompleted: ut.tasks,
					completionStatus: ut.tasks.length,
				})
			})
		)
		console.log('cron function complete')
		const [updateAllStatus] = await Task.update(
			{
				status: false,
			},
			{ where: { status: true } }
		)
		if (updateAllStatus) console.log('all status to false')
	} catch (error) {
		console.log(error)
	}
}
