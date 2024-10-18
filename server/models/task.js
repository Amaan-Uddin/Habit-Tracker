'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Task extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.UserTask, { foreignKey: 'userTaskId', as: 'tasks' })
		}
	}
	Task.init(
		{
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			status: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			userTaskId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: 'tasks',
			modelName: 'Task',
		}
	)
	return Task
}
