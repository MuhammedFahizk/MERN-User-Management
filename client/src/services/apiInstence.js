import axios from "axios";
import { store } from "../Redux/store";
console.log(import.meta.env.VITE_API_URL);

export const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        timeout: 1000
        }
})

apiInstance.interceptors.request.use(
    (config) => {
        const state = store.getState(); 
                        
        // if (accessToken) {
            config.headers['Authorization'] = `Bearer ${'accessToken'}`; 
        // }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
