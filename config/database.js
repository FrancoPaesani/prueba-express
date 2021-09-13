const sql = require('mssql');
require('dotenv').config();
const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: 'localhost',
    options: {
        encrypt: false
    }
}

async function getUsers() {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(sqlConfig)
        const result = await sql.query`select * from users`
        console.log(result.recordset);
        return result.recordset;
       } catch (err) {
        console.log(err);
       }
}

async function getUser(user) {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(sqlConfig)
        const result = await sql.query`select * from users where user_name = ${user.name}`
        console.dir(result);
       } catch (err) {
        console.log(err);
       }
}

async function registerUser(user) {
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query`INSERT INTO Users.dbo.users (user_name, user_pass)
        VALUES(${user.name}, ${user.password})`
        console.dir(result);
       } catch (err) {
        console.log(err);
       }
}

module.exports = {
    getUser: getUser,
    getUsers: getUsers,
    registerUser: registerUser
}