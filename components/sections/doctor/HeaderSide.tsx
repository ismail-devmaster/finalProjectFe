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
import { LogOut, Menu, Moon, Stethoscope, Sun, User } from "lucide-react";
import { motion } from "framer-motion";
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
  const isScrolled = false; // Define the isScrolled variable

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60"
    >
      <div className="flex h-14 w-full items-center justify-between">
        <div className="flex items-center space-x-4 pl-7">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className={`text-2xl md:text-3xl font-bold font-playfair ${
              isScrolled
                ? "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                : "text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-200"
            }`}
          >
            Ramdani Dental Center
          </a>
        </div>
        <div className="flex items-center space-x-4 pr-7">
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
              {isDarkMode
                ? <Moon className="h-[1.2rem] w-[1.2rem]" />
                : <Sun className="h-[1.2rem] w-[1.2rem]" />}
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
      </div>
    </motion.header>
  );
}
