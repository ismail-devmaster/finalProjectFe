"use client";

import React, { useState } from "react";
import { Calendar, Menu, Armchair, Users, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

const ReceptionistDashboardComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeContent, setActiveContent] = React.useState("");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } overflow-y-auto transition-all duration-300 ease-in-out flex flex-col`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mb-5"
          >
            <Menu className="h-6 w-6" />
          </Button>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className={`text-xd md:text- font-bold font-playfair ${
              isScrolled
                ? "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                : "text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-200"
            }`}
          >
            Ramdani Dental Center
          </a>

          <nav className="space-y-2">
            <Link
              className={`flex items-center px-4 py-2 ${
                activeContent === "appointments"
                  ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              }`}
              href="/staff/receptionist/appointments"
              onClick={() => setActiveContent("appointments")}
            >
              <Calendar className="w-4 h-4" />
              {isSidebarOpen && <span className="ml-3">Appointments</span>}
            </Link>
            
            <Link
              className={`flex items-center px-4 py-2 ${
                activeContent === "patients"
                  ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              }`}
              href="/staff/receptionist/patients"
              onClick={() => setActiveContent("patients")}
            >
              <Users className="w-4 h-4" />
              {isSidebarOpen && <span className="ml-3">Patients</span>}
            </Link>

            <Link
              className={`flex items-center px-4 py-2 ${
                activeContent === "newAppointments"
                  ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              }`}
              href="/staff/receptionist/newAppointments"
              onClick={() => setActiveContent("newAppointments")}
            >
              <Calendar className="w-4 h-4" />
              {isSidebarOpen && <span className="ml-3">New Appointments</span>}
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <header className="bg-white dark:bg-gray-800 shadow-md rounded-lg mb-0 mx-10 my-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleDarkMode}
                    >
                      {darkMode ? (
                        <Sun className="h-5 w-5" />
                      ) : (
                        <Moon className="h-5 w-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {darkMode
                        ? "Switch to Light Mode"
                        : "Switch to Dark Mode"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </header>
        <div className="container px-6 py-8 mx-auto">{children}</div>
      </main>
    </div>
  );
};
export default ReceptionistDashboardComponent;
