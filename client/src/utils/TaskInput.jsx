import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import ErrorMessage from './ErrorMessage'
import Task from '@/services/TaskService'

function TaskInput({ setTasks }) {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
		reset,
	} = useForm()
	async function postTask(data) {
		try {
			const response = await Task.createTask(data)
			// console.log(response)
			setTasks((prev) => [...prev, response.task])
			reset()
		} catch (error) {
			console.log(error)
			setError(error.field, { type: 'manuel', message: error.message })
		}
	}
	return (
		<div className="p-1 fixed bottom-0 w-full">
			<form onSubmit={handleSubmit(postTask)} className="flex items-center gap-2">
				<div className="w-full">
					<div className="mb-2">
						{errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
					</div>
					<div className="flex gap-2">
						<Input
							autoComplete="off"
							placeholder="Task description..."
							className="text-base h-10"
							{...register('description', { required: 'task description cannot be empty' })}
						/>
						<Button className="w-32 h-10 bg-orange-500 hover:bg-orange-600" type="submit">
							Add
						</Button>
					</div>
				</div>
			</form>
		</div>
	)
}
export default TaskInput
