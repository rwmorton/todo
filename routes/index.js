"use strict";

const router = require('express').Router();
const userRoutes = require('./user');
const todosRoutes = require('./todos');

router.use((req,res,next) =>
{
    res.locals.currentUser = req.user;
    next();
});

router.use('/user',userRoutes);
router.use('/todos',todosRoutes);

router.get('/',(req,res) =>
{
    res.render('index');
});

module.exports = router;
