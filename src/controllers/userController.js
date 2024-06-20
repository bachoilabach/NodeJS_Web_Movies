import db from '../models/index';
import userService from '../services/userService';

const handleLogin = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	if (!email || !password) {
		return res.status(500).json({
			errCode: '0',
			message: 'Missing parameter',
		});
	}

	let userData = await userService.handleUserLogin(email, password);

	// set cookie
	if (userData && userData.user && userData.access_token) {
		res.cookie('jwt', userData.access_token, {
			httpOnly: true,
			maxAge: 60 * 60 * 1000,
		});
	}

	return res.status(200).json({
		errCode: userData.errCode,
		message: userData.errMessage,
		user: userData.user ? userData.user : {},
		access_token: userData.access_token,
		redirectURL: userData.redirectURL,
	});
};

const handleGetAllUsers = async (req, res) => {
	let id = req.query.id;

	if (!id) {
		return res.status(200).json({
			errCode: 1,
			errMessage: 'Missing parameters',
			users: [],
		});
	}

	let users = await userService.getAllUsers(id);

	return res.status(200).json({
		errCode: 0,
		users,
	});
};

const handleCreateNewUser = async (req, res) => {
	let message = await userService.createNewUser(req.body);
	console.log(message);
	return res.status(200).json(message);
};

const handleEditUser = async (req, res) => {
	let data = req.body;
	let message = await userService.updateUserData(data);
	console.log(message);
	return res.status(200).json(message);
};

const handleDeleteUser = async (req, res) => {
	if (!req.body.userID) {
		return res.status(200).json({
			errCode: 1,
			errMessage: 'Missing required parameters',
		});
	}
	let message = await userService.deleteUser(req.body.userID);
	console.log(message);
	return res.status(200).json(message);
};

const handleGetAllUserRole = async (req, res) => {
	return res.status(200).json({
		errCode: 0,
		errMessage: '',
	});
};

const handleSearchUser = async (req, res) => {
	try {
		const keyword = req.query.keyword;

		const user = await userService.searchUser(keyword);

		return res.status(200).json({
			errCode: 0,
			user,
		});
	} catch (error) {
		return res.status(500).json({
			errCode: 500,
			errMessage: 'Internal server error',
		});
	}
};

const handleGetUserCount = async (req, res) => {
	try {
		const count = await userService.countUser();
		return res.status(200).json({
			errCode: 0,
			errMessage: 'Count fetched successfully',
			count,
		});
	} catch (error) {
		console.error('Server Error', error);
		return res.status(500).json({
			errCode: 500,
			errMessage: 'Internal Server Error',
		});
	}
};

const handleGetFavouriteMoviesByUserID = async (req, res) => {
	try {
		let email = req.query.email;
		console.log(email);

		if (!email) {
			return res.status(400).json({
				errCode: 1,
				errMessage: 'Email is required',
			});
		}

		const message = await userService.getFavouriteMoviesByEmail(email);

		return res.status(200).json(message);
	} catch (error) {
		console.error('Server Error', error);
		return res.status(500).json({
			errCode: 2,
			errMessage: 'Server Error',
		});
	}
};

const handleAddFavouriteMovie = async (req, res) => {
	try {
		let data = req.body;
		const message = await userService.addFavouriteMovie(data);
		return res.status(200).json(message);
	} catch (error) {
		console.error('Server Error', error);
		return res.status(500).json({
			errCode: 2,
			errMessage: 'Server Error',
		});
	}
};

const handleDeleteFavouriteMovie = async (req, res) => {
	try {
		let data = req.body;
		const message = await userService.deleteFavouriteMovie(data);
		return res.status(200).json(message);
	} catch (error) {
		console.error('Server Error', error);
		return res.status(500).json({
			errCode: 2,
			errMessage: 'Server Error',
		});
	}
};

module.exports = {
	handleLogin: handleLogin,
	handleGetAllUsers: handleGetAllUsers,
	handleCreateNewUser: handleCreateNewUser,
	handleEditUser: handleEditUser,
	handleDeleteUser: handleDeleteUser,
	handleGetAllUserRole: handleGetAllUserRole,
	handleSearchUser: handleSearchUser,
	handleGetUserCount: handleGetUserCount,
	handleGetFavouriteMoviesByUserID: handleGetFavouriteMoviesByUserID,
	handleAddFavouriteMovie: handleAddFavouriteMovie,
	handleDeleteFavouriteMovie: handleDeleteFavouriteMovie,
};
