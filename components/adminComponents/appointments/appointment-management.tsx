"use client";

import { useState, useEffect } from "react";
import { isSameDay, parseISO } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentList } from "./appointment-list";
import { CalendarView } from "./calendar-view";
import { AppointmentDetails } from "./appointment-details";
import { appointment } from "@/app/api"; // Adjust the import path as needed
import type { Appointment } from "./types/appointment";

export function AppointmentManagement() {
  // State to store real appointments data
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date | null>(
    null
  );

  // Fetch real appointment data from the API on mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { appointments } = await appointment.getAllAppointments();
        setAppointments(appointments);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Listen for external events to change the current month (e.g., from the CalendarView)
  useEffect(() => {
    const handleSetMonth = (e: CustomEvent<Date>) => {
      setCurrentMonth(e.detail);
    };

    window.addEventListener("setMonth", handleSetMonth as EventListener);

    return () => {
      window.removeEventListener("setMonth", handleSetMonth as EventListener);
    };
  }, []);

  // Filter appointments based on search, type, status, and date
  const filteredAppointments = appointments.filter((appointment) => {
    const patientName =
      `${appointment.patient.user.firstName} ${appointment.patient.user.lastName}`.toLowerCase();
    const doctorName =
      `${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}`.toLowerCase();

    const matchesSearch =
      patientName.includes(searchTerm.toLowerCase()) ||
      doctorName.includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === "all" ||
      appointment.action.appointmentType.type === typeFilter;
    const matchesStatus =
      statusFilter === "all" || appointment.status.status === statusFilter;
    const matchesDate =
      !selectedDate || isSameDay(parseISO(appointment.date), selectedDate);

    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailsDialogOpen(true);
  };

  const handlePreviousYear = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth(), 1)
    );
  };

  const handleNextYear = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth(), 1)
    );
  };

  const handleCalendarDateSelect = (date: Date | undefined) => {
    setSelectedCalendarDate(date || null);
  };

  const filterProps = {
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    selectedDate,
    setSelectedDate,
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Appointment Management
        </h1>
      </div>
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Appointments</CardTitle>
              <CardDescription>
                View and manage all appointments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AppointmentList
                appointments={appointments}
                filteredAppointments={filteredAppointments}
                onViewDetails={handleViewDetails}
                filterProps={filterProps}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>
                View appointments in a calendar format.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarView
                appointments={appointments}
                currentMonth={currentMonth}
                onPreviousYear={handlePreviousYear}
                onNextYear={handleNextYear}
                selectedDate={selectedCalendarDate}
                onSelectDate={handleCalendarDateSelect}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AppointmentDetails
        appointment={selectedAppointment}
        isOpen={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
        allAppointments={appointments}
      />
    </div>
  );
}
