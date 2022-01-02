"use strict";

const path = require('path');
const express = require('express');
const passport = require('passport');

const routes = require('../routes/index');

const host = 'localhost';
const port = process.env.PORT || 3000;
const staticPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../views');
const sessionSecret = 'Ddrp3:kdJQWU-/Sx';

const app = express();
//app set
app.set('views',viewsPath);
app.set('view engine','ejs');
//app use
app.use(require('method-override')('_method',{methods: ['POST','GET']}));
app.use(express.static(staticPath));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({extended: false}));
app.use(require('express-session')({secret: sessionSecret,resave: true,saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/',routes);

exports.init = (async () =>
{
    console.log(`attempting to start server on ${host}:${port}`);
    await app.listen(port,() => { console.log(`server is running on ${host}:${port}`)});
});
