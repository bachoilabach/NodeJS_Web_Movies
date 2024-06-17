'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addConstraint('favourite', {
			fields: ['userID'],
			type: 'foreign key',
			name: 'user_id_favour_association_user',
			references: {
				table: 'user',
				field: 'userID',
			},
			onDelete: 'CASCADE',
			onDelete: 'CASCADE',
		});
		await queryInterface.addConstraint('favourite', {
			fields: ['movieID'],
			type: 'foreign key',
			name: 'movie_id_favour_association_movie',
			references: {
				table: 'movie',
				field: 'movieID',
			},
			onDelete: 'CASCADE',
			onDelete: 'CASCADE',
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.removeConstraint('favourite', {
			fields: ['userID'],
			type: 'foreign key',
			name: 'user_id_association',
			references: {
				table: 'user',
				field: 'userID',
			},
			onDelete: 'CASCADE',
			onDelete: 'CASCADE',
		});
		await queryInterface.removeConstraint('favourite', {
			fields: ['movieID'],
			type: 'foreign key',
			name: 'movie_id_favour_association_movie',
			references: {
				table: 'movie',
				field: 'movieID',
			},
			onDelete: 'CASCADE',
			onDelete: 'CASCADE',
		});
	},
};
