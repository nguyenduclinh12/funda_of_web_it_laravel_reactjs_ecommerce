import Axios from "axios";
import { useNavigate } from "react-router-dom";

const axios = Axios.create({
  baseURL: "http://localhost:8000/",
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
    // const token = localStorage.getItem("auth_token");
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const navigate = useNavigate();
      console.log(error);
      const { response } = error;
      if (response?.status === 401) {
        localStorage.removeItem("ACCESS_TOKEN");
        console.log(response);
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }

    throw error;
  }
);

export default axios;
