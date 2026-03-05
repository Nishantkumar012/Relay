import axios from "axios";
import { useAuthStore } from "../store/authStore";

// axios.get("http://localhost:3000/api/users")
// instead of above we use below
// apiClient.get("/users")

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// attach token with every request
apiClient.interceptors.request.use((config) => {
  // const { token } = useAuthStore();

  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default apiClient;
