// src/context/ProjectsContext.js
import { createContext, useContext, useState } from 'react';
import { fetchProjects } from '../api/projects';

const ProjectsContext = createContext();

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const resetError = () => setError(null);
  const refreshProjects = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to refresh projects:", error);
    }
  };

  return (
    <ProjectsContext value={{ projects, refreshProjects, error, setError, resetError }}>
      {children}
    </ProjectsContext>
  );
}

export const useProjects = () => useContext(ProjectsContext);
// import { createContext, useContext, useReducer } from "react";

// const ProjectContext = createContext();

// const initialState = {
//   selectedId: undefined,
//   projects: [],
//   tasks: [],
// };

// function projectReducer(state, action) {
//   switch (action.type) {
//     case "HANDLE_START":
//       return {
//         ...state,
//         selectedId: null,
//       };
//     case "HANDLE_CANCEL":
//       return {
//         ...state,
//         selectedId: undefined,
//       };
//     case "ADD_PROJECT":
//       return {
//         ...state,
//         projects: [...state.projects, action.payload],
//         selectedId: undefined,
//       };
//     case "DELETE_PROJECT":
//       return {
//         ...state,
//         projects: state.projects.filter((p) => p.id !== state.selectedId),
//         selectedId: undefined,
//       };
//     case "SELECT_PROJECT":
//       return {
//         ...state,
//         selectedId: action.payload,
//       };
//     case "ADD_TASK":
//       return {
//         ...state,
//         tasks: [...state.tasks, action.payload],
//       };
//     case "DELETE_TASK":
//       return {
//         ...state,
//         tasks: state.tasks.filter((t) => t.id !== action.payload),
//       };
//     case "COMPLETED_TASK":
//       return {
//         ...state,
//         tasks: state.tasks.map((t) =>
//           t.id === action.payload ? { ...t, completed: !t.completed } : t
//         ),
//       };
//     default:
//       throw new Error(`Unknown action type: ${action.type}`);
//   }
// }
// export const ProjectProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(projectReducer, initialState);

//   return (
//     <ProjectContext value={{ state, dispatch }}>
//       {children}
//     </ProjectContext>
//   );
// };

// export const useProjects = () => useContext(ProjectContext);
