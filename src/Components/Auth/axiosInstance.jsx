import axios from "axios";
import useAuth from "./hooks/useAuth";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});


// Function to refresh access token
const refreshAccessToken = async () => {
  // const { setAuth } = useAuth();
  const {setAuth} = useAuth;
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      throw new Error("Refresh token not found");
    }

    const response = await axios.post("http://localhost:5000/api/auth/refresh", { token: refreshToken });
    const { accessToken } = response.data;

    localStorage.setItem("access_token", accessToken);
    setAuth(accessToken)
    return accessToken;
  } catch (error) {
    console.error("Failed to refresh access token:", error.message);
    localStorage.clear();
    window.location.href = "/login"; // Redirect to login
    throw error;
  }
};

// Request interceptor to add token
axiosInstance.interceptors.request.use(
  async(config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // const refreshToken = localStorage.getItem("refresh_token");
        // const response = await axios.post("http://localhost:5000/api/auth/refresh", { token: refreshToken });
        
        // const { accessToken } = response.data;
        // localStorage.setItem("access_token", accessToken);
        
        const newToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        // Redirect to login if refresh fails
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;








