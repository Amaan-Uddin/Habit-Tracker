const { verifyAccessToken } = require('../functions/verify-tokens')
const generateToken = require('../functions/generate-token')
module.exports = async function authenticateUser(req, res, next) {
	try {
		const accessToken = req.cookies?.accessToken
		if (!accessToken) throw Object.assign(new Error('No access token'), { name: 'JsonWebTokenError' })
		const tokenData = verifyAccessToken(accessToken)
		// console.log('authenticate-user :: tokenData ::', tokenData)
		req.user = tokenData
		next()
	} catch (error) {
		if (error.name == 'JsonWebTokenError' || error.name == 'TokenExpiredError') {
			const refreshToken = req.cookies?.refreshToken
			if (!refreshToken) return res.status(401).json({ status: 401, message: 'Unauthorized (no token)' })
			try {
				const { newAccessToken, tokenData } = await generateToken(refreshToken)
				res.cookie('accessToken', newAccessToken, { httpOnly: true })
				req.user = tokenData
				next()
			} catch (error) {
				res.clearCookie('accessToken')
				res.clearCookie('refreshToken')
				return res.status(401).json({ status: 401, message: 'Unauthorized, refresh failed' })
			}
		} else {
			return res.status(500).json({ status: 500, message: 'Internal Server Error' })
		}
	}
}
