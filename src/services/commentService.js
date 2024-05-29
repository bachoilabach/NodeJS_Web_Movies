const { where } = require('sequelize');
const db = require('../models');

const getAllComments = (commentID) => {
	return new Promise(async (resolve, reject) => {
		try {
			let comments = '';
			if (commentID === 'ALL') {
				comments = await db.comment.findAll();
			}
			if (commentID && commentID !== 'ALL') {
				comments = await db.comment.findOne({
					where: { commentID: commentID },
				});
			}
			resolve(comments);
		} catch (error) {
			reject(error);
		}
	});
};

const getUserNameByUserID = async (userID) => {
	try {
		console.log(userID)
		const response = await db.user.findOne({
			where: { userID: userID },
			attributes: {
				exclude: ['password'],
			},
		});
		return response.fullName
	} catch (error) {
		console.log(error);
	}
};

const getUserIDByEmail = async (email) => {
	try {
		const response = await db.user.findOne({
			where: { email: email },
			attributes: {
				exclude: ['password'],
			},
		});
		return response.userID
	} catch (error) {
		console.log(error);
	}
};

const createComment = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const userID = await getUserIDByEmail(data.email)
			console.log(userID)
			if (!userID) {
				resolve({
					errCode: 1,
					errMessage: "If you don't have account, sign up to comment",
				});
			} else {
				const createdComment = await db.comment.create({
					movieID: data.movieID,
					userID: userID,
					userName:await getUserNameByUserID(userID),
					content: data.content,
					commentDate: new Date()
				});
				resolve({
					errCode: 0,
					errMessage: 'Comment Success',
					createdComment
				})
			}
		} catch (error) {
			console.log(error);
			reject(error)
		}
	});
};

const getCommentByMovieID = async(movieID)=>{
	try {
		let comments = []
		comments = await db.comment.findAll({
			where: {movieID: movieID}
		})
		console.log(comments)
		return comments
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	getAllComments: getAllComments,
	createComment: createComment,
	getCommentByMovieID: getCommentByMovieID
};
