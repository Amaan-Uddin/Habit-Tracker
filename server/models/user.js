'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasOne(models.Token, { foreignKey: 'userId', as: 'token' })
			this.hasOne(models.UserTask, { foreignKey: 'userId' })
			this.hasMany(models.Progress, { foreignKey: 'userId' })
		}
	}
	User.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: 'User mush have a name' },
					notEmpty: { msg: 'name cannot be empty' },
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notNull: { msg: 'User mush have a email' },
					notEmpty: { msg: 'email cannot be empty' },
					isEmail: { msg: 'email must be valid address' },
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: 'User mush have a password' },
					notEmpty: { msg: 'password cannot be empty' },
				},
			},
		},
		{
			sequelize,
			tableName: 'users',
			modelName: 'User',
		}
	)
	return User
}
