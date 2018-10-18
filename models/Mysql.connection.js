var mysql = require('mysql');

var DB = require('../configs/db');
var connection  = mysql.createConnection({
  port: DB.PORT_DB,
  host: DB.HOST_DB,
  user: DB.USER_DB,
  password: DB.PASSWORD_DB,
  database: DB.NAME_DB
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('Mysql connected as id ' + connection.threadId);
});

module.exports = connection;