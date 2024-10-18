import TaskComponent from './TaskComponent'
import UserComponent from './UserComponent'
import { ToastProvider } from '@/components/ui/toast'
import { Toaster } from '@/components/ui/toaster'

function HomeComponent() {
	return (
		<div>
			<ToastProvider swipeDirection="right">
				<UserComponent />
				<TaskComponent />
				<Toaster />
			</ToastProvider>
		</div>
	)
}
export default HomeComponent
