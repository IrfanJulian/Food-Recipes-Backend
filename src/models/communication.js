const pool = require('../configs/db')

const getAllComment = () =>{
    return pool.query(`SELECT * FROM communication`);
}

const getDetailComment = (id) => {
    return pool.query(`SELECT communication.comment, communication.liked, users.name, users.photo, recipes.tittle FROM communication INNER JOIN users ON communication.userid = users.id INNER JOIN recipes ON recipes.id = communication.recipeid WHERE communication.recipeid = ${id}`)
    // return pool.query(`SELECT communication.comment, communication.liked, users.name, users.photo, recipes.tittle FROM communication INNER JOIN users ON communication.userid = users.id INNER JOIN recipes ON recipes.id = ${id}`)
}

const addComment = (data) => {
    const {userid, recipeid, comment} = data
    return pool.query(`INSERT INTO communication(userid, recipeid, comment)VALUES('${userid}', ${recipeid}, '${comment}')`)
}

module.exports = {
    getAllComment,
    getDetailComment,
    addComment
}