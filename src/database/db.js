// Database import
const sqlite = require('sqlite3').verbose();
// Creating a new database
const database = new sqlite.Database("./src/database/ecoleta.db");

module.exports = database;