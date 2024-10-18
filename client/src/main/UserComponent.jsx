import { UserContext } from '@/context/UserContext'
import { useContext } from 'react'
import { Button } from '@/components/ui/button'
import AuthService from '@/services/AuthenticationService'
import { useNavigate } from 'react-router-dom'

function UserComponent() {
	const { user } = useContext(UserContext)
	const navigate = useNavigate()
	async function logoutUser() {
		await AuthService.logout()
		navigate('/', { replace: true })
	}
	return (
		<div className="container  py-4 items-center">
			<div className="flex justify-between items-center w-full px-2">
				<div className="font-semibold text-2xl px-1">{user.name}</div>
				<Button onClick={() => logoutUser()}>logout</Button>
			</div>
		</div>
	)
}
export default UserComponent
