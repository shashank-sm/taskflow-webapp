const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      maxlength: [120, "Title cannot exceed 120 characters"]
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      default: ""
    },
    stage: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo"
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true
    }
  },
  { timestamps: true }
);

taskSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Task", taskSchema);

