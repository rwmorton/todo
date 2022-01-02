"use strict";

console.log('starting the todo app...');

//start express server first, then the database, then initialize passport
//probably not necessary to await on each init()...
require('./config/express').init();
require('./config/mongoose').init();
require('./config/passport').init();
