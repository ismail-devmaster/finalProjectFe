"use client";

import React from "react";
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
import { LogOut, Menu, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { auth } from "@/app/api";
interface HeaderSideProps {
  isSidebarOpen: boolean;
  isDarkMode: boolean;
  setIsSidebarOpenAction: (open: boolean) => void;
  toggleDarkModeAction: () => void;
}

export default function HeaderSide({
  isSidebarOpen,
  isDarkMode,
  setIsSidebarOpenAction: setIsSidebarOpen,
  toggleDarkModeAction: toggleDarkMode,
}: HeaderSideProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.logout();
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6"
    >
      <Button
        variant="outline"
        size="icon"
        className="md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold">RAMDANI DENTAL CENTER</span>
      </div>
      <div className="flex-1" />
      <Button
        variant="outline"
        size="icon"
        onClick={toggleDarkMode}
      >
        {isDarkMode ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
      <Button variant="outline" size="icon" onClick={handleLogout}>
        <LogOut className="h-5 w-5" />
        <span className="sr-only">Logout</span>
      </Button>
    </motion.header>
  );
}
