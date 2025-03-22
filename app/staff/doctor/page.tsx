"use client";

import React from "react";
import HeaderSide from "@/components/sections/doctor/HeaderSide";
import MainContent from "@/components/sections/doctor/MainContent";
import SideBare from "@/components/sections/doctor/SideBare";
import useDoctor from "@/hooks/pages/useDoctor";
export default function Dashboard() {
  const {
    isDarkMode,
    toggleDarkMode,
    activeTab,
    setActiveTab,
    patients,
    appointments,
    tasks,
    doctorId,
    isSidebarOpen,
    setIsSidebarOpen,
  } = useDoctor();
  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "dark" : ""
      } bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white`}
    >
      <HeaderSide
        isSidebarOpen={isSidebarOpen}
        isDarkMode={isDarkMode}
        setIsSidebarOpenAction={setIsSidebarOpen}
        toggleDarkModeAction={toggleDarkMode}
      />

      <div className="flex">
        <SideBare
          setActiveTabAction={setActiveTab}
          activeTab={activeTab}
          isSidebarOpen={isSidebarOpen}
        />
        <MainContent
          isSidebarOpen={isSidebarOpen}
          activeTab={activeTab}
          setActiveTabAction={setActiveTab}
          appointments={appointments}
          patients={patients}
          tasks={tasks}
          doctorId={doctorId!}
        />
      </div>
    </div>
  );
}
