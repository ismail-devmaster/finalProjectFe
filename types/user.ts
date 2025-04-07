export type UserRole = "ADMIN" | "DOCTOR" | "RECEPTIONIST" | "PATIENT" | "USER";

export interface User {
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
  avatar?: string;
  status?: "active" | "inactive";
  appointments?: number;
  lastAppointment?: Date | null;
}
