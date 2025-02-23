import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const payment = {
  createPayment: async (data: any): Promise<any> => {
    try {
      const response = await axios.post(`${API_URL}/payments`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error creating payment:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || { error: "Failed to create payment" }
      );
    }
  },
  updatePayment: async (id: number, data: any): Promise<any> => {
    try {
      const response = await axios.put(`${API_URL}/payments/${id}`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error updating payment:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || { error: "Failed to update payment" }
      );
    }
  },
  deletePayment: async (id: number): Promise<any> => {
    try {
      const response = await axios.delete(`${API_URL}/payments/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error deleting payment:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || { error: "Failed to delete payment" }
      );
    }
  },
  getAllPayments: async (): Promise<any> => {
    try {
      const response = await axios.get(`${API_URL}/payments`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching payments:",
        error.response?.data || error.message
      );
      throw error.response?.data?.error || { error: "Failed to get payments" };
    }
  },
  getPaymentById: async (id: number): Promise<any> => {
    try {
      const response = await axios.get(`${API_URL}/payments/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching payment by id:",
        error.response?.data || error.message
      );
      throw error.response?.data?.error || { error: "Failed to get payment" };
    }
  },
  getPaymentsByActionId: async (actionId: number): Promise<any> => {
    try {
      const response = await axios.get(
        `${API_URL}/payments/action/${actionId}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching payments by action id:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || {
          error: "Failed to fetch payments by action id",
        }
      );
    }
  },
};
