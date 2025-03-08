"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NewAppointmentModal } from "@/components/new-appointment-modal";
import { appointment } from "@/app/api";

interface AppointmentsViewProps {
  actionId: number;
  doctors: any[];
  onBack: () => void;
}

export function AppointmentsView(
  { actionId, doctors, onBack }: AppointmentsViewProps,
) {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] = useState(
    false,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentsData = await appointment.getAppointmentsByActionId(
          actionId,
        );
        setAppointments(appointmentsData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch appointments. Please try again.");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [actionId]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedAppointments = [...appointments].sort((a, b) => {
    if (!sortColumn) return 0;
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const filteredAppointments = sortedAppointments.filter((appointment) =>
    Object.values(appointment).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleNewAppointment = async (newAppointment: any) => {
    try {
      const createdAppointment = await appointment.createAppointment(
        newAppointment,
      );
      setAppointments([...appointments, createdAppointment]);
    } catch (err) {
      console.error("Failed to create appointment:", err);
    }
  };

  const getDoctorName = (doctorId: number) => {
    const doctor = doctors.find((d) => d.userId === doctorId);
    return doctor
      ? `${doctor.user.firstName} ${doctor.user.lastName}`
      : "Unknown";
  };

  if (loading) return <div>Loading appointments...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Button onClick={onBack} variant="outline">
          Back to Dashboard
        </Button>
        <Button onClick={() => setIsNewAppointmentModalOpen(true)}>
          Book New Appointment
        </Button>
      </div>
      <Input
        type="text"
        placeholder="Search appointments..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={() => handleSort("date")}
              className="cursor-pointer"
            >
              Date
            </TableHead>
            <TableHead
              onClick={() => handleSort("time")}
              className="cursor-pointer"
            >
              Time
            </TableHead>
            <TableHead
              onClick={() => handleSort("type")}
              className="cursor-pointer"
            >
              Type
            </TableHead>
            <TableHead
              onClick={() => handleSort("doctorId")}
              className="cursor-pointer"
            >
              Doctor
            </TableHead>
            <TableHead
              onClick={() => handleSort("status")}
              className="cursor-pointer"
            >
              Status
            </TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAppointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>
                {new Date(appointment.date).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(appointment.time).toLocaleTimeString()}
              </TableCell>
              <TableCell>{appointment.type.type}</TableCell>
              <TableCell>{getDoctorName(appointment.doctorId)}</TableCell>
              <TableCell>{appointment.status.status}</TableCell>
              <TableCell>{appointment.additionalNotes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <NewAppointmentModal
        isOpen={isNewAppointmentModalOpen}
        onClose={() => setIsNewAppointmentModalOpen(false)}
        onSubmit={handleNewAppointment}
        actionId={actionId}
        doctors={doctors}
      />
    </div>
  );
}
