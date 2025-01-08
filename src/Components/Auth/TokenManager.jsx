import { useEffect } from "react";
import axiosInstance from "../";

const TokenManager = () => {
  useEffect(() => {
    const refreshTokenInterval = setInterval(async () => {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) return;

      try {
        const { data } = await axiosInstance.post("/auth/refresh", {
          refresh_token: refreshToken,
        });

        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("refresh_token", data.refreshToken);
      } catch (error) {
        console.error("Error refreshing token:", error);
        localStorage.clear();
        window.location.href = "/login";
      }
    }, 15 * 60 * 1000); // Refresh token every 15 minutes

    return () => clearInterval(refreshTokenInterval);
  }, []);

  return null; // Invisible component
};

export default TokenManager;
