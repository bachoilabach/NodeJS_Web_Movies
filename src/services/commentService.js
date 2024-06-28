const { where } = require('sequelize');
const db = require('../models');

const getAllComments = async (commentID) => {
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
		return comments
	} catch (error) {
		return (error);
	}
};

const getUserNameByUserID = async (userID) => {
	try {
		console.log(userID);
		const response = await db.user.findOne({
			where: { userID: userID },
			attributes: {
				exclude: ['password'],
			},
		});
		return response.fullName;
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
		return response.userID;
	} catch (error) {
		console.log(error);
	}
};

const createComment = async (data) => {
	try {
		const userID = await getUserIDByEmail(data.email);
		console.log(userID);
		if (!userID) {
			return {
				errCode: 1,
				errMessage: "If you don't have account, sign up to comment",
			}
		} else {
			const createdComment = await db.comment.create({
				movieID: data.movieID,
				userID: userID,
				userName: await getUserNameByUserID(userID),
				content: data.content,
				commentDate: new Date(),
			});
			return {
				errCode: 0,
				errMessage: 'Comment Success',
				createdComment,
			}
		}
	} catch (error) {
		console.log(error);
		return (error);
	}
};

const getCommentByMovieID = async (movieID) => {
	try {
		let comments = [];
		comments = await db.comment.findAll({
			where: { movieID: movieID },
		});
		return comments;
	} catch (error) {
		console.log(error);
	}
};

const deleteComment = async(commentID)=>{
	try {
		let comment = await db.comment.findOne({
			where: {
				commentID: commentID
			}
		})
		if(!comment){
			return {
				errCode: 2,
				errMessage: `The comment isn't exist`
			}
		}
		await db.comment.destroy({
			where: {
				commentID: commentID
			}
		})
		return {
			errCode: 0,
			errMessage: 'Delete Comment success'
		}
	} catch (error) {
		return(error)
	}
}

const countComment = async ()=>{
	return await db.comment.count()
}

module.exports = {
	getAllComments: getAllComments,
	createComment: createComment,
	getCommentByMovieID: getCommentByMovieID,
	countComment: countComment,
	deleteComment: deleteComment
};
