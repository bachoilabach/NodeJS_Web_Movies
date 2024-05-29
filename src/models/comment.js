"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		static associate(models) {}
	}
	Comment.init(
		{
			commentID: {
				type: DataTypes.STRING,
				primaryKey: true,
				autoIncrement: true
			},
            movieID: DataTypes.INTEGER,
            userID: DataTypes.INTEGER,
			userName: DataTypes.STRING,
			content: DataTypes.STRING,
			commentDate: DataTypes.DATEONLY
        },
		{
			sequelize,
			modelName: "comment",
			tableName: 'comment'
		}
	);
	return Comment;
};
