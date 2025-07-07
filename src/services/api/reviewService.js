export const reviewService = {
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
          { field: { Name: "customerName" } },
          { field: { Name: "rating" } },
          { field: { Name: "comment" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "project_id" } }
        ],
        orderBy: [
          {
            fieldName: "createdAt",
            sorttype: "DESC"
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('review', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching reviews:", error);
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
          { field: { Name: "customerName" } },
          { field: { Name: "rating" } },
          { field: { Name: "comment" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "project_id" } }
        ]
      };
      
      const response = await apperClient.getRecordById('review', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching review with ID ${id}:`, error);
      throw error;
    }
  },

  create: async (reviewData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        records: [{
          Name: reviewData.customerName || reviewData.Name || "Customer Review",
          Tags: reviewData.Tags || "",
          Owner: reviewData.Owner || null,
          customerName: reviewData.customerName || "",
          rating: reviewData.rating || 5,
          comment: reviewData.comment || "",
          createdAt: reviewData.createdAt || new Date().toISOString(),
          project_id: reviewData.project_id || null
        }]
      };
      
      const response = await apperClient.createRecord('review', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error('Failed to create review');
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error("Error creating review:", error);
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
      if (updates.customerName !== undefined) updateData.customerName = updates.customerName;
      if (updates.rating !== undefined) updateData.rating = updates.rating;
      if (updates.comment !== undefined) updateData.comment = updates.comment;
      if (updates.createdAt !== undefined) updateData.createdAt = updates.createdAt;
      if (updates.project_id !== undefined) updateData.project_id = updates.project_id;
      
      const params = {
        records: [updateData]
      };
      
      const response = await apperClient.updateRecord('review', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error('Failed to update review');
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error("Error updating review:", error);
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
      
      const response = await apperClient.deleteRecord('review', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error('Failed to delete review');
        }
        
        return true;
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      throw error;
    }
  }
};