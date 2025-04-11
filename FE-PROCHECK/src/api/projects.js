import { api } from "./api"

export const fetchProjects = async () => {
    const response = await api.get('/projects')
    return response.data;
}

export const createProject = async (projectData) => {
    const response = await api.post('/projects', projectData)
    return response.data;     
}

export const deleteProject = async (id) => {
    await api.delete(`/projects/${id}`);
}

