import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Replace with your backend URL

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Signup
export const signup = async (email: string, password: string) => {
  return apiClient.post("/signup", { email, password });
};

// Login
export const login = async (email: string, password: string) => {
  return apiClient.post("/login", { email, password });
};

// Forgot Password
export const forgotPassword = async (email: string) => {
  return apiClient.post("/forgot-password", { email });
};

// Reset Password
export const resetPassword = async (token: string, newPassword: string) => {
  return apiClient.post(`/reset-password/${token}`, { newPassword });
};