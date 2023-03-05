const pool = require('../configs/db')

const getAllComment = () =>{
    return pool.query(`SELECT * FROM communication`);
}

const getDetailComment = (id) => {
    return pool.query(`SELECT communication.comment, communication.userid, communication.recipeid, users.photo, users.name FROM communication INNER JOIN users ON communication.userid = users.id WHERE recipeid = ${id}`)
}

const addComment = (data) => {
    const {comment, userid, recipeid} = data
    return pool.query(`INSERT INTO communication(comment, userid, recipeid)VALUES('${comment}', '${userid}', ${recipeid})`)
}

module.exports = {
    getAllComment,
    getDetailComment,
    addComment
}