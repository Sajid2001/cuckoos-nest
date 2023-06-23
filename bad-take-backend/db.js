const mysql = require("mysql2/promise");
const dotenv = require('dotenv')
dotenv.config();

const db = mysql.createPool({
    user: process.env.MYSQL_USERNAME,
    host: process.env.MYSQL_HOST,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

console.log('SQL connected');

  module.exports = db;