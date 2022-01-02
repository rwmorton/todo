"use strict";

const router = require('express').Router();

const todosController = require('../controllers/todosController');

router.get('/',todosController.loadTodos);
router.get('/add',todosController.add);
router.post('/add',todosController.create,todosController.loadTodos);
router.get('/:id/edit',todosController.edit,todosController.loadTodos);
router.put('/:id/update',todosController.update,todosController.loadTodos);
router.delete('/:id/delete',todosController.delete,todosController.loadTodos);

module.exports = router;
