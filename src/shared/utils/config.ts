export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
export const FILE_BASE_URL = import.meta.env.VITE_FILE_URL || "http://localhost:5001";

export const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};