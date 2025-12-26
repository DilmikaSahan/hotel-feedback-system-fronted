import axios from 'axios';
import { getAccessToken, logout } from '../auth/auth';

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
    const response = await adminApiSecure.post('/addWaiter',null, { params: { NewWaiterName:name } });
    return response.data;
}

export const addChef = async (name) => {
    const response = await adminApiSecure.post('/addChef', null, { params: { NewChefName:name } });
    return response.data;
}

export const addRoomTable = async (name) => {
    const response = await adminApiSecure.post('/addRoomTable', null, { params: { NewRoomTableName:name } });
    return response.data;
}
export const deleteWaiter = async (name) => {
    const response = await adminApiSecure.delete(`/removeWaiter/${name}`);
    return response.data;
}
export const deleteChef = async (name) => {
    const response = await adminApiSecure.delete(`/removeChef/${name}`);
    return response.data;
}
export const deleteRoomTable = async (name) => {
    const response = await adminApiSecure.delete(`/removeRoomTable/${name}`);
    return response.data;
}
export const getAllFeedbacks = async () => {
    const response = await adminApiSecure.get('/getAllFeedBacks');
    return response.data;
}

export default adminApiSecure;