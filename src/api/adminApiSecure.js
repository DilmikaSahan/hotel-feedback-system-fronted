import axios from 'axios';

const adminApiSecure = axios.create({
    baseURL: "http://localhost:8080/api/v1/admin",
    headers: {
        'Content-Type': 'application/json',
    },
});
adminApiSecure.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
adminApiSecure.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout();
      window.location.href = '/adminLogin';
    }
    return Promise.reject(error);
  }
);

export const getDashboardStats = async () => {
    const response = await adminApiSecure.get('/dashboardStats');
    return response.data;
}

export const addWaiter = async (name) => {
    const response = await adminApiSecure.post('/addWaiter', { name });
    return response.data;
}

export const addChef = async (name) => {
    const response = await adminApiSecure.post('/addChef', { name });
    return response.data;
}

export const addRoomTable = async () => {
    const response = await adminApiSecure.post('/addRoomTable');
    return response.data;
}

export default adminApiSecure;