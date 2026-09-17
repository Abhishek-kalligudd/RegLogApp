import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api',
    withCredentials: true,
});

export const authService = {
    register: (userData) => api.post('/reg', userData),
    login: (credentials) => api.post('/login', credentials),
    logout: () => api.post('/logout'),
    getCurrentUser: () => api.get('/user/me')
};

export default api;
