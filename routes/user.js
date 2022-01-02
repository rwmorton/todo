"use strict";

const router = require('express').Router();

const User = require('../models/user');
const userController = require('../controllers/userController');

router.get('/register',userController.new);
router.post('/register',userController.create);
router.get('/login',userController.login);
router.post('/login',userController.authenticate);
router.get('/logout',userController.logout);

module.exports = router;
