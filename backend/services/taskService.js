const Task = require('../models/Task');

const getTasks = async (userId) => {
  const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });
  return tasks.map((t) => t.toJSON());
};

const createTask = async (userId, data) => {
  const { title, description, status } = data;
  const task = await Task.create({
    title,
    description,
    status: status || 'pending',
    user: userId,
  });
  return task.toJSON();
};

const updateTask = async (userId, taskId, data) => {
  const task = await Task.findOne({ _id: taskId, user: userId });
  if (!task) {
    const err = new Error('Task not found');
    err.statusCode = 404;
    throw err;
  }

  if (data.title !== undefined) task.title = data.title;
  if (data.description !== undefined) task.description = data.description;
  if (data.status !== undefined) task.status = data.status;

  await task.save();
  return task.toJSON();
};

const deleteTask = async (userId, taskId) => {
  const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
  if (!task) {
    const err = new Error('Task not found');
    err.statusCode = 404;
    throw err;
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
