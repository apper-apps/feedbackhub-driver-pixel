import mockReviews from '@/services/mockData/reviews.json';

let reviews = [...mockReviews];

export const reviewService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return reviews.map(review => ({
      ...review,
      createdAt: new Date(review.createdAt).toISOString(),
    })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const review = reviews.find(r => r.Id === parseInt(id));
    if (!review) throw new Error('Review not found');
    return {
      ...review,
      createdAt: new Date(review.createdAt).toISOString(),
    };
  },

  create: async (reviewData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newReview = {
      Id: Math.max(...reviews.map(r => r.Id)) + 1,
      ...reviewData,
      createdAt: new Date().toISOString(),
      projectId: 'project-1',
    };
    reviews.push(newReview);
    return newReview;
  },

  update: async (id, updates) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = reviews.findIndex(r => r.Id === parseInt(id));
    if (index === -1) throw new Error('Review not found');
    
    reviews[index] = { ...reviews[index], ...updates };
    return reviews[index];
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = reviews.findIndex(r => r.Id === parseInt(id));
    if (index === -1) throw new Error('Review not found');
    
    const deletedReview = reviews[index];
    reviews.splice(index, 1);
    return deletedReview;
  },
};