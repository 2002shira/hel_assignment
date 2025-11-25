import React from "react";
import TaskItem from "./TaskItem";
import "../styles/TaskList.css";

const TaskList = ({ tasks = [], onEdit, onDelete }) => {
  if (!tasks || tasks.length === 0) return <p className="no-tasks">No tasks yet!</p>;

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div className="task-list-item" key={task.id}>
          <TaskItem task={task} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
