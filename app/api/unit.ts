import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API_URL = "http://localhost:4000";

export const unit = {
  getInventoryUnits: async (): Promise<any> => {
    try {
      const response = await axios.get(`${API_URL}/units`, {
        withCredentials: true,
      });
      
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching inventory units:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || {
          error: "Failed to fetch inventory units",
        }
      );
    }
  },
};
