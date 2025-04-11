import { useEffect, useState } from "react";
import { useProjects } from "../store/ProjectsContext";

export const ProjectItem = ({ project, selectedId, onSelect, getCompletionStatus }) => {
    const [isCompleted, setIsCompleted] = useState(false);
    const { refreshProjects } = useProjects();

    // Check completion status when project changes
    useEffect(() => {
      const checkStatus = async () => {
        const status = await getCompletionStatus(project._id);
        setIsCompleted(status);
      };
      checkStatus();
    }, [project._id, refreshProjects]);
  
    const cssClasses = `w-full text-left px-2 py-1 rounded-sm my-1 hover:text-slate-200 hover:bg-slate-800 ${
      project._id === selectedId 
        ? "bg-slate-800 text-slate-200" 
        : "text-slate-400"
    }`;
  
    return (
      <li>
        <button
          className={cssClasses}
          onClick={() => onSelect(project._id)}
        >
          <span className="flex items-center gap-2">
            {project.title}
            {isCompleted && '✅'}
          </span>
        </button>
      </li>
    );
  };