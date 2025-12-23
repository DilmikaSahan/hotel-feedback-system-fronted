import { Axios } from "axios";

const publicApi = Axios.create({
    baseURL: "http://localhost:8080/api/v1/common",
    headers: {
        'Content-Type': 'application/json',
    },
});
export default publicApi;