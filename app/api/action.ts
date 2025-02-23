import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const action = {
  createAction: async (data: any): Promise<any> => {
    try {
      const response = await axios.post(`${API_URL}/actions`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error creating action:",
        error.response?.data || error.message
      );
      throw error.response?.data?.error || { error: "Failed to create action" };
    }
  },
  getAllActions: async (): Promise<any> => {
    try {
      const response = await axios.get(`${API_URL}/actions`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching actions:",
        error.response?.data || error.message
      );
      throw error.response?.data?.error || { error: "Failed to get actions" };
    }
  },
  getActionById: async (id: number): Promise<any> => {
    try {
      const response = await axios.get(`${API_URL}/actions/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching action by id:",
        error.response?.data || error.message
      );
      throw error.response?.data?.error || { error: "Failed to get action" };
    }
  },
  getActionsByPatientId: async (patientId: number): Promise<any> => {
    try {
      const response = await axios.get(
        `${API_URL}/actions/patient/${patientId}`,
        {
          withCredentials: true,
        }
      );
      return response.data; // Expected to return { actions: [...] } or an array
    } catch (error: any) {
      console.error(
        "Error fetching actions by patient id:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || {
          error: "Failed to fetch actions by patient id",
        }
      );
    }
  },
  updateAction: async (id: number, data: any): Promise<any> => {
    try {
      const response = await axios.put(`${API_URL}/actions/${id}`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error updating action:",
        error.response?.data || error.message
      );
      throw error.response?.data?.error || { error: "Failed to update action" };
    }
  },
  deleteAction: async (id: number): Promise<any> => {
    try {
      const response = await axios.delete(`${API_URL}/actions/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error deleting action:",
        error.response?.data || error.message
      );
      throw error.response?.data?.error || { error: "Failed to delete action" };
    }
  },
};
