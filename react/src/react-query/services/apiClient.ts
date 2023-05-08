import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8000/api",
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
class APIClient<T> {
    ednpoint: string;
    constructor(endpoint: string) {
        this.ednpoint = endpoint;
    }
    getAll = () => {
        return axiosClient.get<T[]>(this.ednpoint).then((res) => res.data);
    };
    post = (data: T) => {
        return axiosClient.post<T>(this.ednpoint, data).then((res) => res.data);
    };
}

export default APIClient;
