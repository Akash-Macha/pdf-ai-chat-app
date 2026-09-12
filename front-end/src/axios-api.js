import axios from 'axios';
import { getToken, clearToken } from './auth';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const instance = axios.create({
  baseURL: apiBaseUrl,
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname !== '/') {
      clearToken();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default instance;
