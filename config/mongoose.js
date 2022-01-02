"use strict";

const mongoose = require('mongoose');

mongoose.promise = global.Promise;

const db_provider = 'mongodb';
const host = 'localhost';
const port = 27017;
const db = 'todo_db';
const db_uri = `${db_provider}://${host}:${port}/${db}`;

exports.init = (async () =>
{
    console.log(`connecting to ${db_uri}...`);
    await mongoose.connect(db_uri);
    console.log(`connected to ${db_uri}`);
});
