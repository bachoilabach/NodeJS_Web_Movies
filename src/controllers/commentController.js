import commentService from '../services/commentService';

const handleGetAllComments = async (req,res)=>{
    let id = req.query.id
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing parameters",
            comments:[]
        })
    }

    let comments = await commentService.getAllComments(id)

    return res.status(200).json({
        errCode: 0,
        comments
    })
}

const handleCreateNewComment = async (req,res)=>{
    let message = await commentService.createComment(req.body)
    return res.status(200).json(message)
}

const handleGetCommentByMovieID = async(req,res)=>{
    let id = req.query.id
    let comments = await commentService.getCommentByMovieID(id)
    return res.status(200).json({
        errCode: 0,
        comments
    })
}

const handleCountComment = async(req,res)=>{
    let count = await commentService.countComment()
    return res.status(200).json({
        errCode: 0,
        count
    })
}

const hanldeDeleteComment = async (req,res)=>{
    let id = req.body.id
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters'
        })
    }
    let message = await commentService.deleteComment(id)
    return res.status(200).json(message)
}

module.exports = {
    handleGetAllComments: handleGetAllComments,
    handleCreateNewComment: handleCreateNewComment,
    handleGetCommentByMovieID: handleGetCommentByMovieID,
    handleCountComment: handleCountComment,
    hanldeDeleteComment: hanldeDeleteComment
};
