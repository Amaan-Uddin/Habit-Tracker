module.exports = function logoutUser(req, res) {
	try {
		// clear all cookies, this would disable the user to authenticate themselves and thus would
		// be restricted from accessing any authorized data.
		res.clearCookie('accessToken')
		res.clearCookie('refreshToken')
		res.status(200).json({ status: 200, message: 'Successfully logged out user' })
	} catch (error) {
		console.log(error)
		res.status(500).json({ status: 500, message: 'Internal Server Error' })
	}
}
