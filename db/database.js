const mysql = require('mysql2');

// Create the connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'Lunaruns32!1',
    database: 'company_db'
  });

  module.exports = connection;