import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const registerUser = (email, password) =>
  api.post("/auth/register", { email, password });

export const loginUser = (email, password) =>
  api.post("/auth/login", { email, password });

export const logoutUser = () => api.post("/auth/logout");

export const refreshToken = () => api.post("/auth/refresh-token");
