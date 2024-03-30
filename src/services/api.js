import axios from 'axios';

const api = axios.create({
  baseURL: 'https://task-management-backend-jzuw.onrender.com',
});

export default api;
