const jwt = require('jsonwebtoken');
require('dotenv').config();

const nonSecurePath = [
	'/api/login',
	'/api/user/create-new-user',
	'/api/genre/get-all-genre',
	'/api/actor/get-all-actors',
	'/api/movie/get-all-movies',
];
const createJWT = (payload) => {
	let key = process.env.JWT_SECRET;
	let token = null;
	try {
		token = jwt.sign(payload, key);
	} catch (error) {
		console.log('====================================');
		console.log(error);
		console.log('====================================');
	}
	return token;
};

const verifyToken = (token) => {
	let key = process.env.JWT_SECRET;
	let data = null;
	try {
		let decoded = jwt.verify(token, key);
		data = decoded;
	} catch (error) {
		console.log(error);
	}
	return data;
};

const extractToken = (req) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.split(' ')[0] === 'Bearer'
	) {
		return req.headers.authorization.split(' ')[1];
	}
	return null;
};

const checkUserJWT = (req, res, next) => {
	let cookies = req.cookies;
	const tokenFromHeader = extractToken(req);
	if ((cookies && cookies.jwt) || tokenFromHeader) {
		let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
		let decoded = verifyToken(token);
		req.user = decoded;
		decoded
			? next()
			: res.status(401).json({
					errCode: -1,
					data: '',
					errMessage: 'Not authenticated the user',
			  });
	} else {
		return res.status(401).json({
			errCode: -1,
			data: '',
			errMessage: 'Not authenticated the user',
		});
	}
};

const checkUserPermission = (req, res, next) => {
	if (nonSecurePath.includes(req.path)) return next();

	if (req.user) {
		let email = req.user.email;
		let roleID = req.user.roleID;
		if (!email && !roleID) {
			return res.status(403).json({
				errCode: -1,
				data: '',
				errMessage: `You don't have permission to access`,
			});
		} else {
			next();
		}
	}
};

module.exports = {
	createJWT,
	verifyToken,
	checkUserJWT,
	checkUserPermission,
};
