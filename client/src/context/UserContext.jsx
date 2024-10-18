import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '@/services/AuthenticationService'

export const UserContext = createContext()
export function UserContextProvider({ children }) {
	const navigate = useNavigate()
	const [user, setUser] = useState({
		id: undefined,
		name: undefined,
		email: undefined,
		loggedIn: false,
	})
	useEffect(() => {
		async function fetchCurrentUser() {
			try {
				const response = await AuthService.currentUser()
				// console.log(response)
				const { id, name, email } = response.user
				setUser({ id: id, name: name, email: email, loggedIn: true })
				navigate('/home')
			} catch (error) {
				console.error(error)
				navigate('/')
			}
		}
		fetchCurrentUser()
	}, [])
	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
