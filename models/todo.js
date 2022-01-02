"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema
({
    todo:
    {
        type: String,
        required: true
    },
    completed:
    {
        type: Boolean,
        default: false
    },
    user:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true});

module.exports = mongoose.model('Todo',TodoSchema);
