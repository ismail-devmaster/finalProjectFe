import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API_URL = "http://localhost:4000";

export const category = {
  getAllCategories: async (): Promise<any> => {
    try {
      const response = await axios.get(`${API_URL}/categories`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching categories:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || { error: "Failed to fetch categories" }
      );
    }
  },

  getCategoryById: async (id: number): Promise<any> => {
    try {
      const response = await axios.get(`${API_URL}/categories/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching category by id:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || { error: "Failed to fetch category" }
      );
    }
  },

  createCategory: async (data: any): Promise<any> => {
    try {
      const response = await axios.post(`${API_URL}/categories`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error creating category:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || { error: "Failed to create category" }
      );
    }
  },

  updateCategory: async (id: number, data: any): Promise<any> => {
    try {
      const response = await axios.put(`${API_URL}/categories/${id}`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error updating category:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || { error: "Failed to update category" }
      );
    }
  },

  deleteCategory: async (id: number): Promise<any> => {
    try {
      const response = await axios.delete(`${API_URL}/categories/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error deleting category:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || { error: "Failed to delete category" }
      );
    }
  },
};
