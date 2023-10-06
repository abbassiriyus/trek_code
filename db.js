const { Client } = require("pg")
require('dotenv').config()
const pool = new Client({
    user: "postgres",
    host: process.env.HOST_PG,
    database: "railway",
    password: process.env.PASSWORD_PG,
    port: process.env.PORT_PG,
})
pool.connect(err => {
    if(err) {
        console.log("Connect Error");
    } else {
        console.log("Connect To PostgreSql");
    }
})

module.exports = pool