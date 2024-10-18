import { BaseService } from './BaseService'

export class TaskService extends BaseService {
	constructor() {
		super('/api')
	}
	getAllTasks() {
		return this.get('/all-task')
	}
	createTask(data) {
		return this.post(data, '/create-task')
	}
	completeTask(data) {
		return this.patch(data, '/complete-task')
	}
	editTask(data) {
		return this.patch(data, '/edit-task')
	}
	deleteTask(data) {
		return this.delete(data, '/delete-task')
	}
}
const Task = new TaskService()
export default Task
