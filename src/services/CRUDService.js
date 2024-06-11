const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

import db from '../models/index';

let createNewUser = async (data) => {
	console.log(data);
	try {
		const hashPasswordFromLib = await hashUserPassword(data.password);
		await db.user.create({
			email: data.email,
			password: hashPasswordFromLib,
			fullname: data.fullName,
			gender: data.gender === '1' ? true : false,
			phonenumber: data.phoneNumber,
			roleid: data.roleID,
		});
		resolve('Oke');
	} catch (error) {
		console.error('Error hashing password:', error);
	}
};

const hashUserPassword = (Password) => {
	try {
		var hashPassword = bcrypt.hashSync(Password, salt);
		resolve(hashPassword);
	} catch (error) {
		return (error);
	}
};

const getAllUser = async (req, res) => {
	try {
		const users = db.user.findAll({
			raw: true,
		});
		resolve(users);
	} catch (error) {
		return (error);
	}
};

const getUserByID = (id) => {
	return new Promise(async (resolve, return ) => {
		try {
			let user = await db.user.findOne({
				where: { userID: id },
				raw: true,
			});

			if (user) {
				resolve(user);
			} else {
				resolve([]);
			}
		} catch (error) {
			return (error);
		}
	});
};

const updateUserData = (data) => {
	return new Promise(async (resolve, return ) => {
		try {
			console.log('User ID:', data.id);
			let user = await db.user.findOne({
				where: { userID: data.id },
			});
			if (user) {
				user.fullName = data.fullName;
				user.phoneNumber = data.phoneNumber;
				user.gender = data.gender;
				await user.save();

				let allUsers = await db.user.findAll();
				resolve(allUsers);
			} else {
				resolve();
			}
		} catch (error) {
			return (error);
		}
	});
};

const deleteUserByID = (userID) => {
	return new Promise(async (resolve, return ) => {
		try {
			let user = await db.User.findOne({
				where: { userID: userID },
			});
			if (user) {
				await db.user.destroy({
					where: { userID: userID },
				});
				console.log('User deleted successfully');
			}
			resolve();
		} catch (error) {
			return (error);
		}
	});
};

module.exports = {
	createNewUser: createNewUser,
	getAllUser: getAllUser,
	getUserByID: getUserByID,
	updateUserData: updateUserData,
	deleteUserByID: deleteUserByID,
};
