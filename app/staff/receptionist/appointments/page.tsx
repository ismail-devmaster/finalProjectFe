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

export default function AppointmentsPage() {
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const [patients, setPatients] = React.useState<Patient[]>([]);
  const [doctors, setDoctors] = React.useState<Doctor[]>([]);
  const [appointmentTypes, setAppointmentTypes] = React.useState<
    AppointmentType[]
  >([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterPeriod, setFilterPeriod] = React.useState("all");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          appointmentsData,
          patientsData,
          doctorsData,
          appointmentTypesData,
        ] = await Promise.all([
          appointment.getAllAppointments(),
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
        },
      );
      setAppointments(
        appointments.map((app) => (app.id === response.id ? response : app)),
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
    const matchesSearch = appointment.patient.user.firstName
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      appointment.patient.user.lastName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.action.appointmentType.type
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

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
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center dark:text-white">
        Appointment Management
      </h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Appointment Management</CardTitle>
          <CardDescription>
            Schedule, reschedule, or cancel appointments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <AppointmentFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filterPeriod={filterPeriod}
              onFilterChange={setFilterPeriod}
            />
          </div>
          <AppointmentTable
            appointments={filteredAppointments}
            doctors={doctors}
            onEdit={handleUpdateAppointment}
            onRemove={handleRemoveAppointment}
          />
        </CardContent>
      </Card>
    </div>
  );
}
