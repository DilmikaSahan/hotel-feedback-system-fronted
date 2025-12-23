import axios from 'axios';

const adminApi = axios.create({
    baseURL: "http://localhost:8080/api/v1/admin",
    headers: {
        'Content-Type': 'application/json',
    },
});


export default adminApi;