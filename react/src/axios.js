import axios from "axios";
import router from "./router";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    // baseURL: "https://jsonplaceholder.typicode.com",
});

axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("TOKEN")}`;
    // const token = '123';
    // config.headers.Authorization = `Bearer ${token}`

    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("TOKEN");
            window.location.reload();
            // router.navigate('/login')
            return error;
        }
        // else if (error.response.status === 419) { return refreshAppTokens().then(() => Promise.reject(error)); }
        // window.location.reload();
        throw error;
    }
);

export default axiosClient;
