const { User, UserTask } = require('../../models')
const bcrypt = require('bcrypt')
const { signAccessToken, signRefreshToken } = require('../../utils/functions/sign-tokens')
module.exports = async function loginUser(req, res) {
	try {
		const { email, password } = req.body
		if (!email || !password) return res.status(400).json({ status: 400, message: 'Bad request' })

		// find the user, if user does not exist send response saying 'Not found'
		const user = await User.findOne({ where: { email: email } })
		if (!user) return res.status(404).json({ status: 404, message: 'Not found' })

		// compare the passwords sent by user and hashed password in db
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) return res.status(401).json({ status: 401, message: 'Email or Password is incorrect' })

		const userTask = await UserTask.findOne({ where: { userId: user.id } })
		// generate tokens for the user
		const accessToken = signAccessToken({
			id: user.id,
			userTaskId: userTask.id,
			name: user.name,
			email: user.email,
		})
		const refreshToken = await signRefreshToken({ id: user.id })

		// set up cookies
		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV == 'production' ? true : false,
			sameSite: 'Strict',
		})
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 30,
			secure: process.env.NODE_ENV == 'production' ? true : false,
			sameSite: 'Strict',
		})

		res.status(200).json({ status: 200, message: 'Successfully logged in user', user: user })
	} catch (error) {
		console.log(error)
		res.status(500).json({ status: 500, message: 'Internal Server Error' })
	}
}
