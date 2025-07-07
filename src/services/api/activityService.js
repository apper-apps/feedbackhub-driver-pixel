import mockActivities from '@/services/mockData/activities.json';

let activities = [...mockActivities];

export const activityService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return activities.map(activity => ({
      ...activity,
      createdAt: new Date(activity.createdAt).toISOString(),
    })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const activity = activities.find(a => a.Id === parseInt(id));
    if (!activity) throw new Error('Activity not found');
    return {
      ...activity,
      createdAt: new Date(activity.createdAt).toISOString(),
    };
  },

  create: async (activityData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newActivity = {
      Id: Math.max(...activities.map(a => a.Id)) + 1,
      ...activityData,
      createdAt: new Date().toISOString(),
    };
    activities.push(newActivity);
    return newActivity;
  },

  update: async (id, updates) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = activities.findIndex(a => a.Id === parseInt(id));
    if (index === -1) throw new Error('Activity not found');
    
    activities[index] = { ...activities[index], ...updates };
    return activities[index];
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = activities.findIndex(a => a.Id === parseInt(id));
    if (index === -1) throw new Error('Activity not found');
    
    const deletedActivity = activities[index];
    activities.splice(index, 1);
    return deletedActivity;
  },
};