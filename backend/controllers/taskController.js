const taskService = require('../services/taskService');
const Task = require('../models/Task');

const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, tasks });
  } catch (err) {
    next(err);
  }
};

const createTask = async (req, res, next) => {
  try {
    const rawStatus = req.body.status || 'pending';
    const status = rawStatus === 'todo' ? 'pending' : rawStatus;

    const task = await Task.create({
      user: req.user._id,
      title: req.body.title,
      description: req.body.description,
      status,
    });

    res.status(201).json({ success: true, task });
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(req.user.id, req.params.id, req.body);
    res.status(200).json({ success: true, task });
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.user.id, req.params.id);
    res.status(200).json({ success: true, message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};

const getTaskStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [total, completed, inProgress] = await Promise.all([
      Task.countDocuments({ user: userId }),
      Task.countDocuments({ user: userId, status: 'completed' }),
      Task.countDocuments({ user: userId, status: 'in-progress' }),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        total,
        completed,
        inProgress,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask, getTaskStats };
