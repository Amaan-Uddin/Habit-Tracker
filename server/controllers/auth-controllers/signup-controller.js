const { User, UserTask } = require('../../models')
const bcrypt = require('bcrypt')
const { signAccessToken, signRefreshToken } = require('../../utils/functions/sign-tokens')

module.exports = async function signupUser(req, res) {
	try {
		const { name, email, password } = req.body
		if (!name || !email || !password) return res.status(400).json({ status: 400, message: 'Bad request' })

		// check if the user already exists
		const user = await User.findOne({ where: { email: email } })
		if (user) return res.status(409).json({ status: 409, message: 'User already exist' })

		// use bcrypt to hash the password, make it unreadable
		const hashPassword = await bcrypt.hash(password, 12)

		// create a new user
		const createNewUser = await User.create({ name: name, email: email, password: hashPassword })

		// UserTask profile
		const userTask = await UserTask.create({ userId: createNewUser.id })

		// generate tokens
		const accessToken = signAccessToken({
			id: createNewUser.id,
			userTaskId: userTask.id,
			name: createNewUser.name,
			email: createNewUser.email,
		})
		const refreshToken = await signRefreshToken({ id: createNewUser.id })

		// create cookies
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

		res.status(201).json({ status: 201, message: 'Successfully created user', user: createNewUser })
	} catch (error) {
		console.log(error)
		res.status(500).json({ status: 500, message: 'Internal Server Error' })
	}
}
