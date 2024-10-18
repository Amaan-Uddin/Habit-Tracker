import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '@/context/UserContext'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ErrorMessage } from '@/utils'
import AuthService from '@/services/AuthenticationService'

function AuthComponent({ auth_type }) {
	const {
		register,
		handleSubmit,
		clearErrors,
		setError,
		formState: { errors },
	} = useForm()

	const { setUser } = useContext(UserContext)
	const navigate = useNavigate()

	async function authenticateUser(data) {
		try {
			const response = auth_type == 'signup' ? await AuthService.signup(data) : await AuthService.login(data)
			const { id, name, email } = response.user
			setUser({ id: id, name: name, email: email, loggedIn: true })
			navigate('/home')
		} catch (error) {
			console.error(error)
			if (error.field) {
				setError(error.field, { type: 'manuel', message: error.message })
			} else {
				setError('server', { type: 'server', message: error.message })
			}
		}
	}
	return (
		<div className="container">
			<form
				onSubmit={handleSubmit(authenticateUser)}
				className="flex flex-col gap-3 md:w-1/2 sm:w-3/4 mx-auto h-screen justify-center"
			>
				<h1 className="text-4xl text-center">{auth_type}</h1>
				{errors.server && (
					<div className="p-2 bg-red-200">
						<ErrorMessage>{errors.server.message}</ErrorMessage>
					</div>
				)}
				{auth_type == 'signup' ? (
					<div>
						<Input
							{...register('name', {
								required: 'Name is required.',
								onChange: () => clearErrors('server'),
							})}
							placeholder="Enter your name"
							label="Name"
						/>
						{errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
					</div>
				) : null}
				<div>
					<Input
						{...register('email', {
							required: 'Email is required.',
							onChange: () => clearErrors('server'),
						})}
						type="email"
						placeholder="Enter your email"
						label="Email"
					/>
					{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
				</div>
				<div>
					<Input
						{...register('password', {
							required: 'Password is required.',
							onChange: () => clearErrors('server'),
						})}
						type="password"
						placeholder="Enter a password"
						label="Password"
					/>
					{errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
				</div>
				<Button className={auth_type == 'signup' ? 'hover:bg-sky-600' : 'hover:bg-green-500'}>
					{auth_type == 'signup' ? 'Sign up' : 'Login'}
				</Button>
			</form>
		</div>
	)
}
export default AuthComponent
