// Very simple RESTful server using a local MySQL database
var config = require('./config/config.json');
var express = require('express');
var server = express();

server.set('PORT', config.webPort);

// Log each request
server.all('*', function(request, response, next) {
    console.log(request.method + " " + request.url);
    next();
})

// API endpoints
server.use('/api/v1', require('./api/api_v1'));

// Catch all with 'not found'
server.all('*', function(request, response) {
    response.status(404).end("404 - Not found");
})

var port = process.env.PORT || server.get('PORT');
server.listen(port, function() {
    console.log('REST server listening on port:' + port);
});

// For testing with Mocha and Chai
module.exports = server;