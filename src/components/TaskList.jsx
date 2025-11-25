import React, { useRef, useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import "../styles/TaskList.css";

const TaskList = ({ tasks, onEdit, onDelete, onToggle }) => {
  const [taskList, setTaskList] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    setTaskList([...tasks, ...tasks]);
  }, [tasks]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const speed = 1;
    const step = () => {
      if (container.scrollTop >= container.scrollHeight / 2) {
        container.scrollTop = 0;
      }
      container.scrollTop += speed;
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [taskList]);

  if (!tasks || tasks.length === 0) return <p className="no-tasks">No tasks yet!</p>;

  return (
    <div className="task-list-container" ref={containerRef}>
      <div className="task-list">
        {taskList.map((task, index) => (
          <TaskItem
            key={task.id + "-" + index}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
