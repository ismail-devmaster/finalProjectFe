"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sun,
  Moon,
  Users,
  User,
  Stethoscope,
  Menu,
  LogOut,
  CalendarIcon,
} from "lucide-react";
import Appointments from "./appointments";
import Patients from "./patients";
import { patient } from "@/app/api/patient";
// Import the real appointment API from your appointment.ts file
import { appointment } from "@/app/api/appointment";

interface Patient {
  id: number;
  user: {
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
  patientId: number;
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

export default function Dashboard() {
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
    // Fetch real patient data from the API
    const fetchPatients = async () => {
      try {
        const res = await patient.getAllPatients();
        setPatients(res.patients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    // Fetch real appointment data from the API
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

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "dark" : ""
      } bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white`}
    >
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60"
      >
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Stethoscope className="h-6 w-6 text-blue-500 dark:text-blue-400" />
            <span className="ml-2 text-xl flex justify-center items-center text-center font-bold">
              DentaCare
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-4">
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
              />
              <Label htmlFor="dark-mode" className="sr-only">
                Dark mode
              </Label>
              {isDarkMode ? (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              )}
            </nav>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder-avatar.jpg"
                      alt="Dr. Smith"
                    />
                    <AvatarFallback>DS</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Dr. Smith
                    </p>
                    <p className="text-xs leading-none text-gray-500 dark:text-gray-400">
                      dr.smith@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.header>

      <div className="flex">
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-48 border-r bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60 overflow-y-auto"
            >
              <nav className="flex-1 space-y-2 p-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setActiveTab("appointments")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Appointments
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setActiveTab("patients")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Patients
                </Button>
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        <main
          className={`flex-1 overflow-y-auto p-6 ${
            isSidebarOpen ? "md:ml-64" : ""
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="container mx-auto"
          >
            <h1 className="text-3xl font-bold mb-6">Dental Dashboard</h1>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-8"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="patients">Patients</TabsTrigger>
              </TabsList>

              <TabsContent value="appointments">
                <Appointments appointments={appointments} patients={patients} />
              </TabsContent>

              <TabsContent value="patients">
                <Patients patients={patients} />
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
