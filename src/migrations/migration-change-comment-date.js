module.exports = {
	up: (queryInterface, Sequelize) => {
		return Promise.all([
			
			queryInterface.changeColumn('comment', 'commentDate', {
				type: Sequelize.DATEONLY,
				allowNull : true
			}),
		]);
	},

	down: (queryInterface, Sequelize) => {
		return Promise.all([
			
			queryInterface.changeColumn('comment', 'commentDate', {
				type: Sequelize.DATE,
				allowNull : true
			}),
		]);
	},
};
