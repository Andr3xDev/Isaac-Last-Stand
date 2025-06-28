import axios from 'axios';


// Client build
const apiClient = axios.create({
  // Recuerda crear un archivo .env con: VITE_API_URL=http://localhost:3000/api
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Request handler
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Response handler
apiClient.interceptors.response.use(
  (response) => {
    // Any positive response is returned here
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Error 401: user has not autoritation
      console.error("No autorizado. Redirigiendo al login...");
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);


export default apiClient;
