"use client";

import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Appointments from "@/app/staff/doctor/appointments";
import Patients from "@/app/staff/doctor/patients";
// Import the real appointment API from your appointment.ts file

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
interface MainContentProps {
  isSidebarOpen: boolean;
  activeTab: string;
  setActiveTabAction: (tab: string) => void;
  appointments: Appointment[];
  patients: Patient[];
}

export default function MainContent(
  {
    isSidebarOpen,
    activeTab,
    setActiveTabAction: setActiveTab,
    appointments,
    patients,
  }: MainContentProps,
) {
  return (
    <main
      className={`flex-1 overflow-y-auto p-6 ${isSidebarOpen ? "md:ml-64" : ""
        }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="container mx-auto"
      >
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsContent value="appointments">
            <Appointments appointments={appointments} patients={patients} />
          </TabsContent>

          <TabsContent value="patients">
            <Patients patients={patients} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </main>
  );
}
