'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Favourite extends Model {
		static associate(models) {}
	}
	Favourite.init(
		{
            userID: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            movieID: DataTypes.INTEGER
        },
		{
			sequelize,
			modelName: 'favourite',
            tableName: 'favourite'
		}
	);
	return Favourite;
};
