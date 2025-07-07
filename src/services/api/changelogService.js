import mockChangelog from '@/services/mockData/changelog.json';

let changelog = [...mockChangelog];

export const changelogService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return changelog.map(entry => ({
      ...entry,
      publishedAt: new Date(entry.publishedAt).toISOString(),
    })).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const entry = changelog.find(c => c.Id === parseInt(id));
    if (!entry) throw new Error('Changelog entry not found');
    return {
      ...entry,
      publishedAt: new Date(entry.publishedAt).toISOString(),
    };
  },

  create: async (entryData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newEntry = {
      Id: Math.max(...changelog.map(c => c.Id)) + 1,
      ...entryData,
      publishedAt: new Date().toISOString(),
      projectId: 'project-1',
    };
    changelog.push(newEntry);
    return newEntry;
  },

  update: async (id, updates) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = changelog.findIndex(c => c.Id === parseInt(id));
    if (index === -1) throw new Error('Changelog entry not found');
    
    changelog[index] = { ...changelog[index], ...updates };
    return changelog[index];
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = changelog.findIndex(c => c.Id === parseInt(id));
    if (index === -1) throw new Error('Changelog entry not found');
    
    const deletedEntry = changelog[index];
    changelog.splice(index, 1);
    return deletedEntry;
  },
};