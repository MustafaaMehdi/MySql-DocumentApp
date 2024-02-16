const mysql = require('mysql2');
const connect = require('../app.js');

const connection = mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "documentApp",
    password: "documentApp",
    database: "document_app"
})

module.exports = connection;