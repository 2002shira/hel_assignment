import React from "react";
import TaskItem from "./TaskItem";
import "../styles/TaskList.css";

const TaskList = ({ tasks = [], onEdit, onDelete }) => {
  if (!tasks || tasks.length === 0) return <p className="no-tasks">No tasks yet!</p>;

  const displayTasks = [...tasks, ...tasks];

  return (
    <div className="task-list-container vertical-carousel">
      <div className="task-list carousel">
        {displayTasks.map((task, index) => (
          <div className="task-list-item" key={`${task.id}-${index}`}>
            <TaskItem task={task} onEdit={onEdit} onDelete={onDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
