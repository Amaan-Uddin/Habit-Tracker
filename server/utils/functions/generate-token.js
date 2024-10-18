// method for generating new access tokens using the refresh token as long as
// the refresh token is valid.

const { User, UserTask } = require('../../models')
const { signAccessToken } = require('./sign-tokens')
const { verifyRefreshToken } = require('./verify-tokens')

module.exports = async function generateToken(refreshToken) {
	try {
		const { id } = verifyRefreshToken(refreshToken)
		const user = await User.findOne({ where: { id: id } })
		if (!user) throw new Error('Invalid credentials')
		const userTask = await UserTask.findOne({ where: { userId: user.id } })
		const tokenData = { id: id, userTaskId: userTask.id, name: user.name, email: user.email }
		const newAccessToken = signAccessToken(tokenData)
		return { newAccessToken, tokenData }
	} catch (error) {
		throw error
	}
}
