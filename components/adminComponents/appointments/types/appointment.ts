export interface Sex {
  gender: "MALE" | "FEMALE" | "OTHER"
}

export interface User {
  id?: number
  firstName: string
  lastName: string
  dateOfBirth?: string
  phone?: string
  email?: string
  sex?: Sex
}

export interface Patient {
  userId?: number
  medicalHistory: string | null
  user: User
}

export interface Doctor {
  user: {
    firstName: string
    lastName: string
  }
}

export interface AppointmentType {
  id: number
  type: "GENERAL" | "SPECIALIST" | "FOLLOW_UP" | "EMERGENCY"
}

export interface Action {
  appointmentType: AppointmentType
}

export interface Status {
  id: number
  status: "WAITING" | "UPCOMING" | "COMPLETED" | "CANCELLED"
}

export interface QueueEntry {
  id: number
  patientId: number
  appointmentId: number
  estimatedWaitTime: number
  estimatedTimeToDoctor: number
  status: string
}

export interface Appointment {
  id: number
  patientId: number
  doctorId: number
  actionId: number
  statusId: number
  date: string
  time: string
  additionalNotes: string | null
  status: Status
  queueEntries: QueueEntry[]
  action: Action
  patient: Patient
  doctor: Doctor
}

export interface FilterProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  typeFilter: string
  setTypeFilter: (value: string) => void
  statusFilter: string
  setStatusFilter: (value: string) => void
  selectedDate: Date | undefined
  setSelectedDate: (date: Date | undefined) => void
}

export interface AppointmentCardProps {
  appointment: Appointment
  onViewDetails: (appointment: Appointment) => void
}

export interface AppointmentDetailsProps {
  appointment: Appointment | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  allAppointments: Appointment[]
}

export interface CalendarViewProps {
  appointments: Appointment[]
  currentMonth: Date
  onPreviousYear: () => void
  onNextYear: () => void
  selectedDate: Date | null
  onSelectDate: (date: Date | undefined) => void
}

export interface AppointmentListProps {
  appointments: Appointment[]
  filteredAppointments: Appointment[]
  onViewDetails: (appointment: Appointment) => void
  filterProps: FilterProps
}

