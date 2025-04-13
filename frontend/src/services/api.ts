import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/api',
});

// Interceptor de requisição: adiciona o token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de resposta: redireciona se o token for inválido
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // redireciona para login se o token for inválido
    }
    return Promise.reject(error);
  }
);

export default api;
