import api  from "../api/axios";
import { saveToken } from "../auth/auth";

export const loginAdmin = async (username, password) => {
    const response = await api.post('/admin/loginAdmin', {
        username,
        password
    });
    const { accessToken, refreshToken } = response.data;
    saveToken(accessToken, refreshToken);
    return response.data;
};
export const refreshAccessToken = async (refreshToken) => {
    const response = await api.post('/admin/refreshToken', null,{
        params:{refreshToken}
    });
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
}

