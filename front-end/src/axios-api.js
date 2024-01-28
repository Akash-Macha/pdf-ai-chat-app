import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pdf-ai-chat-app-backend.onrender.com',
  // baseURL: 'http://localhost:8000',
  'Content-Type': 'application/json'
});

// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
instance.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;