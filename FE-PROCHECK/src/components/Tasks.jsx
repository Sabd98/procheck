import { toggleTask } from "../api/tasks";
import { useProjects } from "../store/ProjectsContext";
import NewTask from "./NewTask";

export default function Tasks({ tasks, setTasks, onAddTask, onDeleteTask }) {
  const { refreshProjects, error } = useProjects();

  const handleToggle = async (taskId) => {
    try {
      await toggleTask(taskId);
      setTasks((prev) =>
        prev.map((t) =>
          t._id === taskId ? { ...t, completed: !t.completed } : t
        )
      );
      refreshProjects();
    } catch (error) {
      console.error("Failed to toggle task:", error);
    }
  };

  return (
    <article className="border-2 rounded-lg my-2 p-2">
      <h2 className="text-2xl font-bold text-center text-slate-700">Tasks</h2>

      <NewTask onAdd={onAddTask} />
      {error && (
        <span className="text-red-500">{error.response?.data?.error}</span>
      )}
      {tasks.length === 0 && (
        <p className="text-slate-800 mb-1">
          This project doesn't have any task yet.
        </p>
      )}
      {tasks.length > 0 && (
        <ul className="p-2 mt-2 rounded-md bg-slate-100">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between my-2 border-b-2 indent-2"
            >
              <span>
                {task.text}
                {task.completed && "✅"}
              </span>
              <div className="space-x-4">
                {task.completed ? null : (
                  <button
                    className="text-slate-700 hover:text-green-800"
                    onClick={() => handleToggle(task._id)}
                  >
                    Complete
                  </button>
                )}

                <button
                  className="text-slate-700 hover:text-red-500"
                  onClick={() => onDeleteTask(task._id)}
                >
                  Clear
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
