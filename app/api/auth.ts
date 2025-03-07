import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL; // Replace with your backend URL

export const auth = {
  // Signup
  signup: async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    sexId: string,
    medicalHistory: string,
    phone: string
  ) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        email,
        password,
        firstName,
        lastName,
        dateOfBirth,
        phone,
        sexId,
        roleData: {
          medicalHistory,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Signup error:", error.response?.data || error.message);
      throw error.response?.data?.error || { error: "Failed to sign up" };
    }
  },
  
  // Login
  login: async (email: string, password: string) => {
    // Login will set an HTTP-only cookie; no need to store token manually
    const response = await axios.post(
      `${API_URL}/auth/login`,
      { email, password },
      { withCredentials: true } // Ensure cookies are sent/received
    );
    return response.data;
  },

  // Forgot Password
  forgotPassword: async (email: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, {
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

  // Reset Password
  resetPassword: async (token: string, newPassword: string) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/reset-password/${token}`,
        {
          newPassword,
        }
      );
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

  // Refresh Token
  refreshToken: async () => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/refresh-token`,
        {},
        { withCredentials: true } // Ensure cookies are sent/received
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Token refresh error:",
        error.response?.data || error.message
      );
      throw error.response?.data?.error || { error: "Failed to refresh token" };
    }
  },

  // Logout
  logout: async () => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/logout`,
        {},
        { withCredentials: true } // Ensure cookies are sent/received
      );
      return response.data;
    } catch (error: any) {
      console.error("Logout error:", error.response?.data || error.message);
      throw error.response?.data?.error || { error: "Failed to log out" };
    }
  },

  completeProfile: async (
    tempToken: string,
    phone: string,
    sexId: number,
    dateOfBirth: string
  ) => {
    try {
      console.log(
        "tempToken",
        tempToken,
        "phone",
        phone,
        "sexId",
        sexId,
        "dateOfBirth",
        dateOfBirth
      );
      const response = await axios.post(
        `${API_URL}/auth/update-profile`,
        {
          tempToken,
          phone,
          sexId,
          dateOfBirth,
        },
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Complete profile error:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || { error: "Failed to complete profile" }
      );
    }
  },

  googleLogin: async () => {
    window.location.href = `${API_URL}/auth/google`;
  },
};
