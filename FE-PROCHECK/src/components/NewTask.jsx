import { useState } from "react";
import { useProjects } from "../store/ProjectsContext";

export default function NewTask({ onAdd }) {
  const [inputTask, setInputTask] = useState("");
  const { resetError } = useProjects();

  const handleSubmit = (e) => {
    e.preventDefault(); // Add form submission handling
    if (inputTask.trim() === "") return;
    onAdd(inputTask);
    setInputTask("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 my-1">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-2xl bg-slate-200"
        onChange={(e) => {
          setInputTask(e.target.value);
          resetError();
        }}
        value={inputTask}
        required
      />
      <button type="submit" className="text-slate-700 hover:text-slate-950">
        Add Task
      </button>
    </form>
  );
}
