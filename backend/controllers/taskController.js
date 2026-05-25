const Task = require("../models/Task");
const stages = ["todo", "in-progress", "done"];

const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ tasks });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description = "", stage = "todo" } = req.body;

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ message: "Task title is required." });
    }

    if (typeof description !== "string") {
      return res.status(400).json({ message: "Task description must be text." });
    }

    if (!stages.includes(stage)) {
      return res.status(400).json({ message: "Task stage is invalid." });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description.trim(),
      stage,
      userId: req.user._id
    });

    res.status(201).json({ task });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    if (req.body.title !== undefined) {
      if (typeof req.body.title !== "string") {
        return res.status(400).json({ message: "Task title must be text." });
      }
      if (!req.body.title.trim()) {
        return res.status(400).json({ message: "Task title is required." });
      }
      task.title = req.body.title.trim();
    }

    if (req.body.description !== undefined) {
      if (typeof req.body.description !== "string") {
        return res.status(400).json({ message: "Task description must be text." });
      }
      task.description = req.body.description.trim();
    }

    if (req.body.stage !== undefined) {
      if (!stages.includes(req.body.stage)) {
        return res.status(400).json({ message: "Task stage is invalid." });
      }
      task.stage = req.body.stage;
    }

    const updatedTask = await task.save();
    res.json({ task: updatedTask });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.json({ message: "Task deleted successfully." });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
