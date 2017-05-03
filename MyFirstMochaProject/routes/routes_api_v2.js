// API version 2
var express = require('express');
var router = express.Router();
var path = require('path');
var recipes = require('../recipes.js');

router.get('/info', function(request, response) {
    response.status(200);
    response.json({
        "description": "This is my first simple recipe REST service"
    });
});

router.get('/recipes', function(request, response) {
    response.status(200);
    response.json(recipes);
});

router.get('/recipes', function(request, response) {
    var cat = request.query.category || '';
    var result = recipes.filter(function(recipe) {
        return (recipe.category === cat);
    });
    response.json(result);
});

router.get('/recipes/:number', function(request, response) {
    var number = request.params.number || 0;
    var recipe = recipes[number];
    response.json(recipe);
});

router.get('*', function(request, response) {
    response.status(404);
    response.json({
        "description": "404 - Not found"
    });
});

module.exports = router;