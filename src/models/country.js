"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Country extends Model {
		static associate(models) {
			Country.belongsTo(models.Movie,{
				foreignKey: 'countryID',
				as: 'countryData'
			})
		}
	}
	Country.init(
		{
            countryName: DataTypes.STRING
        },
		{
			sequelize,
			modelName: "country",
			tableName: 'country'
		}
	);
	return Country;
};
