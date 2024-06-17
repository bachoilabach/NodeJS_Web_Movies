import { Op } from 'sequelize';
import db from '../models/index';

const getAllDirectors = async (directorID) => {
	try {
		let directors = '';
		if (directorID === 'ALL') {
			directors = await db.director.findAll();
		}
		if (directorID && directorID !== 'ALL') {
			directors = await db.director.findOne({
				where: { directorID: directorID },
			});
		}
		return directors;
	} catch (error) {
		return (error);
	}
};

const createNewDirector = async (data) => {
	try {
		const existingDirector = await db.director.findOne({
			where: { name: data.director.name },
		});
		console.log(data.director);
		if (existingDirector) {
			return {
				errCode: 1,
				ereMessage: 'Director name already exists',
			};
		} else {
			const createdDirector = await db.director.create({
				name: data.director.name,
				birthdate: data.director.birthdate,
				nationality: data.director.nationality,
				biography: data.director.biography,
				image: data.director.image,
			});
			return {
				errCode: 0,
				ereMessage: 'Create Director Success',
				createdDirector,
			};
		}
	} catch (error) {
		return (error);
	}
};

const editDirector = async (data) => {
	try {
		console.log(data.director.image);
		if (!data.director.directorID) {
			return {
				errCode: 2,
				errMessage: 'Missing required parameters',
			};
		} else {
			let director = await db.director.findOne({
				where: { directorID: data.director.directorID },
				raw: false,
			});

			if (director) {
				director.name = data.director.name;
				director.birthdate = data.director.birthdate;
				director.nationality = data.director.nationality;
				director.biography = data.director.biography;
				director.image = data.director.image;
				await director.save();
				return {
					errCode: 0,
					errMessage: 'Update Success',
				};
			} else {
				return {
					errCode: 1,
					errMessage: `Director isn't found`,
				};
			}
		}
	} catch (error) {
		return (error);
	}
};

const deleteDirector = async (directorID) => {
	let director = await db.director.findOne({
		where: { directorID: directorID },
	});
	if (!director) {
		return {
			errCode: 2,
			errMessage: `The director isn't exist`,
		};
	}
	await db.director.destroy({
		where: { directorID: directorID },
	});
	return {
		errCode: 0,
		errMessage: 'Delete Success',
	};
};

const searchDirector = async (keyword) => {
	try {
		let directorSearch = '';
		console.log(keyword);

		if (!keyword) {
			// Nếu không có từ khóa tìm kiếm, trả về tất cả các thể loại
			directorSearch = await db.director.findAll();
		} else {
			// Nếu có từ khóa tìm kiếm, tìm kiếm thể loại theo từ khóa
			directorSearch = await db.director.findAll({
				where: {
					name: {
						[Op.substring]: `%${keyword}%`,
					},
				},
			});
		}

		return {
			errCode: 0,
			errMessage: 'Search Success',
			directorSearch,
		};
	} catch (error) {
		throw error;
	}
};

module.exports = {
	getAllDirectors: getAllDirectors,
	createNewDirector: createNewDirector,
	editDirector: editDirector,
	deleteDirector: deleteDirector,
	searchDirector: searchDirector,
};
