import axios from "axios";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

// Determine base URL based on environment
const isDev = process.env.NODE_ENV !== "development";
const BASE = isDev
  ? Constants.expoConfig?.extra?.API_URL_LOCAL
  : Constants.expoConfig?.extra?.API_URL_PROD;

//console.log("API Base URL:", BASE);

if (!BASE) {
  console.error(
    "API_URL is not set. API calls will fail. Set API_URL_LOCAL or API_URL_PROD in app.json."
  );
}

// Create axios instance
const apiClient = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
});

// Add Authorization header with accessToken for non-auth routes
apiClient.interceptors.request.use(async (config) => {
  const isAuthPath = config.url?.startsWith("/auth/");
  /*
  console.log(
    "Request URL:",
    config.baseURL ? config.baseURL + config.url : config.url
  );*/
  //console.log("Request Headers:", config.headers);
  //console.log("Request Data:", config.data);
  if (!isAuthPath) {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});

// Handle 401 errors with token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(
      "Axios Error:",
      error.message,
      error.response?.data,
      error.response?.status
    );
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.startsWith("/auth/")
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = await SecureStore.getItemAsync("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }
        const response = await apiClient.post("/auth/refresh", {
          refreshToken,
        });
        const { accessToken: newAccess, refreshToken: newRefresh } =
          response.data;
        await SecureStore.setItemAsync("accessToken", newAccess);
        await SecureStore.setItemAsync("refreshToken", newRefresh);
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        await SecureStore.deleteItemAsync("accessToken");
        await SecureStore.deleteItemAsync("refreshToken");
        throw refreshError;
      }
    }
    const message =
      error.response?.data?.message || error.message || "Request failed";
    const err = new Error(message);
    err.cause = error.response?.status;
    throw err;
  }
);

// Helper to parse JSON responses
function safeJson(response: any) {
  if (response.status === 204) return undefined;
  if (!response.data) return undefined;
  return response.data; // Axios already parses JSON
}

// Main API function
async function api(path: string, config = {}) {
  const response = await apiClient({ url: path, ...config });
  return response;
}

// HTTP method helpers
export const http = {
  get: async (path: string) => {
    const response = await api(path, { method: "GET" });
    return safeJson(response);
  },
  post: async (path: string, body: any) => {
    const response = await api(path, {
      method: "POST",
      data: body,
    });
    return safeJson(response);
  },
  del: async (path: string) => {
    const response = await api(path, { method: "DELETE" });
    return safeJson(response);
  },
};

// Auth-specific API calls
export const AuthAPI = {
  me: () => http.get("/auth/me"),
  register: (body: any) => http.post("/auth/register", body),
  login: (body: any) => http.post("/auth/login", body),
  logout: async () => {
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    const response = await http.post(
      "/auth/logout",
      refreshToken ? { refreshToken } : undefined
    );
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    return response;
  },
};
