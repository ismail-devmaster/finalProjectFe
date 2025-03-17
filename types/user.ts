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

