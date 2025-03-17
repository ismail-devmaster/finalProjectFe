"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  CreditCard,
  FileText,
  LogOut,
  Menu,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useRouter } from "next/navigation";
import Link from "next/link";

type PersonalInfoType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  patientId: string;
  medicalHistory: string;
};
import { auth, patient } from "@/app/api";
const PatientDashboardComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // export default function PatientDashboardComponent({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<PersonalInfoType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  // Handle Logout
  const handleLogout = async () => {
    try {
      await auth.logout();
      router.push("/"); // Redirect to home or login page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await patient.getPatientData();
        if (response?.patientData) {
          const { user, medicalHistory } = response.patientData;
          setUserInfo({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            dob: new Date(user.dateOfBirth).toISOString().split("T")[0],
            address: "", // Placeholder until actual data is available
            patientId: user.id.toString(),
            medicalHistory: medicalHistory || "No medical history available.",
          });
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPatientData();
  }, []);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const navItems = [
    { href: "/patient/profile", icon: User, label: "My Profile" },
    { href: "/patient/appointments", icon: Calendar, label: "Appointments" },
    { href: "/patient/payments", icon: CreditCard, label: "Payments" },
  ];
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()
      }`;
  };
  const PFP = getInitials(
    userInfo ? userInfo.firstName : "",
    userInfo ? userInfo.lastName : "",
  );
  return (
    <div
      className={`flex flex-col h-screen overflow-hidden ${darkMode ? "dark" : ""
        }`}
    >
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/patient" className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="Patient"
                />
                <AvatarFallback>{PFP}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-semibold text-gray-800 dark:text-white md:text-base">
                {userInfo?.firstName} {userInfo?.lastName}
              </span>
            </Link>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                    {darkMode
                      ? <Sun className="h-4 w-4" />
                      : <Moon className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{darkMode ? "Light Mode" : "Dark Mode"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleLogout()}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-800 shadow-md">
          <ul className="px-4 py-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
        <div className="container px-4 py-6 mx-auto">{children}</div>
      </main>
    </div>
  );
};
export default PatientDashboardComponent;
