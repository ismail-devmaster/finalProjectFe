import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL; // Replace with your backend URL
const API_URL = "http://localhost:4000";

export const admin = {
  // Verify admin authentication
  verify: async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/verify`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Verify admin error:",
        error.response?.data || error.message
      );
      throw error.response?.data?.error || { error: "Failed to verify admin" };
    }
  },

  // Update a user's role (and perform associated role-change operations)
  updateRole: async (userId: string, newRole: string) => {
    try {
      const response = await axios.put(
        `${API_URL}/admin/update-role`,
        { userId, newRole },
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Update role error:",
        error.response?.data || error.message
      );
      throw error.response?.data?.error || { error: "Failed to update role" };
    }
  },

  // Delete a user by ID
  deleteUser: async (userId: string) => {
    try {
      const response = await axios.delete(`${API_URL}/admin/user/${userId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Delete user error:",
        error.response?.data || error.message
      );
      throw error.response?.data?.error || { error: "Failed to delete user" };
    }
  },

  // Get all patients
  getAllPatients: async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/patients`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Get all patients error:",
        error.response?.data || error.message
      );
      throw error.response?.data?.error || { error: "Failed to get patients" };
    }
  },

  // Get all doctors
  getAllDoctors: async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/doctors`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Get all doctors error:",
        error.response?.data || error.message
      );
      throw error.response?.data?.error || { error: "Failed to get doctors" };
    }
  },

  // Get all receptionists
  getAllReceptionists: async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/receptionists`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Get all receptionists error:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || { error: "Failed to get receptionists" }
      );
    }
  },

  getAllUser: async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/users`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Get all users error:",
        error.response?.data || error.message
      );
      throw error.response?.data?.error || { error: "Failed to get users" };
    }
  },
};
