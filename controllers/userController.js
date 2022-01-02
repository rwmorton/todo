"use strict";

const passport = require('passport');

const User = require('../models/user');
const Todo = require('../models/todo');
const res = require('express/lib/response');

exports.new = (req,res) =>
{
    res.render('user/register');
};

exports.create = (req,res) =>
{
    User.register(new User({username: req.body.username}),req.body.password,(error,user) =>
    {
        if(error)
        {
            return res.render('user/register',{user: user});
        }
        passport.authenticate('local')(req,res,() => res.redirect('/'));
    });
};

exports.login = (req,res) =>
{
    res.render('user/login');
};

exports.authenticate = passport.authenticate
(
    'local',
    {
        failureRedirect: 'login',
        successRedirect: '/'
    }
);

exports.logout = (req,res) =>
{
    req.logout();
    res.redirect('/');
};
