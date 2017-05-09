/**
 * Created by hajlinde on 9-5-2017.
 */
// API v1
var express = require('express');
var router = express.Router();
var world = require('../db/world');

router.get('/cities', function(request, response) {
    response.contentType('application/json');
    var countrycode = request.query.countrycode || '';
    // console.log('countrycode:' + countrycode);
    var limit = request.query.limit || '1000';
    // console.log('limit:' + limit);
    var querystring;
    if (countrycode) {
        querystring = 'SELECT * FROM city WHERE CountryCode = "' + countrycode + '" LIMIT ' + limit + ';';
    } else {
        querystring = 'SELECT * FROM city LIMIT ' + limit + ';';
    }
    // console.log('Query:' + querystring);
    // world.query(querystring, function(error, rows, fields) {
    //     if (error) {
    //         console.log(error);
    //         response.status(400).json(error);
    //     } else {
    //         response.status(200).json(rows);
    //     };
    // });
    world.getConnection(function(error, connection) {
        if (error) { throw error }
        connection.query(querystring, function(error, rows, fields) {
            connection.release();
            if (error) { throw error }
            response.status(200).json(rows);
        });
    });
});

router.get('/cities/:id', function(request, response) {
    response.contentType('application/json');
    var id = request.params.id;
    world.query('SELECT * FROM city WHERE ID=?', [id], function(error, rows, fields) {
        if (error) {
            console.log(error);
            response.status(400).json(error);
        } else {
            response.status(200).json(rows);
        }
    });
});

module.exports = router;