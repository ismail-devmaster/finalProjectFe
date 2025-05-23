"use client";

import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Appointments from "@/components/sections/doctor/parts/appointments";
import Patients from "@/components/sections/doctor/parts/patients";
import { TaskManagement } from "./parts/tasks";
import { InventoryManagement } from "./parts/union/inventory-management";
import { Profile } from "./parts/union/profile";

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  sex: {
    gender: string;
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

interface MainContentProps {
  isSidebarOpen: boolean;
  activeTab: string;
  setActiveTabAction: (tab: string) => void;
  appointments: Appointment[];
  patients: Patient[];
  tasks: Task[];
  doctorId: DoctorId;
}

export default function MainContent({
  isSidebarOpen,
  activeTab,
  setActiveTabAction: setActiveTab,
  appointments,
  patients,
  tasks,
  doctorId,
}: MainContentProps) {
  return (
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
          <TabsContent value="tasks">
            <TaskManagement />
          </TabsContent>
          <TabsContent value="inventory">
            <InventoryManagement />
          </TabsContent>
          <TabsContent value="profile">
            <Profile />
          </TabsContent>
        </Tabs>
      </motion.div>
    </main>
  );
}
