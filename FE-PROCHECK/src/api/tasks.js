import { api } from "./api";

export const fetchTasks = async (projectId) => {
    const response = await api.get('/tasks', { params: { projectId } });
    return response.data;
  };
  
  export const createTask = async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  };
  
  export const toggleTask = async (id) => {
    const response = await api.patch(`/tasks/${id}`);
    return response.data;
  };
  
  export const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
  }