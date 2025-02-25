export interface Appointment {
    id: number
    patientId: number
    doctorId: number
    actionId: number
    statusId: number
    date: string
    time: string
    additionalNotes: string
    status: {
      id: number
      status: string
    }
    action: {
      appointmentType: {
        id: number
        type: string
      }
    }
    patient: {
      medicalHistory: string | null
      user: {
        id: number
        firstName: string
        lastName: string
        dateOfBirth: string
        phone: string
        email: string
        sex: {
          gender: string
        }
      }
    }
    doctor: {
      user: {
        firstName: string
        lastName: string
      }
    }
  }
  
  