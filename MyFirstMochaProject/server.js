// Very simple recipes REST server
var config = require('./config.json');
var http = require('http');
var express = require('express');
var server = express();

server.set('PORT', config.webPort);

server.all('*', function(request, response, next) {
    console.log(request.method + " " + request.url);
    next();
})

server.use('/api/v1', require('./routes/routes_api_v1'));
server.use('/api/v2', require('./routes/routes_api_v2'));

var port = process.env.PORT || server.get('PORT');

server.listen(port, function() {
    console.log('Recipes REST server active on port:' + port);
});

module.exports = server;