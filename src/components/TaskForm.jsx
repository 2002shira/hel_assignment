import React, { useState, useEffect } from "react";
import "../styles/TaskForm.css";

const TaskForm = ({ onSubmit, taskToEdit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority || "medium");
      setCompleted(!!taskToEdit.completed);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: title.trim(),
      description: description.trim(),
      priority: priority || "medium",
      completed: !!completed,
      createdAt: taskToEdit ? taskToEdit.createdAt : new Date().toISOString(),
    };
    onSubmit(payload);
    setTitle("");
    setDescription("");
    setPriority("medium");
    setCompleted(false);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="task-input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="task-textarea"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="task-extra">
        <label>
          Priority
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label className="completed-label">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />{" "}
          Completed
        </label>
      </div>
      <div className="form-buttons">
        <button type="submit">
          {taskToEdit ? "Update Task" : "Add Task"}
        </button>
        {taskToEdit && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
