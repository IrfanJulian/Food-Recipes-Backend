const pool = require('../configs/db')

const getData = () => {
    return pool.query(`SELECT * FROM users`);
}

const findUserEmail = (email) => {
    return pool.query(`SELECT * FROM users WHERE email='${email}'`)
}

const getProfile = (id) => {
    return pool.query(`SELECT * FROM users WHERE id = '${id}'`)
}

const insertData = (data) => {
    const { id, name, phone, email, password } = data
    return pool.query(`INSERT INTO users(id, name, phone, email, password)VALUES('${id}', '${name}', ${phone}, '${email}', '${password}')`)
}

// const myRecipe = (id) => {
//     return pool.query(`SELECT users.*, recipes.tittle AS recipes FROM users INNER JOIN recipes ON users.id=recipes.userID WHERE users.id='${id}'`)
// }

const updateData = (data) => {
    const { id, photo } = data
    return pool.query(`UPDATE users SET photo='${photo}' WHERE id='${id}'`)
}

const deleteData = (id) => {
    return pool.query(`DELETE FROM users WHERE id='${id}'`)
}

module.exports = {
    getData,
    insertData,
    updateData,
    deleteData,
    findUserEmail,
    getProfile
    // myRecipe
}