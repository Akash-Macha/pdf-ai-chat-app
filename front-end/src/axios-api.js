import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  // baseURL: 'https://pdf-ai-chat-app-backend.onrender.com',
  'Content-Type': 'application/json'
});

// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
instance.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;