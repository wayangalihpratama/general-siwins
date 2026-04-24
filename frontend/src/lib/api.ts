import axios from "axios";

/**
 * Centralized API client with environment-aware base URL.
 * - Server-side (SSR): Calls backend service directly within the Docker network.
 * - Client-side (Browser): Calls /api via the Next.js proxy.
 */
const baseURL = typeof window === "undefined" ? "http://backend:8000" : "/api";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, v));
      } else if (value !== undefined && value !== null) {
        searchParams.append(key, value as string);
      }
    });
    return searchParams.toString();
  },
});

// Helper for consistent error handling if needed
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);
