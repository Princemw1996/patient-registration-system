// server/db.js
const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: '127.0.0.1', // or your MySQL server host
    user: 'prince', // replace with your MySQL username
    password: 'Prince@1996Mw', // replace with your MySQL password
    database: 'patient_db', // replace with your database name
});

const promisePool = pool.promise();

module.exports = promisePool;
