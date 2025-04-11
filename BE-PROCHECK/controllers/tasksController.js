const express = require('express');
const router = express.Router();
const Task = require('../models/tasksModel');
const { body, validationResult } = require("express-validator");

// Get tasks from a project
router.get('/', async (req, res) => {
  try {
    const { projectId } = req.query;
    const tasks = await Task.find({ projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a task
router.post('/', [
    body("text").trim().isLength({ min: 5 }).notEmpty()
  ], async (req, res) => {
  try {
    const { text, projectId } = req.body;
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Input is too short' });
    }

    const task = new Task({
      text: text,
      projectId,
      completed: false
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    await task.deleteOne();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle complpp
router.patch('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.completed = !task.completed;
    const updatedTask = await task.save();
    
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;