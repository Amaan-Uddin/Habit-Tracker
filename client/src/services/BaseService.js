export class BaseService {
	#baseURL
	constructor(baseEndpoint) {
		this.#baseURL = `${import.meta.env.VITE_SERVER_URL}${baseEndpoint}`
	}

	async #responseHandler(method, data, endpoint) {
		try {
			const options = {
				method,
				credentials: 'include',
			}
			if (data) {
				options.body = JSON.stringify(data)
				options.headers = {
					'Content-Type': 'application/json',
				}
			}

			const response = await fetch(`${this.#baseURL}${endpoint}`, options)
			const responseMessage = await response.json()

			if (!response.ok) {
				throw new Error(responseMessage.message || 'Something went wrong')
			}
			return responseMessage
		} catch (error) {
			throw new Error(error.message || 'An unknown error occurred in the service.')
		}
	}
	get(endpoint) {
		return this.#responseHandler('GET', null, endpoint)
	}
	post(data, endpoint) {
		return this.#responseHandler('POST', data, endpoint)
	}
	patch(data, endpoint) {
		return this.#responseHandler('PATCH', data, endpoint)
	}
	delete(data, endpoint) {
		return this.#responseHandler('DELETE', data, endpoint)
	}
}
