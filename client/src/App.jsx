import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Spinner, Protected } from './utils'

const SignupPage = lazy(() => import('./pages/SignupPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const HomePage = lazy(() => import('./pages/HomePage'))
const LandingPage = lazy(() => import('./pages/LandingPage'))

function App() {
	return (
		<>
			<Suspense fallback={<Spinner />}>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/home" element={<Protected />}>
						<Route index element={<HomePage />} />
					</Route>
					<Route path="/signup" element={<SignupPage />} />
					<Route path="/login" element={<LoginPage />} />
				</Routes>
			</Suspense>
		</>
	)
}

export default App
