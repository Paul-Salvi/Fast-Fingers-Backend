'use strict';
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const dbConnection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE
});
dbConnection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
  return true;
});

module.exports = dbConnection;