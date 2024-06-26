"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Director extends Model {
		static associate(models) {
			
		}
	}
	Director.init(
		{
			directorID: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
            name: DataTypes.STRING,
            birthdate: DataTypes.DATEONLY,
            nationality: DataTypes.STRING,
            biography: DataTypes.STRING,
            image: DataTypes.STRING
        },
		{
			sequelize,
			modelName: "director",
			tableName: 'director'
		}
	);
	return Director;
};
