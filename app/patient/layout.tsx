"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  CreditCard,
  LogOut,
  Menu,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const PatientDashboardComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userInfo, setUserInfo] = useState<PersonalInfoType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.logout();
      router.push("/");
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
            address: "",
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

  const navItems: NavItem[] = [
    { title: "My Profile", href: "/patient/profile", icon: User },
    { title: "Appointments", href: "/patient/appointments", icon: Calendar },
    { title: "Payments", href: "/patient/payments", icon: CreditCard },
  ];

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0).toUpperCase()}${lastName
      .charAt(0)
      .toUpperCase()}`;
  };

  const PFP = getInitials(
    userInfo ? userInfo.firstName : "",
    userInfo ? userInfo.lastName : ""
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div
      className={`flex min-h-screen flex-col ${theme === "dark" ? "dark" : ""}`}
    >
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="flex items-center gap-2 pb-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="Patient" />
                <AvatarFallback>{PFP}</AvatarFallback>
              </Avatar>
              <span className="text-lg font-semibold">
                {userInfo?.firstName} {userInfo?.lastName}
              </span>
            </div>
            <nav className="grid gap-2 text-lg font-medium">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="Patient" />
            <AvatarFallback>{PFP}</AvatarFallback>
          </Avatar>
          <span className="text-lg font-semibold">
            {userInfo?.firstName} {userInfo?.lastName}
          </span>
        </div>
        <div className="flex-1" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                setTheme("light");
                document.documentElement.classList.remove("dark");
              }}
            >
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setTheme("dark");
                document.documentElement.classList.add("dark");
              }}
            >
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" size="icon" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Logout</span>
        </Button>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-background md:block">
          <nav className="grid gap-2 p-4 text-sm font-medium">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default PatientDashboardComponent;
