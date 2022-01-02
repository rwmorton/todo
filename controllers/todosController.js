"use strict";

const Todo = require('../models/todo');
const User = require('../models/user');

//not loading properly
exports.loadTodos = (req,res) =>
{
    let userId;
    if(res.locals.currentUser) userId = res.locals.currentUser._id.toString();
    User.findById(userId).populate('todos').exec((error,{todos}) =>
    {
        if(error) return console.error(error);
        res.render('todos/todos',{todos: todos});
    });
};

exports.add = ((req,res) =>
{
    res.render('todos/add');
});

exports.create = (req,res,next) =>
{
    let newTodo = new Todo({todo: req.body.todo,user: res.locals.currentUser._id});
    Todo.create(newTodo)
    .then(todo =>
    {
        if(todo)
        {
            res.locals.currentUser.todos.push(todo);
            res.locals.currentUser.save();
        }
        next();
    })
    .catch(error =>
    {
        console.error(`Error saving todo: ${error.message}`);
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
