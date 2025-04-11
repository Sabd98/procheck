import EmptyProject from "./components/EmptyProject";
import NewProject from "./components/NewProject";
import Sidebar from "./components/Sidebar";
import SelectedProject from "./components/SelectedProject";
import { useEffect, useState } from "react";
import { createProject, deleteProject, fetchProjects } from "./api/projects";

const ViewStates = {
  EMPTY: undefined,
  CREATE: null,
};

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState(undefined);
  const [loading, setLoading] = useState(true);

  //Fething All Projects in Sidebar
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);


//create a project handler
  const handleCreateProject = async (projectData) => {
    try {
      const newProject = await createProject(projectData);
      setProjects(prev => [...prev, newProject]);
      setSelectedId(newProject._id);
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

//delete a project handler
  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId);
      setProjects(prev => prev.filter(p => p._id !== projectId));
      setSelectedId(null);
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  //Section Render Handler
  const handleStart = () => setSelectedId(null);
  const handleCancel = () => setSelectedId(undefined);
  const handleSelect = (id) => setSelectedId(id);

  if (loading) return <div>Loading...</div>;

  const selectedProject = projects.find(
    (project) => project._id === selectedId
  );

  //Section Render
  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} />;
  if (selectedId === ViewStates.CREATE) {
    content = <NewProject onCreate={handleCreateProject}  onCancel={handleCancel}/>;
  } else if (selectedId === ViewStates.EMPTY) {
    content = <EmptyProject onStart={handleStart} />;
  }
  return (
    <main className="h-screen flex gap-1">
      <Sidebar
        onStart={handleStart}
        projects={projects}
        selectedId={selectedId}
        onSelect={handleSelect}
      />
      {content}
    </main>
  );
}

export default App;
