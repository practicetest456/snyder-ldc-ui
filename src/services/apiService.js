import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = '/api/v1/ldc';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    toast.error(message);
    return Promise.reject(error);
  }
);

// Generic API methods
const apiService = {
  // GET all
  getAll: (endpoint) => api.get(endpoint),
  
  // GET by ID
  getById: (endpoint, id) => api.get(`${endpoint}/${id}`),
  
  // POST
  create: (endpoint, data) => api.post(endpoint, data),
  
  // PUT
  update: (endpoint, id, data) => api.put(`${endpoint}/${id}`, data),
  
  // DELETE
  delete: (endpoint, id) => api.delete(`${endpoint}/${id}`),
};

export default apiService;
