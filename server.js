'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');

var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

//Setup middleware
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Todo API Root');
});

// GET /todos
app.get('/todos', function(req, res) {
   res.json(todos); //Parse json data
});

// GET /todos/:id
app.get('/todos/:id', function(req, res){
    var todoId = parseInt(req.params.id, 10);
    //Iterate of todos array. Find the match.
    var matchedTodo = _.findWhere(todos, {id: todoId});
    
    if (matchedTodo) {
        res.json(matchedTodo);
    } else {
        res.status(404).send();
    }
});

// POST /todos
app.post('/todos', function(req, res){
    var body = _.pick(req.body, 'description', 'completed'); //Use _.pick to only pick description and completed 
    
    
    
    if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
        return res.status(400).send();
    }
    
    // set body.description to be trimmed value
    body.description = body.description.trim();
    
    //add id field
    body.id = todoNextId++;    
    
    //push body into array
    todos.push(body);    
    
    res.json(body);
});

app.listen(PORT, function(){
    console.log('Express listening on port ' + PORT + '!');
})