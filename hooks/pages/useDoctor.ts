import { useEffect, useState } from "react";
import { appointment, patient } from "@/app/api";

interface Patient {
  id: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    sex: {
      gender: string;
    };
  };
  medicalHistory?: string;
}

interface Appointment {
  id: number;
  doctorId: number;
  patientId: number;
  actionId: number;
  date: string;
  time: string;
  action: {
    appointmentType: {
      id: number;
      type: string;
    };
  };
  status: {
    id: number;
    status: string;
  };
  patient: Patient;
}

export default function useDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("appointments");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await patient.getAllPatients();
        setPatients(res.patients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const res = await appointment.getAllAppointments();
        setAppointments(res.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchPatients();
    fetchAppointments();
  }, []);

  return {
    isDarkMode,
    toggleDarkMode,
    activeTab,
    setActiveTab,
    patients,
    appointments,
    isSidebarOpen,
    setIsSidebarOpen,
  };
}
