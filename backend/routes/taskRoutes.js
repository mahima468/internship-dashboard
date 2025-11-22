const express = require('express');
const { body } = require('express-validator');
const { getTasks, createTask, updateTask, deleteTask, getTaskStats } = require('../controllers/taskController');
const protect = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');

const router = express.Router();

router.post(
  '/',
  protect,
  validate([
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
  ]),
  createTask
);

router.get('/', protect, getTasks);

router.get('/stats', protect, getTaskStats);

router.put(
  '/:id',
  validate([
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().notEmpty().withMessage('Description cannot be empty'),
    body('status').optional().isIn(['pending', 'completed']).withMessage('Invalid status'),
  ]),
  updateTask
);

router.delete('/:id', deleteTask);

module.exports = router;
