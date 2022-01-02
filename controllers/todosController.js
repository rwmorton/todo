"use strict";

const Todo = require('../models/todo');
const User = require('../models/user');

exports.loadTodos = (req,res) =>
{
    let userId;
    if(res.locals.currentUser) userId = res.locals.currentUser._id.toString();
    User.findById(userId).populate('todos').exec((error,{todos}) =>
    {
        if(error) return console.error(error);
        todos.forEach(todo =>
        {
            res.render('todos/todos',{todos: todos});
        });
    });
};

exports.add = ((req,res) =>
{
    res.render('todos/add');
});

exports.create = (req,res,next) =>
{
    let newTodo = new Todo({todo: req.body.todo,user: res.locals.currentUser._id});
    console.log(newTodo + ' for ' + res.locals.currentUser);
    Todo.create(newTodo)
    .then(todo =>
    {
        /////// TO CHECK ///////
        ///////////// NOT THE BEST SOLUTION ////////////////
        ///// ADD THIS TODO TO THE CURRENT USRS TODO ARRAY
        if(todo)
        {
            res.locals.currentUser.todos.push(todo);
            res.locals.currentUser.save();
            console.log(res.locals.currentUser.todos);
        }
        res.locals.redirect = 'todos/todos';
        next();
    })
    .catch(error =>
    {
        console.error(`Error savingtodo: ${error.message}`);
        next(error);
    });
};

exports.edit = (req,res,next) =>
{
    let todoId = req.params.id;
    Todo.findById(todoId)
    .then(todo =>
    {
        res.render('todos/edit',{todo,todo});
    })
    .catch(error =>
    {
        res.locals.redirect = 'todos';
        next(error);
    });
};

exports.update = (req,res,next) =>
{
    const todoId = req.params.id;
    Todo.findByIdAndUpdate(todoId,{$set: {todo: req.body.todo}})
    .then(() =>
    {
        next();
    })
    .catch(error =>
    {
        console.error(error);
        next(error);
    });
};

exports.delete = (req,res,next) =>
{
    let todoId = req.params.id;
    console.log(todoId);
    Todo
    .findByIdAndRemove(todoId)
    .then(() =>
    {
        next();
    })
    .catch(error =>
    {
        console.error(error);
        next(error);
    });
};
