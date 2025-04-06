"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppointmentTable } from "./components/appointment-table";
import { AppointmentFilters } from "./components/appointment-filters";
import { appointment } from "@/app/api";
import { patient } from "@/app/api";
import { doctor } from "@/app/api";
import { appointmentType } from "@/app/api";
import type { Appointment, AppointmentType, Doctor, Patient } from "./types";
import { Calendar } from "lucide-react";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const [patients, setPatients] = React.useState<Patient[]>([]);
  const [doctors, setDoctors] = React.useState<Doctor[]>([]);
  const [appointmentTypes, setAppointmentTypes] = React.useState<
    AppointmentType[]
  >([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterPeriod, setFilterPeriod] = React.useState("all");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [
          appointmentsData,
          patientsData,
          doctorsData,
          appointmentTypesData,
        ] = await Promise.all([
          appointment.getAppointmentsWithUpcomingStatus(),
          patient.getAllPatients(),
          doctor.getAllDoctors(),
          appointmentType.getAllAppointmentTypes(),
        ]);
        setAppointments(appointmentsData.appointments);
        setPatients(patientsData.patients);
        setDoctors(doctorsData.doctors);
        setAppointmentTypes(appointmentTypesData.appointmentTypes);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdateAppointment = async (updatedAppointment: Appointment) => {
    try {
      const response = await appointment.updateAppointment(
        updatedAppointment.id,
        {
          doctorId: updatedAppointment.doctorId,
          date: updatedAppointment.date,
          time: updatedAppointment.time,
          additionalNotes: updatedAppointment.additionalNotes,
        }
      );
      setAppointments(
        appointments.map((app) => (app.id === response.id ? response : app))
      );
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const handleRemoveAppointment = async (id: number) => {
    try {
      await appointment.deleteAppointment(id);
      setAppointments(appointments.filter((app) => app.id !== id));
    } catch (error) {
      console.error("Error removing appointment:", error);
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patient.user.firstName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.patient.user.lastName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.action.appointmentType.type
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.date.toLowerCase().includes(searchTerm.toLowerCase());

    const appointmentDate = new Date(appointment.date);
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    switch (filterPeriod) {
      case "today":
        return (
          matchesSearch &&
          appointmentDate.getDate() === today.getDate() &&
          appointmentDate.getMonth() === today.getMonth() &&
          appointmentDate.getFullYear() === today.getFullYear()
        );
      case "this-week":
        return (
          matchesSearch &&
          appointmentDate >= startOfWeek &&
          appointmentDate <= endOfWeek
        );
      case "this-month":
        return (
          matchesSearch &&
          appointmentDate >= startOfMonth &&
          appointmentDate <= endOfMonth
        );
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 to-sky-600 bg-clip-text text-transparent">
          Appointment Management
        </h1>
        <p className="text-muted-foreground mt-2">
          Schedule, reschedule, and manage patient appointments
        </p>
      </div>

      <Card className="shadow-md border-t-4 border-t-violet-500">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-violet-500" />
            <div>
              <CardTitle>Appointment Dashboard</CardTitle>
              <CardDescription>
                View and manage upcoming appointments
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <AppointmentFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filterPeriod={filterPeriod}
              onFilterChange={setFilterPeriod}
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-pulse text-center">
                <div className="h-8 w-32 bg-muted rounded mx-auto"></div>
                <div className="h-4 w-48 bg-muted rounded mx-auto mt-2"></div>
                <p className="text-sm text-muted-foreground mt-4">
                  Loading appointment data...
                </p>
              </div>
            </div>
          ) : (
            <>
              {filteredAppointments.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No appointments found matching your search criteria
                </div>
              ) : (
                <AppointmentTable
                  appointments={filteredAppointments}
                  doctors={doctors}
                  onEdit={handleUpdateAppointment}
                  onRemove={handleRemoveAppointment}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
