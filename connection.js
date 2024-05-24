require('dotenv').config()
const { Client } = require('pg')
const client = new Client({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: 'localhost',
    port: 5432,
    database: process.env.DATABASE,
})

module.exports = client