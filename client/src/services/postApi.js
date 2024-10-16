import { apiInstance } from "./apiInstence";



/**
 * Login API endpoint
 * @param {object} data - Account Credentials
 * @param {string} data.email - Email used by the account
 * @param {string} data.password - Password
 * 
 */
export const loginUser = async (data) => {
  try {
    const response = await apiInstance.post("/login", data);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};


/**
 * Signup API endpoint
 * @param {object} data - Credentials to create account
 * @param {string} data.username - username
 * @param {string} data.email - Email
 * @param {string} data.password - Password
 */
export const signupUser = async (data) => {
    try {
      const response = await apiInstance.post("/register", data);
      return response.data;  
    } catch (error) {
      console.error(error);
      throw error.response ? error.response.data : new Error(error.message);
    }
  };
