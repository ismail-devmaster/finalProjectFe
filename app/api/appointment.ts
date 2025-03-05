import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const appointment = {
  createAppointment: async (data: any): Promise<any> => {
    try {
      const response = await axios.post(`${API_URL}/appointments`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error creating appointment:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || { error: "Failed to create appointment" }
      );
    }
  },
  updateAppointment: async (id: number, data: any): Promise<any> => {
    try {
      const response = await axios.put(`${API_URL}/appointments/${id}`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error updating appointment:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || { error: "Failed to update appointment" }
      );
    }
  },
  deleteAppointment: async (id: number): Promise<any> => {
    try {
      const response = await axios.delete(`${API_URL}/appointments/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error deleting appointment:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || { error: "Failed to delete appointment" }
      );
    }
  },
  getAllAppointments: async (): Promise<any> => {
    try {
      const response = await axios.get(`${API_URL}/appointments`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching appointments:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || { error: "Failed to get appointments" }
      );
    }
  },
  getAppointmentById: async (id: number): Promise<any> => {
    try {
      const response = await axios.get(`${API_URL}/appointments/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching appointment by id:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || { error: "Failed to get appointment" }
      );
    }
  },
  getAppointmentsByActionId: async (actionId: number): Promise<any> => {
    try {
      const response = await axios.get(
        `${API_URL}/appointments/action/${actionId}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching appointments by actionId:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || {
          error: "Failed to fetch appointments by actionId",
        }
      );
    }
  },
  getAppointmentsWithWaitingStatus: async (): Promise<any> => {
    try {
      const response = await axios.get(`${API_URL}/appointments/waiting`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching waiting appointments:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || {
          error: "Failed to fetch waiting appointments",
        }
      );
    }
  },
  getAppointmentsWithUpcomingStatus: async (): Promise<any> => {
    try {
      const response = await axios.get(`${API_URL}/appointments/upcoming`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching upcoming appointments:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || {
          error: "Failed to fetch upcoming appointments",
        }
      );
    }
  },

  getAppointmentsByDoctorId: async (doctorId: number): Promise<any> => {
    try {
      const response = await axios.get(
        `${API_URL}/appointments/doctor/${doctorId}`,
        {
          withCredentials: true,
        }
      );
      return response.data; // Expected response: { appointments: [...] } or an array
    } catch (error: any) {
      console.error(
        "Error fetching appointments by doctor id:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || {
          error: "Failed to fetch appointments by doctor id",
        }
      );
    }
  },
};
