const mysql = require("mysql");
const config = require("../database/dbConfig");

var connection = mysql.createPool({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB,
});

module.exports = connection;
