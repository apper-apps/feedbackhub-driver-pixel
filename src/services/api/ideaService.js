export const ideaService = {
  getAll: async () => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "category" } },
          { field: { Name: "status" } },
          { field: { Name: "votes" } },
          { field: { Name: "hasVoted" } },
          { field: { Name: "commentCount" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "user_id" } },
          { field: { Name: "project_id" } }
        ]
      };
      
      const response = await apperClient.fetchRecords('idea', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching ideas:", error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "category" } },
          { field: { Name: "status" } },
          { field: { Name: "votes" } },
          { field: { Name: "hasVoted" } },
          { field: { Name: "commentCount" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "user_id" } },
          { field: { Name: "project_id" } }
        ]
      };
      
      const response = await apperClient.getRecordById('idea', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching idea with ID ${id}:`, error);
      throw error;
    }
  },

  create: async (ideaData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        records: [{
          Name: ideaData.title || ideaData.Name || "New Idea",
          Tags: ideaData.Tags || "",
          Owner: ideaData.Owner || null,
          title: ideaData.title || "",
          description: ideaData.description || "",
          category: ideaData.category || "feature",
          status: ideaData.status || "not-planned",
          votes: ideaData.votes || 0,
          hasVoted: ideaData.hasVoted || false,
          commentCount: ideaData.commentCount || 0,
          createdAt: new Date().toISOString(),
          user_id: ideaData.user_id || null,
          project_id: ideaData.project_id || null
        }]
      };
      
      const response = await apperClient.createRecord('idea', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error('Failed to create idea');
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error("Error creating idea:", error);
      throw error;
    }
  },

  update: async (id, updates) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const updateData = {
        Id: parseInt(id)
      };
      
      // Only include updateable fields
      if (updates.Name !== undefined) updateData.Name = updates.Name;
      if (updates.Tags !== undefined) updateData.Tags = updates.Tags;
      if (updates.Owner !== undefined) updateData.Owner = updates.Owner;
      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.category !== undefined) updateData.category = updates.category;
      if (updates.status !== undefined) updateData.status = updates.status;
      if (updates.votes !== undefined) updateData.votes = updates.votes;
      if (updates.hasVoted !== undefined) updateData.hasVoted = updates.hasVoted;
      if (updates.commentCount !== undefined) updateData.commentCount = updates.commentCount;
      if (updates.createdAt !== undefined) updateData.createdAt = updates.createdAt;
      if (updates.user_id !== undefined) updateData.user_id = updates.user_id;
      if (updates.project_id !== undefined) updateData.project_id = updates.project_id;
      
      const params = {
        records: [updateData]
      };
      
      const response = await apperClient.updateRecord('idea', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error('Failed to update idea');
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error("Error updating idea:", error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord('idea', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error('Failed to delete idea');
        }
        
        return true;
      }
    } catch (error) {
      console.error("Error deleting idea:", error);
      throw error;
    }
  }
};