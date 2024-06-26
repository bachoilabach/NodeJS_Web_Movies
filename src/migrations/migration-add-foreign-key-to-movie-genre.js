"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addConstraint("moviegenre", {
			fields: ["genreID"],
			type: "foreign key",
			name: "fk_genre_moviegenre",
			references: {
				table: "genre",
				field: "genreID",
			},
			
		});
		await queryInterface.addConstraint("moviegenre", {
			fields: ["movieID"],
			type: "foreign key",
			name: "fk_movie_moviegenre",
			references: {
				table: "movie",
				field: "movieID",
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("moviegenre");
        await queryInterface.removeConstraint("moviegenre", {
			fields: ["genreID"],
			type: "foreign key",
			name: "fk_genre_moviegenre",
			references: {
				table: "genre",
				field: "genreID",
			},
		});
		await queryInterface.removeConstraint("moviegenre", {
			fields: ["movieID"],
			type: "foreign key",
			name: "fk_movie_moviegenre",
			references: {
				table: "movie",
				field: "movieID",
			},
		});
	},
    
};
