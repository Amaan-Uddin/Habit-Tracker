const { Task } = require('../../models')
module.exports = async function deleteTask(req, res) {
	try {
		const { taskId } = req.body
		const deleteTask = await Task.destroy({ where: { id: taskId } }) // return the number of records deleted (i.e 0 or N), here it will return 0 or 1
		// console.log(deleteTask)
		if (deleteTask === 0) {
			return res.status(404).json({ status: 404, message: 'task not found' })
		} else {
			return res.status(200).json({ status: 200, message: 'Successfully deleted task' })
		}
	} catch (error) {
		console.log(error)
		res.status(500).json({ status: 500, message: 'Internal Server Error' })
	}
}
