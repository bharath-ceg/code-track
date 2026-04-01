import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:10000/api',
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
