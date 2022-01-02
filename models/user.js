"use strict";

const mongoose = require('mongoose');
const Todo = require('./todo');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema
({
    username: String,
    password: String,
    todos: [{type: Schema.Types.ObjectId, ref: 'Todo'}]
},{timestamps: true});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',UserSchema);