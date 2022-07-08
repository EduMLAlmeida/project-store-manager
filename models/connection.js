const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  hostname: 'localhost',
  user: 'eduardo',
  password: 'erica3001',
  database: 'StoreManager',
  port: '3306',
});

module.exports = connection;
