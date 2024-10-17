import axios from "axios";
import { store } from "../Redux/store";
import { refreshAccessToken } from "./postApi";
import { setAccessToken } from "../Redux/feathers/auth";
console.log(import.meta.env.VITE_API_URL);

export const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
  },
});

/*
 * 1. REQUEST INTERCEPTOR
 */
apiInstance.interceptors.request.use(
  (config) => {
    if (config) {
      const state = store.getState();
      console.log("Redux State:", state);
      const {accessToken} = state.auth;
      if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;

      delete config.requireAuthHeader;
      }
    }
    return config;
  },
  (error) => {
    // logError(error, store);
    return Promise.reject(error);
  }
);

/*
 * 2. RESPONSE INTERCEPTOR
 */
function attachResponseInterceptor() {
  console.log('hai');
  
  const responseInterceptor = apiInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const config = error?.config;
      const responseError = error?.response;
      console.log(responseError?.status, responseError?.headers);
      
      if (
        responseError?.status === 401 &&
        responseError?.headers?.get("www-authenticate")?.startsWith("Bearer ")
      ) {
        apiInstance.interceptors.response.eject(responseInterceptor);

        try {
          const MAX_RETRIES = 2;
          console.log(MAX_RETRIES);
          
          config._retries = Math.abs(config._retries) || 0;
          if (config._retries >= MAX_RETRIES) {
            throw new Error(`Max retries (${config._retries}) reached!`);
          }

          const data = await refreshAccessToken();
          console.log(data);
          
          const accessToken = data.accessToken
          config.headers.Authorization = `Bearer ${data.accessToken}`;
          store.dispatch(setAccessToken(accessToken));

          config._retries++;
          attachResponseInterceptor();
          return apiInstance(config);
        } catch (reauthError) {
          console.log("Re-authentication error: ", reauthError);
        } finally {
          attachResponseInterceptor(); 
        }
      }

    //    logError(error, store); // Log error (ensure you have a logError function)
      return Promise.reject(error);
    }
  );
}

attachResponseInterceptor();
