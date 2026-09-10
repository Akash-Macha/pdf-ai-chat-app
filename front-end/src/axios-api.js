import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const instance = axios.create({
  baseURL: apiBaseUrl,
  'Content-Type': 'application/json'
});

// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
instance.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;