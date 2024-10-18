import Task from '@/services/TaskService'
export async function fetchAllTasks(setterFunction) {
	try {
		const response = await Task.getAllTasks()
		// console.log(response)
		setterFunction(response.allTask)
	} catch (error) {
		console.error(error)
	}
}
