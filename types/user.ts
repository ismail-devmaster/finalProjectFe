export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: "patient" | "doctor" | "receptionist" | "admin"
  status: "active" | "inactive"
  appointments: number
  lastAppointment: string | null
}


export type UserRole = "ADMIN" | "DOCTOR" | "RECEPTIONIST" | "PATIENT" | "USER";

export interface IUser {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  phone?: string;
  sexId: number;
  isVerified: boolean;
  verificationToken?: string | null;
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
  refreshToken?: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

