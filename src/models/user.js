"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			Email: DataTypes.STRING,
			FullName: DataTypes.STRING,
			Address: DataTypes.STRING,
			Gender: DataTypes.BOOLEAN,
			PhoneNumber: DataTypes.STRING,
			RoleID: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
