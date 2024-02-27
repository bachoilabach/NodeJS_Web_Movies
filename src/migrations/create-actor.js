"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("actor", {
			actorID: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			birthdate: {
				type: Sequelize.DATEONLY,
			},
			nationality: {
				type: Sequelize.FLOAT,
			},
			biography: {
				type: Sequelize.STRING,
			},
			imangeURL: {
				type: Sequelize.DATEONLY,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("actor");
	},
};