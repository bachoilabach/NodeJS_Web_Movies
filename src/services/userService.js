import { Op, where } from 'sequelize';
import db from '../models/index';
import { createJWT } from '../middleware/JWTAction';
require('dotenv').config();

const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const handleUserLogin = async (email, password) => {
	try {
		const userExist = await checkUserEmail(email);
		const userData = {};
		if (userExist) {
			const user = await db.user.findOne({
				where: { email: email },
				raw: true,
				attributes: ['email', 'password', 'roleID', 'fullName'],
			});
			console.log(user);
			if (user) {
				const check = bcrypt.compareSync(password, user.password);
				if (check) {
					let payload = {
						email: user.email,
						roleID: user.roleID,
						fullName: user.fullName,
						expiresIn: process.env.JWT_EXP,
					};

					let token = createJWT(payload);
					console.log(token);
					userData.errCode = 0;
					userData.errMessage = 'Oke';
					userData.redirectURL = url(user.roleID);
					delete user.password;
					userData.user = user;
					userData.access_token = token;
				} else {
					userData.errCode = 3;
					userData.errMessage = 'Wrong password';
				}
			} else {
				userData.errCode = 2;
				userData.errMessage = `User's not found`;
			}
		} else {
			userData.errCode = 1;
			userData.errMessage = `Your's email isn't exist in your system.`;
		}
		console.log(userData);
		return userData;
	} catch (error) {
		return error;
	}
};
const url = (roleID) => {
	if (roleID === 1) {
		return `/dashboard/Home`;
	} else {
		return `/`;
	}
};

const checkUserEmail = async (userEmail) => {
	try {
		const user = await db.user.findOne({
			where: { email: userEmail },
		});
		if (user) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		return error;
	}
};
const getAllUsers = async (userID) => {
	try {
		let users = '';
		if (userID === 'ALL') {
			users = await db.user.findAll({
				attributes: {
					exclude: ['password'],
				},
			});
		}
		if (userID && userID !== 'ALL') {
			users = await db.user.findOne({
				where: { userID: userID },
				attributes: {
					exclude: ['password'],
				},
			});
		}
		// console.log(users);
		return users;
	} catch (error) {
		return error;
	}
};
const createNewUser = async (data) => {
	try {
		const checkEmail = await checkUserEmail(data.email);
		if (checkEmail === true) {
			return {
				errCode: 1,
				errMessage: 'Your email is already in used',
			};
		} else {
			const hashPasswordFromLib = await hashUserPassword(data.password);
			await db.user.create({
				email: data.email,
				password: hashPasswordFromLib,
				fullName: data.fullName,
				address: data.address,
				gender: data.gender === '1' ? true : false,
				phoneNumber: data.phoneNumber,
				roleID: data.roleID,
			});
			return {
				errCode: 0,
				errMessage: 'Create success',
			};
		}
	} catch (error) {
		console.error('Error hashing password:', error);
		return error;
	}
};
const hashUserPassword = async (Password) => {
	try {
		var hashPassword = bcrypt.hashSync(Password, salt);
		return hashPassword;
	} catch (error) {
		return error;
	}
};
const deleteUser = async (userID) => {
	let user = await db.user.findOne({
		where: { userID: userID },
	});
	console.log(user);
	if (!user) {
		return {
			errCode: 2,
			errMessage: `The user isn't exist`,
		};
	}
	await db.user.destroy({
		where: { userID: userID },
	});
	return {
		errCode: 0,
		errMessage: 'Delete Success',
	};
};
const updateUserData = async (data) => {
	try {
		if (!data.user.userID) {
			return {
				errCode: 2,
				errMessage: 'Missing required parameters',
			};
		} else {
			console.log('User ID:', data.user.userID);
			let user = await db.user.findOne({
				where: { userID: data.user.userID },
				raw: false,
			});
			if (user) {
				user.email = data.user.email;
				user.fullName = data.user.fullName;
				user.address = data.user.address;
				user.phoneNumber = data.user.phoneNumber;
				user.gender = data.user.gender;
				user.roleID = data.user.roleID;
				await user.save();
				return {
					errCode: 0,
					errMessage: 'Update Success',
				};
			} else {
				return {
					errCode: 1,
					errMessage: `User isn't found`,
				};
			}
		}
	} catch (error) {
		return error;
	}
};
const getAllUserRole = async () => {};

const searchUser = async (keyword) => {
	try {
		let userSearch = '';
		console.log(keyword);

		if (!keyword) {
			userSearch = await db.user.findAll();
		} else {
			userSearch = await db.user.findAll({
				where: {
					[Op.or]: [
						{
							email: {
								[Op.substring]: `%${keyword}%`,
							},
						},
						{
							fullname: {
								[Op.substring]: `%${keyword}%`,
							},
						},
					],
				},
			});
		}

		return {
			errCode: 0,
			errMessage: 'Search Success',
			userSearch,
		};
	} catch (error) {
		throw error;
	}
};

const countUser = async () => {
	return db.user.count();
};

const getUserIDByEmail = async (email) => {
	try {
		const user = await db.user.findOne({
			where: { email: email },
			attributes: {
				exclude: ['password'],
			},
		});
		return user.userID;
	} catch (error) {
		console.log(error);
	}
};

const getFavouriteMoviesByEmail = async (email) => {
	try {
		const userID = await getUserIDByEmail(email);
		let favourMovies = [];
		favourMovies = await db.favourite.findAll({
			where: {
				userID: userID,
			},
		});
		return favourMovies;
	} catch (error) {
		console.log(error);
	}
};

const addFavouriteMovie = async (data) => {
	try {
		console.log(data);
		const userID = await getUserIDByEmail(data.email);
		await db.favourite.create({
			userID: userID,
			movieID: data.movieID,
		});
		return {
			errCode: 0,
			errMessage: 'Add favourite movie successfully',
		};
	} catch (error) {
		console.log(error);
	}
};

const deleteFavouriteMovie = async (data) => {
    try {
        const userID = await getUserIDByEmail(data.email);
        console.log(userID);
        await db.favourite.destroy({
            where: {
                userID: userID,
                movieID: data.movieID,
            },
        });
        console.log('Delete favourite movie successfully');
        return {
            errCode: 0,
            errMessage: 'Delete favourite movie successfully',
        };
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
	handleUserLogin: handleUserLogin,
	getAllUsers: getAllUsers,
	createNewUser: createNewUser,
	updateUserData: updateUserData,
	deleteUser: deleteUser,
	searchUser: searchUser,
	countUser: countUser,
	getFavouriteMoviesByEmail: getFavouriteMoviesByEmail,
	addFavouriteMovie: addFavouriteMovie,
	deleteFavouriteMovie: deleteFavouriteMovie,
};
