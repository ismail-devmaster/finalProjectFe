import { useEffect, useState } from "react";
import { appointment, patient, allTasks, auth } from "@/app/api";

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

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: Person;
  assignor: Person;
  priority: "high" | "medium" | "low";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  dueDate: string;
  createdAt: string;
  completedAt?: string;
}

interface DoctorId {
  id: number;
}

export default function useDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("appointments");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [doctorId, setDoctorId] = useState<DoctorId>();
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

    const fetchTasks = async () => {
      try {
        const { tasks } = await allTasks.getAllTasks();
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    const fetchDoctorId = async () => {
      try {
        const { user } = await auth.getUserId();
        setDoctorId(user);
      } catch (error) {
        console.error("Error fetching doctor ID:", error);
      }
    };

    fetchTasks();
    fetchDoctorId();
    fetchPatients();
    fetchAppointments();
  }, []);

  return {
    isDarkMode,
    toggleDarkMode,
    activeTab,
    setActiveTab,
    patients,
    tasks,
    doctorId,
    appointments,
    isSidebarOpen,
    setIsSidebarOpen,
  };
}
