const mysql2 = require('mysql2/promise');

const pool = mysql2.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    database: process.env.DB_NAME || 'library',
    password: process.env.DB_PASSWORD || 'password',
});

pool.on('connection', (connection) => {
    connection.execute("SET time_zone = '+00:00'");
});

module.exports = pool;
