import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { fetchTasks, createTask, updateTask, deleteTask } from "./services/task.service";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');


  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      if (!Array.isArray(data)) {
        console.error('Unexpected tasks response (not an array):', data);
        setMessage('שגיאה: קבלת נתונים לא תקינה מהשרת');
        setTasks([]);
        return;
      }
      setTasks(data);
    } catch (err) {
      console.error(err);
      setMessage("Error loading tasks");
      setTasks([]);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddOrUpdate = async (task) => {
    try {
      if (taskToEdit) {
        await updateTask(taskToEdit.id, task);
        setMessage("Task updated successfully!");
        setTaskToEdit(null);
      } else {
        await createTask(task);
        setMessage("Task created successfully!");
      }
      setShowForm(false);
      loadTasks();
    } catch (err) {
      console.error(err);
      setMessage("Error saving task");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setMessage("Task deleted!");
      loadTasks();
    } catch (err) {
      console.error(err);
      setMessage("Error deleting task");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setShowForm(true);
  };

  const visibleTasks = filter === 'completed' ? tasks.filter(t => t.completed) : tasks;

  return (
    <div className="app-container">
      <h1>My Tasks</h1>
      {message && <div className="notification">{message}</div>}
      <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}>
        <button className="toggle-button" onClick={() => { setShowForm(s => !s); setTaskToEdit(null); }}>{showForm ? 'Close' : 'New Task'}</button>
        <button className={`filter-button ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Show All</button>
        <button className={`filter-button ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Show Completed</button>
        <p style={{margin:0,color:'#6b7280'}}>Click "New Task" to open the form</p>
      </div>
      {(showForm || taskToEdit) && (
        <div className="form-container">
          <TaskForm onSubmit={handleAddOrUpdate} taskToEdit={taskToEdit} onCancel={() => { setTaskToEdit(null); setShowForm(false); }} />
        </div>
      )}
      <TaskList tasks={visibleTasks} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;
