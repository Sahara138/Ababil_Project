import jwtDecode from "jwt-decode";

export const useAuth = () => {
  const checkTokenExpiry = (token) => {
    if (!token) return true;

    const { exp } = jwtDecode(token); // Decode token expiry
    return Date.now() >= exp * 1000; // Compare current time with expiry
  };

  const isAccessTokenExpired = checkTokenExpiry(localStorage.getItem("access_token"));
  const isRefreshTokenExpired = checkTokenExpiry(localStorage.getItem("refresh_token"));

  return { isAccessTokenExpired, isRefreshTokenExpired };
};
