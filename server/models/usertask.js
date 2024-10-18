'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class UserTask extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.Task, { foreignKey: 'userTaskId', onDelete: 'CASCADE', as: 'tasks' })
			this.belongsTo(models.User, { foreignKey: 'userId' })
		}
	}
	UserTask.init(
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: 'usertasks',
			modelName: 'UserTask',
		}
	)
	return UserTask
}
