import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

const request = async (method: string, endpoint: string, data?: any) => {
  try {
    const response = await axios({
      method,
      url: `${API_URL}${endpoint}`,
      data,
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.error(
      `Error ${method} ${endpoint}:`,
      error.response?.data || error.message
    );
    throw (
      error.response?.data?.error || {
        error: `Failed to ${method} ${endpoint}`,
      }
    );
  }
};

export const action = {
  createAction: (data: any) => request("post", "/actions", data),
  getAllActions: () => request("get", "/actions"),
  getActionById: (id: number) => request("get", `/actions/${id}`),
  getActionsByPatientId: (patientId: number) =>
    request("get", `/actions/patient/${patientId}`),
  updateAction: (id: number, data: any) =>
    request("put", `/actions/${id}`, data),
  deleteAction: (id: number) => request("delete", `/actions/${id}`),
};

export const user = {
  getStaff: () => request("get", "/users/staff"),
}

export const admin = {
  verify: () => request("get", "/admin/verify"),
  updateRole: (userId: string, newRole: string) =>
    request("put", "/admin/update-role", { userId, newRole }),
  deleteUser: (userId: string) => request("delete", `/admin/user/${userId}`),
  getAllPatients: () => request("get", "/admin/patients"),
  getAllDoctors: () => request("get", "/admin/doctors"),
  getAllReceptionists: () => request("get", "/admin/receptionists"),
  getAllUsers: () => request("get", "/admin/users"),
};

export const appointment = {
  createAppointment: (data: any) => request("post", "/appointments", data),
  updateAppointment: (id: number, data: any) =>
    request("put", `/appointments/${id}`, data),
  deleteAppointment: (id: number) => request("delete", `/appointments/${id}`),
  getAllAppointments: () => request("get", "/appointments"),
  getAppointmentById: (id: number) => request("get", `/appointments/${id}`),
  getAppointmentsByActionId: (actionId: number) =>
    request("get", `/appointments/action/${actionId}`),
  getAppointmentsWithWaitingStatus: () =>
    request("get", "/appointments/waiting"),
  getAppointmentsWithUpcomingStatus: () =>
    request("get", "/appointments/upcoming"),
  getAppointmentsByDoctorId: (doctorId: number) =>
    request("get", `/appointments/doctor/${doctorId}`),
};

export const appointmentType = {
  getAllAppointmentTypes: () => request("get", "/appointmentType"),
  getAppointmentTypeById: (id: number) =>
    request("get", `/appointmentType/${id}`),
};

export const auth = {
  signup: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    sexId: string,
    medicalHistory: string,
    phone: string
  ) =>
    request("post", "/auth/signup", {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      phone,
      sexId,
      roleData: { medicalHistory },
    }),

  login: (email: string, password: string) =>
    request("post", "/auth/login", { email, password }),

  forgotPassword: (email: string) =>
    request("post", "/auth/forgot-password", { email }),

  resetPassword: (token: string, newPassword: string) =>
    request("post", `/auth/reset-password/${token}`, { newPassword }),

  refreshToken: () => request("post", "/auth/refresh-token", {}),

  logout: () => request("post", "/auth/logout", {}),

  completeProfile: (
    tempToken: string,
    phone: string,
    sexId: number,
    dateOfBirth: string
  ) =>
    request("post", "/auth/update-profile", {
      tempToken,
      phone,
      sexId,
      dateOfBirth,
    }),

  googleLogin: () => {
    window.location.href = `${API_URL}/auth/google`;
  },

  getUserId: () => request("get", "/auth/userId"),
};

export const doctor = {
  getAllDoctors: () => request("get", "/doctors"),

  getDoctorById: (id: number) => request("get", `/doctors/${id}`),
};

export const patient = {
  getAllPatients: () => request("get", "/patients"),

  getPatientDataById: (id: number) => request("get", `/patients/${id}`),

  getPatientData: () => request("get", "/patients/data"),

  getPatientId: () => request("get", "/patients/id"),
};

export const payment = {
  createPayment: (data: any) => request("post", "/payments", data),

  updatePayment: (id: number, data: any) =>
    request("put", `/payments/${id}`, data),

  deletePayment: (id: number) => request("delete", `/payments/${id}`),

  getAllPayments: () => request("get", "/payments"),

  getPaymentById: (id: number) => request("get", `/payments/${id}`),

  getPaymentsByActionId: (actionId: number) =>
    request("get", `/payments/action/${actionId}`),
};

export const category = {
  getAllCategories: () => request("get", "/categories"),
  getCategoryById: (id: number) => request("get", `/categories/${id}`),
  createCategory: (data: any) => request("post", "/categories", data),
  updateCategory: (id: number, data: any) =>
    request("put", `/categories/${id}`, data),
  deleteCategory: (id: number) => request("delete", `/categories/${id}`),
};

export const inventory = {
  createInventory: (data: any) => request("post", "/inventory", data),
  getAllInventories: () => request("get", "/inventory"),
  getLowStockInventories: () => request("get", "/inventory/low-stock"),
  getInStockInventories: () => request("get", "/inventory/in-stock"),
  getOutOfStockInventories: () => request("get", "/inventory/out-of-stock"),
  getInventoryById: (id: number) => request("get", `/inventory/${id}`),
  updateInventory: (id: number, data: any) =>
    request("put", `/inventory/${id}`, data),
  deleteInventory: (id: number) => request("delete", `/inventory/${id}`),
};

export const unit = {
  getInventoryUnits: () => request("get", "/units"),
};

export const allTasks = {
  createTask: (data: any) => request("post", "/tasks", data),
  getAllTasks: () => request("get", "/tasks"),
  getTaskById: (id: number) => request("get", `/tasks/${id}`),
  getMyTasks: () => request("get", "/tasks/my-tasks"),
  getCompletedTasks: () => request("get", "/tasks/my-completed-tasks"),
  updateTask: (id: string, data: any) => request("put", `/tasks/${id}`, data),
  deleteTask: (id: string) => request("delete", `/tasks/${id}`),
};

export const taskStauts = {
  getAllTaskStatuses: () => request("get", "/task-status"),
};

export const taskPriority = {
  getAllTaskPriorities: () => request("get", "/task-priority"),
};
