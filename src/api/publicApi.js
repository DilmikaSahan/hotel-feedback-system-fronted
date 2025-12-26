import axios, { Axios } from "axios";

const publicApi = axios.create({
    baseURL: "http://localhost:8080/api/v1/common",
    headers: {
        'Content-Type': 'application/json',
    },
});
export const getAllWaiters = async () => {
    const response = await publicApi.get('/getAllWaiters');
    return response.data;
}
export const getAllChefs = async () => {
    const response = await publicApi.get('/getAllChefs');
    return response.data;
}
export const getAllRoomTables = async () => {
    const response = await publicApi.get('/getAllRoomTables');
    return response.data;
}
export const submitFeedback = async (feedbackData) => {
    const response = await publicApi.post('/addFeedBack', feedbackData);
    return response.data;
}
export default publicApi;