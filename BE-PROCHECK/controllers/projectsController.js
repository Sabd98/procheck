const express = require("express");
const router = express.Router();
const Project = require("../models/projectsModel");
const Task = require("../models/tasksModel");
const { body, validationResult } = require("express-validator");

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a project
router.post(
  "/",
  [
    body("title").trim().isLength({ min: 5 }),
    body("dueDate").trim().notEmpty(),
  ],
  async (req, res) => {
    console.log(req.body);

    try {
      const { title, description, dueDate } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ error: "Title and due date are required" });
      }

      const project = new Project({
        title,
        description,
        dueDate: new Date(dueDate),
      });

      const savedProject = await project.save();
      res.status(201).json(savedProject);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Delete a project
router.delete("/:id", async (req, res) => {
  try {
    
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    await project.deleteOne();
    await Task.deleteMany({ projectId: req.params.id });

    res.json({ message: "Project and associated tasks deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
