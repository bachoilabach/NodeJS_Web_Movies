"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class UserRole extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// * Mối quan hệ 1 - 1 giữa user và user role 
			UserRole.belongsTo(models.User,{
				foreignKey: 'roleID',
				as: 'roleData'
			});
		}
	}
	UserRole.init(
		{
			role: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "userrole",
			tableName: "userrole",

		}
	);
	return UserRole;
};
