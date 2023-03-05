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
    const { id, name, phone, email, password, otp } = data
    return pool.query(`INSERT INTO users(id, name, phone, email, password, otp)VALUES('${id}', '${name}', ${phone}, '${email}', '${password}', '${otp}')`)
}

const forgotPassword = (email, otp) => {
    return pool.query(`UPDATE users SET otp = '${otp}' WHERE email = '${email}'`)
}

const resetPassword = (email, password) => {
    return pool.query(`UPDATE users SET password = '${password}' WHERE email = '${email}'`)
}

const updateData = (data) => {
    const { id, name, photo } = data
    return pool.query(`UPDATE users SET photo='${photo}', name='${name}' WHERE id='${id}'`)
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
    getProfile,
    forgotPassword,
    resetPassword
}