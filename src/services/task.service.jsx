const API_URL = "http://localhost:4000/api/tasks";

async function handleRes(res) {
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = text;
  }
  if (!res.ok) {
    const msg = (data && data.error) || data || res.statusText || "Request failed";
    const err = new Error(msg);
    err.status = res.status;
    err.body = data;
    throw err;
  }
  return data;
}

export const fetchTasks = async () => {
  const res = await fetch(`${API_URL}/getAll`);
  return await handleRes(res);
};

export const createTask = async (task) => {
  const res = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return await handleRes(res);
};

export const updateTask = async (id, task) => {
  const res = await fetch(`${API_URL}/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return await handleRes(res);
};

export const deleteTask = async (id) => {
  const res = await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });
  if (res.status === 204) return true;
  return await handleRes(res);
};

export const toggleTask = async (id, completed) => {
  const res = await fetch(`${API_URL}/${id}/toggle`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  return await handleRes(res);
};

const api = { fetchTasks, createTask, updateTask, deleteTask, toggleTask };

export default api;
