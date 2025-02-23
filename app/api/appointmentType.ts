import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL; // e.g., "http://localhost:4000"

export const appointmentType = {
  // Fetch all appointment types
  getAllAppointmentTypes: async (): Promise<any> => {
    try {
      const response = await axios.get(`${API_URL}/appointmentType`, {
        withCredentials: true,
      });
      return response.data; 
    } catch (error: any) {
      console.error(
        "Error fetching appointment types:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || {
          error: "Failed to fetch appointment types",
        }
      );
    }
  },

  // Fetch a specific appointment type by id
  getAppointmentTypeById: async (id: number): Promise<any> => {
    try {
      const response = await axios.get(`${API_URL}/appointmentType/${id}`, {
        withCredentials: true,
      });
      return response.data; // e.g., { appointmentType: {...} }
    } catch (error: any) {
      console.error(
        "Error fetching appointment type by id:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || {
          error: "Failed to fetch appointment type",
        }
      );
    }
  },
};
