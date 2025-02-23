import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const patient = {
  getAllPatients: async (): Promise<any> => {
    try {
      const response = await axios.get(`${API_URL}/patients`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching patients:",
        error.response?.data || error.message
      );
      throw error.response?.data?.error || { error: "Failed to get patients" };
    }
  },
  getPatientById: async (id: number): Promise<any> => {
    try {
      const response = await axios.get(`${API_URL}/patients/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching patient by id:",
        error.response?.data || error.message
      );
      throw error.response?.data?.error || { error: "Failed to get patient" };
    }
  },
  getPatientId: async (): Promise<any> => {
    try {
      const response = await axios.get(`${API_URL}/patients/id`, {
        withCredentials: true,
      });
      return response.data; // { patientId: ... }
    } catch (error: any) {
      console.error(
        "Error fetching patient id:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || { error: "Failed to fetch patient id" }
      );
    }
  },
};
