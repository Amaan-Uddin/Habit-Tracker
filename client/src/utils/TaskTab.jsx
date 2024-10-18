import { Button } from '@/components/ui/button'
import Task from '@/services/TaskService'
import { fetchAllTasks } from '@/functions/fetchAllTasks'
import TrashIcon from '@/assets/svg/TrashIcon'

function TaskTab({ task, setTasks }) {
	async function taskComplete(id) {
		await Task.completeTask({ taskId: id })
		fetchAllTasks(setTasks)
	}
	async function dropTask(id) {
		await Task.deleteTask({ taskId: id })
		fetchAllTasks(setTasks)
	}

	return (
		<>
			<div className={` flex border my-2 items-center ${task.status ? 'bg-green-200' : ''}`}>
				<div className="flex flex-col gap-2 justify-between w-full">
					<h3 className="text-lg font-semibold pl-3 py-2 overflow-hidden text-ellipsis whitespace-nowrap w-full">
						{task.description}
					</h3>
					<div className="flex">
						<Button
							className={`rounded-none w-36 ${
								!task.status ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'
							}`}
							onClick={() => taskComplete(task.id)}
						>
							{task.status ? 'Undo' : 'Done'}
						</Button>
						<Button
							className="rounded-none w-36 bg-red-500 hover:bg-red-600"
							onClick={() => dropTask(task.id)}
						>
							<TrashIcon />
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}
export default TaskTab
