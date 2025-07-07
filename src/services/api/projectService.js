import mockProjects from '@/services/mockData/projects.json';

let projects = [...mockProjects];

export const projectService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return projects;
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const project = projects.find(p => p.Id === parseInt(id));
    if (!project) throw new Error('Project not found');
    return project;
  },

  create: async (projectData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newProject = {
      Id: Math.max(...projects.map(p => p.Id)) + 1,
      ...projectData,
      userId: 'user-1',
    };
    projects.push(newProject);
    return newProject;
  },

  update: async (id, updates) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = projects.findIndex(p => p.Id === parseInt(id));
    if (index === -1) throw new Error('Project not found');
    
    projects[index] = { ...projects[index], ...updates };
    return projects[index];
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = projects.findIndex(p => p.Id === parseInt(id));
    if (index === -1) throw new Error('Project not found');
    
    const deletedProject = projects[index];
    projects.splice(index, 1);
    return deletedProject;
  },
};