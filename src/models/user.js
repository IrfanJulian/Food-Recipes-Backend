const pool = require('../configs/db')

const getData = () => {
    return pool.query(`SELECT * FROM users`);
}

const findUserEmail = (email) => {
    return pool.query(`SELECT * FROM users WHERE email='${email}'`)
}

const insertData = (data) => {
    const { id, name, phone, email, password, new_password } = data
    return pool.query(`INSERT INTO users(id, name, phone, email, password, new_password)VALUES('${id}', '${name}', ${phone}, '${email}', '${password}', '${new_password}')`)
}

const updateData = (id, data) => {
    const { name, phone, email, password, new_password, photo } = data
    return pool.query(`UPDATE users SET name='${name}', phone='${phone}', email='${email}', password='${password}', new_password='${new_password}', photo='${photo}' WHERE id=${id}`)
}

const deleteData = (id) => {
    return pool.query(`DELETE FROM users WHERE id='${id}'`)
}

module.exports = {
    getData,
    insertData,
    updateData,
    deleteData,
    findUserEmail
}