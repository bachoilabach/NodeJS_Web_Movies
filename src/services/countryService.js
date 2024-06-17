import db from '../models/index';

const getAllCountries = async (id) => {
	try {
		let countries = '';
		if (id === 'ALL') {
			countries = await db.country.findAll();
		}
		if (id && id !== 'ALL') {
			countries = await db.country.findOne({
				where: { countryID: id },
			});
		}
		return countries
	} catch (error) {
		return (error);
	}
};

module.exports = {
	getAllCountries: getAllCountries,
};
