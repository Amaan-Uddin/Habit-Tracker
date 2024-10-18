const { User, Token } = require('../../models')
module.exports = async function currentUser(req, res) {
	try {
		if (req.user) {
			const user = await User.findOne({
				where: { id: req.user.id },
				include: [
					{
						model: Token,
						as: 'token',
					},
				],
			})
			// console.log(user)
			return res.status(200).json({
				status: 200,
				message: 'Successfully retrieved current user',
				user: user,
			})
		} else throw new Error('Unauthorized')
	} catch (error) {
		console.log('current-user :: error ::', error)
		res.status(401).json({ status: 401, message: error })
	}
}
