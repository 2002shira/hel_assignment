import React from "react";
import "../styles/TaskItem.css";

const TaskItem = ({ task, onEdit, onDelete }) => {
  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className={`priority ${task.priority || 'medium'}`}></div>
      <div className="task-body">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <div className="meta">{new Date(task.createdAt).toLocaleString()}</div>
      </div>
      <div className="task-actions">
        <button className="edit" onClick={() => onEdit(task)}>Edit</button>
        <button className="delete" onClick={() => onDelete && onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
