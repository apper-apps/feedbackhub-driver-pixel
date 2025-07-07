export const changelogService = {
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
          { field: { Name: "version" } },
          { field: { Name: "title" } },
          { field: { Name: "content" } },
          { field: { Name: "publishedAt" } },
          { field: { Name: "project_id" } }
        ],
        orderBy: [
          {
            fieldName: "publishedAt",
            sorttype: "DESC"
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('changelog_entry', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching changelog:", error);
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
          { field: { Name: "version" } },
          { field: { Name: "title" } },
          { field: { Name: "content" } },
          { field: { Name: "publishedAt" } },
          { field: { Name: "project_id" } }
        ]
      };
      
      const response = await apperClient.getRecordById('changelog_entry', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching changelog entry with ID ${id}:`, error);
      throw error;
    }
  },

  create: async (entryData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        records: [{
          Name: entryData.title || entryData.Name || "New Release",
          Tags: entryData.Tags || "",
          Owner: entryData.Owner || null,
          version: entryData.version || "1.0.0",
          title: entryData.title || "",
          content: entryData.content || "",
          publishedAt: entryData.publishedAt || new Date().toISOString(),
          project_id: entryData.project_id || null
        }]
      };
      
      const response = await apperClient.createRecord('changelog_entry', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error('Failed to create changelog entry');
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error("Error creating changelog entry:", error);
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
      if (updates.version !== undefined) updateData.version = updates.version;
      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.content !== undefined) updateData.content = updates.content;
      if (updates.publishedAt !== undefined) updateData.publishedAt = updates.publishedAt;
      if (updates.project_id !== undefined) updateData.project_id = updates.project_id;
      
      const params = {
        records: [updateData]
      };
      
      const response = await apperClient.updateRecord('changelog_entry', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error('Failed to update changelog entry');
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error("Error updating changelog entry:", error);
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
      
      const response = await apperClient.deleteRecord('changelog_entry', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error('Failed to delete changelog entry');
        }
        
        return true;
      }
    } catch (error) {
      console.error("Error deleting changelog entry:", error);
      throw error;
    }
  }
};