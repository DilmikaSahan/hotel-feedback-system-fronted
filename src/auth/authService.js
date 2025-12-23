import adminApi from "../api/adminApi";
import { saveToken } from "./token";

export const loginAdmin = async (username, password) => {
    console.log("Attempting to log in with username:", username);
    const response = await adminApi.post("/loginAdmin", {
        username,
        password,
    });
    console.log("Login response:", response.data);
    saveToken(response.data.accessToken, response.data.refreshToken);
    return response.data;
}