import { fetchTasks } from "../api/tasks";
import Button from "./Button";
import { ProjectItem } from "./ProjectItem";

const Sidebar = ({ onStart, onSelect, projects, selectedId }) => {

  // Handling each project completion status 
  const getCompletionStatus = async (projectId) => {
    try {
      const tasks = await fetchTasks(projectId);
      return tasks.length > 0 && tasks.every((task) => task.completed);
    } catch (error) {
      console.error("Failed to check completion:", error);
      return false;
    }
  };

  return (
    <aside className="w-1/6 px-3 py-5 bg-slate-900 text-slate-50 rounded-r-xl">
      <h1 className="mb-8 font-bold uppercase md:text-xl text-slate-200">
        Procheck
      </h1>
      <div>
        <Button onClick={onStart}>➕ New </Button>
      </div>

      <h2 className="mt-8 mb-4 font-bold uppercase text-slate-200">Projects</h2>

      <ul>
        {projects.map((project) => (
          <ProjectItem
            key={project._id}
            project={project}
            selectedId={selectedId}
            onSelect={onSelect}
            getCompletionStatus={getCompletionStatus}
          />
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
