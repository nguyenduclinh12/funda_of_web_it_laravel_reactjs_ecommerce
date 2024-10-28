import Axios from "axios";

const axios = Axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true, // Quan trọng để gửi cookie
});

// Thêm interceptor cho axios get xsrf-token in cookie
axios.interceptors.request.use(
    (config) => {
        if (typeof document !== "undefined") {
            const token = document.cookie
                .split("; ")
                .find((row) => row.startsWith("XSRF-TOKEN"))
                ?.split("=")[1];
            if (token) {
                config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
            }

        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default axios;
