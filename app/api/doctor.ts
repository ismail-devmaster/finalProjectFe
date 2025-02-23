import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const doctor = {
  getAllDoctors: async (): Promise<any> => {
    try {
      const response = await axios.get(`${API_URL}/doctors`, { withCredentials: true });
      return response.data;
    } catch (error: any) {
      console.error("Error fetching doctors:", error.response?.data || error.message);
      throw error.response?.data?.error || { error: "Failed to get doctors" };
    }
  },
  getDoctorById: async (id: number): Promise<any> => {
    try {
      const response = await axios.get(`${API_URL}/doctors/${id}`, { withCredentials: true });
      return response.data;
    } catch (error: any) {
      console.error("Error fetching doctor by id:", error.response?.data || error.message);
      throw error.response?.data?.error || { error: "Failed to get doctor" };
    }
  },
};
