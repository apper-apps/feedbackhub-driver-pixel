import mockIdeas from '@/services/mockData/ideas.json';

let ideas = [...mockIdeas];

export const ideaService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return ideas.map(idea => ({
      ...idea,
      createdAt: new Date(idea.createdAt).toISOString(),
    }));
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const idea = ideas.find(i => i.Id === parseInt(id));
    if (!idea) throw new Error('Idea not found');
    return {
      ...idea,
      createdAt: new Date(idea.createdAt).toISOString(),
    };
  },

  create: async (ideaData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newIdea = {
      Id: Math.max(...ideas.map(i => i.Id)) + 1,
      ...ideaData,
      status: 'not-planned',
      votes: 0,
      hasVoted: false,
      commentCount: 0,
      createdAt: new Date().toISOString(),
      userId: 'user-1',
      projectId: 'project-1',
    };
    ideas.push(newIdea);
    return newIdea;
  },

  update: async (id, updates) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = ideas.findIndex(i => i.Id === parseInt(id));
    if (index === -1) throw new Error('Idea not found');
    
    ideas[index] = { ...ideas[index], ...updates };
    return ideas[index];
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = ideas.findIndex(i => i.Id === parseInt(id));
    if (index === -1) throw new Error('Idea not found');
    
    const deletedIdea = ideas[index];
    ideas.splice(index, 1);
    return deletedIdea;
  },
};