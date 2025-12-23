import axios from 'axios';

import { getAccessToken } from '../auth/auth';

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
    },
    (error) => Promise.reject(error)
    ));
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            Logout();
            window.location.href = '/adminLogin';
        }
        return Promise.reject(error);
    }
)
export default api;