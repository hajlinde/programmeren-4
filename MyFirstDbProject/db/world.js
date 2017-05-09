/**
 * Created by hajlinde on 9-5-2017.
 */
var mysql = require('mysql');
var config = require('../config/config.json');

// Better use pool, see below
var connection = mysql.createConnection({
    host : process.env.DB_HOST || config.dbHost,
    user : process.env.DB_USER || config.dbUser,
    password : process.env.DB_PASSWORD || config.dbPassword,
    database : process.env.DB_DATABASE || config.dbDatabase
});

connection.connect(function(error) {
    if (error) {
        console.log(error);
        return;
    } else {
        console.log("Connected to " + config.dbHost + ":" + config.dbDatabase);
    }
});

// Connection pool, to prevent adding connections that are never closed
var pool = mysql.createPool({
    connectionLimit: 25,
    host : process.env.DB_HOST || config.dbHost,
    user : process.env.DB_USER || config.dbUser,
    password : process.env.DB_PASSWORD || config.dbPassword,
    database : process.env.DB_DATABASE || config.dbDatabase
});

//module.exports = connection;
module.exports = pool;