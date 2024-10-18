const { UserTask, Task } = require('../../models')
module.exports = async function getAllUserTask(req, res) {
	// try {
	// 	const { userTaskId } = req.user
	// 	const userTask = await UserTask.findOne({
	// 		where: {
	// 			id: userTaskId,
	// 		},
	// 		include: [
	// 			{
	// 				model: Task,
	// 				as: 'tasks',
	// 			},
	// 		],
	// 	})
	// 	res.status(200).json({ status: 200, message: 'Successfully retrieved userTask profile', userTask: userTask })
	// } catch (error) {
	// 	console.log(error)
	// 	res.status(500).json({ status: 500, message: 'Internal Server Error' })
	// }
	try {
		const userTask = await UserTask.findAll({
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
		console.log(JSON.stringify(userTask))
		res.status(200).json({
			status: 200,
			message: 'Successfully retrieved all userTask profile',
			userTask: userTask,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ status: 500, message: 'Internal Server Error' })
	}
}
