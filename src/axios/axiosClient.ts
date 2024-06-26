import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL as string;

const axiosClient = axios.create({
    baseURL: serverUrl,
    withCredentials : true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosClient