import axios from 'axios';

const api = axios.create({
  baseURL: 'https://code-track-gmt9.onrender.com/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const getProblems = () => api.get('/problems');
export const createProblem = (data) => api.post('/problems', data);
export const getAllSubmissions = () => api.get('/submissions');

export default api;
