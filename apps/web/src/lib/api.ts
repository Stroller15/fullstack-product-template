import axios from "axios";
import { env } from "./env";

export const apiClient = axios.create({
  baseURL: `${env.NEXT_PUBLIC_API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Clerk session token to every request
apiClient.interceptors.request.use(async (config) => {
  // This will be overridden per-call using useAuth from Clerk when needed
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized — Clerk middleware should handle redirect
      console.warn("Unauthorized API response");
    }
    return Promise.reject(error);
  },
);
