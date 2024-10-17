import { apiInstance } from "./apiInstence";

/**
 * updateProfile API endpoint
 * @param {Object} data - The updated user profile data
 * @returns {Promise} - API response
 */
export const updateProfile = async (data) => {
    try {
      const response = await apiInstance.patch("/profile", data, {
        withCredentials: true, 
        
      });
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error.response ? error.response.data : new Error(error.message);
    }
  };
  
  