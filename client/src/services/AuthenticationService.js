import { BaseService } from './BaseService'

export class AuthenticationService extends BaseService {
	constructor() {
		super('/auth')
	}
	signup(data) {
		return this.post(data, '/create-user')
	}
	login(data) {
		return this.post(data, '/login-user')
	}
	logout() {
		return this.get('/logout-user')
	}
	currentUser() {
		return this.get('/current-user')
	}
}

const AuthService = new AuthenticationService()
export default AuthService
