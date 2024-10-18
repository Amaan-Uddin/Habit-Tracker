import { useEffect, useState } from 'react'
import { TaskTab, TaskInput } from '@/utils'
import { fetchAllTasks } from '@/functions/fetchAllTasks'
import { useToast } from '@/hooks/use-toast'

function TaskComponent() {
	const [tasks, setTasks] = useState(null)
	const { toast } = useToast()

	useEffect(() => {
		fetchAllTasks(setTasks)
	}, [setTasks])

	useEffect(() => {
		const socket = new WebSocket('ws://localhost:3000')

		socket.addEventListener('message', (msgEvent) => {
			const message = JSON.parse(msgEvent.data)
			// console.log(message)

			if (message.type === 'notification') {
				// console.log(message.message)
				toast({
					title: '24-hours complete',
					description: 'Your daily tasks are ready, please refresh the page.',
				})
			}
		})
		return () => {
			if (socket.readyState === WebSocket.OPEN) {
				socket.close()
			}
		}
	}, [toast])

	return (
		<div className=" py-4 flex flex-col gap-4">
			<div className="px-2 flex flex-wrap gap-2 justify-center">
				{tasks &&
					tasks.map((task) => (
						<div key={task.id} className="w-72">
							<TaskTab task={task} setTasks={setTasks} />
						</div>
					))}
				{tasks && !tasks.length && (
					<p className="font-bold text-zinc-400 text-3xl opacity-40 mt-5">No tasks available</p>
				)}
			</div>
			<div className=" py-2">
				<TaskInput setTasks={setTasks} />
			</div>
		</div>
	)
}
export default TaskComponent
