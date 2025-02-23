export interface Doctor {
    user: {
      id: number;
      firstName: string;
      lastName: string;
    };
  }
  
  export interface Appointment {
    id: number;
    date: string;
    time: string;
    type: {
      type: string;
    };
    doctor: {
      userId: number;
    };
    status: {
      status: AppointmentStatus;
    };
    additionalNotes?: string;
  }
  
  export type AppointmentStatus = 'WAITING' | 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
  
  export interface AppointmentFormData {
    doctorId: string;
    date: string;
    time: string;
    additionalNotes: string;
  }
  
  export interface BookAppointmentFormProps {
    onBookAppointment: (appointment: AppointmentFormData) => void;
  }