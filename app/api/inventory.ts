import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const inventory = {
  createInventory: async (data: any): Promise<any> => {
    try {
      const response = await axios.post(`${API_URL}/inventory`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error creating inventory item:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || {
          error: "Failed to create inventory item",
        }
      );
    }
  },

  getAllInventories: async (): Promise<any> => {
    try {
      const response = await axios.get(`${API_URL}/inventory`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching inventories:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || { error: "Failed to fetch inventories" }
      );
    }
  },

  getInventoryById: async (id: number): Promise<any> => {
    try {
      const response = await axios.get(`${API_URL}/inventory/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching inventory by id:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || {
          error: "Failed to fetch inventory item",
        }
      );
    }
  },

  updateInventory: async (id: number, data: any): Promise<any> => {
    try {
      const response = await axios.put(`${API_URL}/inventory/${id}`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error updating inventory item:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || {
          error: "Failed to update inventory item",
        }
      );
    }
  },

  deleteInventory: async (id: number): Promise<any> => {
    try {
      const response = await axios.delete(`${API_URL}/inventory/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error deleting inventory item:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || {
          error: "Failed to delete inventory item",
        }
      );
    }
  },
};
