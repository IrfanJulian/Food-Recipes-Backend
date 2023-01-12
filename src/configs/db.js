/* eslint-disable no-undef */
const {Pool} = require('pg')
const pool = new Pool({
    user: `postgres`,
    host: `containers-us-west-118.railway.app`,
    database: `railway`,
    password: `QHO7cBe8SNPxTxMytYbC`,
    port: 5504,
    ssl: {
        rejectUnauthorized: false,
    }
})

module.exports = pool