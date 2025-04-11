import useProjectTasks from "../hooks/ProjectTaskHook";
import Tasks from "./Tasks";

function SelectedProject({ project, onDelete }) {
  const { tasks, setTasks, handleAddTask, handleDeleteTask } = useProjectTasks(
    project._id
  );

  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <section className="w-[65rem] h-[30rem] mx-auto mt-16 border rounded-md">
      <header className="pb-4 mb-4 border-b-2 border-slate-300 m-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2x1 font-bold text-slate-600 mt-2">
            {project.title}
          </h1>
          <button
            className="text-slate-600 hover:text-slate-950"
            onClick={() => onDelete(project._id)}
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-slate-400">{formattedDate}</p>
        <p className="text-slate-600 indent-8 text-wrap text-justify">
          {project.description}
        </p>
        <Tasks
          tasks={tasks}
          setTasks={setTasks}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
        />
      </header>
    </section>
  );
}

export default SelectedProject;
