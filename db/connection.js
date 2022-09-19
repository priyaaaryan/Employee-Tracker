const mysql2 = require("mysql2");

const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "Happ!ness7",
  database: "employeeTracker_db",
});

module.exports = connection;
