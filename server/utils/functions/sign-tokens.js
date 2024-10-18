const jwt = require('jsonwebtoken')
const { Token } = require('../../models')

function signAccessToken(payload) {
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_MAX })
}

async function signRefreshToken(payload) {
	const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: process.env.REFRESH_TOKEN_MAX,
	})
	const [token, created] = await Token.findOrCreate({
		where: { userId: payload.id },
		defaults: { refreshToken: refreshToken },
	})

	if (created) console.log('new refreshToken created')
	else {
		token.refreshToken = refreshToken
		await token.save()
	}

	return token.refreshToken
}

module.exports = {
	signAccessToken,
	signRefreshToken,
}
