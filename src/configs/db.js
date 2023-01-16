require('dotenv').config()
/* eslint-disable no-undef */
const {Pool} = require('pg')
const pool = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    // connectionString: process.env.DB_CONNECTIONSTRING
    // ssl: {
    //     rejectUnauthorized: false,
    // }
})

module.exports = pool