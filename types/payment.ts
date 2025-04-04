export type PaymentStatus = "PAID" | "PENDING" | "CANCELLED";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Doctor {
  user: User;
}

export interface Patient {
  user: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export interface Status {
  id: number;
  status: PaymentStatus;
}

export interface AppointmentType {
  type: string;
}

export interface Action {
  id: number;
  appointmentTypeId: number;
  appointmentType: AppointmentType;
  patientId: number;
  description: string;
  totalPayment: number;
  startDate: string;
  endDate: string | null;
  isCompleted: boolean;
  completedAt: string | null;
  payments?: Payment[];
}

export interface Payment {
  id: number;
  patientId: number;
  doctorId: number;
  statusId: number;
  actionId: number;
  amount: number;
  date: string;
  time: string;
  description: string;
  doctor: Doctor;
  patient: Patient;
  status: Status;
  action: Action;
}

export interface AuditTrailEntry {
  id: string;
  action: string;
  amount: number;
  user: string;
  timestamp: string;
  details: string;
}

export interface CashFlowDataPoint {
  name: string;
  income: number;
  expenses: number;
}
