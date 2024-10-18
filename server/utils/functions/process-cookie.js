const { verifyRefreshToken } = require('./verify-tokens')

module.exports = function processCookies(cookie) {
	const splitCookie = cookie.split('; ')
	// console.log(splitCookie)
	const refreshCookie = splitCookie.find((cookie) => cookie.startsWith('refreshToken='))
	if (refreshCookie) {
		const refreshToken = refreshCookie.split('=')[1]
		const { id } = verifyRefreshToken(refreshToken)
		// console.log({ id: id })
		return { id: id }
	}
}
