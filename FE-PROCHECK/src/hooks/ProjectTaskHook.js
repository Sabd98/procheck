import { useEffect, useState } from "react";
import { useProjects } from "../store/ProjectsContext";
import { createTask, deleteTask, fetchTasks } from "../api/tasks";

export default function useProjectTasks(projectId) {
  const [tasks, setTasks] = useState([]);
  const { refreshProjects, setError } = useProjects();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks(projectId);
        setTasks(data);
      } catch (error) {
        console.error("Failed to load projects:", error);
      }
    };
    loadTasks();
  }, [projectId]);

  const handleAddTask = async (text) => {
    try {
      const newTask = await createTask({
        text: text.trim(), // Ensure text is trimmed
        projectId: projectId,
        completed: false,
      });

      if (!newTask._id) {
        // Handle API errors
        throw new Error("Failed to create task");
      }

      setTasks((prev) => [...prev, newTask]);
      refreshProjects();
    } catch (error) {
      console.error("Failed to create task:", error.response.data.error);
      setError(error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
      refreshProjects();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return { tasks, setTasks, handleAddTask, handleDeleteTask };
}
