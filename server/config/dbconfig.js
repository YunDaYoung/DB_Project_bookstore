var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'bookstore2'
})

module.exports = pool;