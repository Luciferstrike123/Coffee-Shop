const fs = require("fs")
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: "avnadmin",
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync("./configs/ca.pem").toString(),
    },
})

module.exports = pool;