'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Progress extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.User, { foreignKey: 'userId' })
		}
	}
	Progress.init(
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			tasksCompleted: {
				type: DataTypes.JSONB,
				defaultValue: [],
			},
			completionStatus: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
		},
		{
			sequelize,
			tableName: 'progress',
			modelName: 'Progress',
		}
	)
	return Progress
}
