import axios from 'axios';

// Same-origin always: Vite's dev server proxies /api -> localhost:8000 locally,
// Netlify's redirect proxies /api -> the Render backend in production. This
// keeps the auth cookie first-party instead of cross-site (see netlify.toml
// and vite.config.js server.proxy).
const instance = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const isMeRequest = error.config?.url === '/me';
    if (error.response?.status === 401 && !isMeRequest && window.location.pathname !== '/') {
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default instance;
