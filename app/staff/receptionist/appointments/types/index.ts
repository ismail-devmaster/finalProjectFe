export interface User {
  id: number
  firstName: string
  lastName: string
}

export interface Doctor {
  userId: number
  user: User
}

export interface Patient {
  userId: number
  user: User
}

export interface AppointmentType {
  id: number
  type: string
}

export interface Action {
  appointmentType: AppointmentType
}

export interface Appointment {
  id: number
  patient: Patient
  doctor: Doctor
  action: Action
  date: string
  time: string
  additionalNotes?: string
  doctorId: number
  actionId: number
}

export interface AppointmentFormData {
  patientId: string
  doctorId: string
  appointmentTypeId: string
  date: string
  time: string
  additionalNotes?: string
}

