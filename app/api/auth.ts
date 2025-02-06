import axios from "axios";

const API_URL = "http://localhost:4000";

export const auth = {
  signup: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      console.error("Signup error:", error.response?.data || error.message);
      throw error.response?.data?.error || { error: "Failed to sign up" };
    }
  },

  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message);
      throw error.response?.data?.error || { error: "Failed to log in" };
    }
  },

  forgotPassword: async (email: string) => {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Forgot password error:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || { error: "Failed to process request" }
      );
    }
  },

  resetPassword: async (token: string, newPassword: string) => {
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        newPassword,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Reset password error:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || { error: "Failed to reset password" }
      );
    }
  },

  verifyAdmin: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/verify`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Admin verification error:", error.response?.data || error.message);
      throw error.response?.data?.error || { error: "Failed to verify admin access" };
    }
  },
};
