const communcationModels = require('../models/communication')
const { response } = require('../helpers/common')

const getCommentAll = async(req, res) => {
    try {
        const {rows} = await communcationModels.getAllComment()
        response(res, rows, 'success', 200, 'get all comments success')
    } catch (error) {
        console.log(error);
    }
}

const getDetailComment = async(req,res) => {
    const id = req.params.id
    try {
        const {rows} = await communcationModels.getDetailComment(id);
        response(res, rows, 'success', 200, 'sucess get food comments')
    } catch (error) {
        console.log(error);
    }
}

const postComment = async(req,res) => {
    try {
        // const { comment, userid, recipeid } = req.body
        // const data = { comment, userid, recipeid }
        await communcationModels.addComment(req.body)
        response(res, null, 'success', 200, 'comment success')
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCommentAll,
    getDetailComment,
    postComment
}