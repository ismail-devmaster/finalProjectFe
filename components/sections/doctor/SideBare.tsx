"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Users } from "lucide-react";
// Import the real appointment API from your appointment.ts file
interface SideBareProps {
  isSidebarOpen: boolean;
  activeTab: string;
  setActiveTabAction: (tab: string) => void;
}
export default function SideBare({
  setActiveTabAction: setActiveTab,
  activeTab,
  isSidebarOpen,
}: SideBareProps) {
  return (
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
              variant={activeTab === "appointments" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("appointments")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              Appointments
            </Button>
            <Button
              variant={activeTab === "patients" ? "default" : "ghost"}
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
  );
}
