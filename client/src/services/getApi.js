import { apiInstance } from "./apiInstence";

/**
 * Fetch user profile
 * @returns {Promise<object>} - User profile data
 */
export const getProfile = async () => {
  try {
    const response = await apiInstance.get("/profile");
    return response.data;  
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};
