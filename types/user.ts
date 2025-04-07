export type UserRole = "ADMIN" | "DOCTOR" | "RECEPTIONIST" | "PATIENT" | "USER";

interface Patient {
  userId: number;
  medicalHistory: string;
}

interface Doctor {
  userId: number;
  // Add doctor-specific fields here
}

interface Receptionist {
  userId: number;
  // Add receptionist-specific fields here
}

export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date | null;
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
  patient?: Patient | null;
  doctor?: Doctor | null;
  receptionist?: Receptionist | null;
}
