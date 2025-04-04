"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertCircle, Calendar, Clock } from "lucide-react";
import { formatDate, formatTime } from "@/lib/utils";
import { RescheduleModal } from "./reschedule-modal";
import { ConfirmationDialog } from "./confirmation-dialog";
import { appointment } from "@/app/api";

interface User {
  firstName: string;
  lastName: string;
}

interface Doctor {
  userId: number;
  user: User;
}

interface AppointmentType {
  type: string;
}

interface Action {
  appointmentType: AppointmentType;
}

interface Appointment {
  id: number;
  date: string;
  time: string;
  doctor: Doctor;
  action: Action;
  status: {
    status: string;
  };
  doctorId: number;
  additionalNotes: string;
}
interface HistoryProps {
  patientId: number | undefined;
}

export function Upcoming({ patientId }: HistoryProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] =
    useState<boolean>(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState<boolean>(false);
  useEffect(() => {
    async function fetchAppointments() {
      try {
        const appointmetnData = await appointment.getAppointmentsByPatientId(
          patientId!
        );
        const upcomingAppointments = appointmetnData.appointments;
        setAppointments(
          upcomingAppointments.filter(
            (app: Appointment) => app.status.status === "UPCOMING"
          )
        );
        console.log("upcomingapppointments", upcomingAppointments);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    }
    fetchAppointments();
  }, []);

  const handleReschedule = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsRescheduleModalOpen(true);
  };

  const handleCancelAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsCancelDialogOpen(true);
  };

  const confirmReschedule = (updatedAppointment: Appointment) => {
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== updatedAppointment.id
    );
    setAppointments(updatedAppointments);
    setIsRescheduleModalOpen(false);
    setSelectedAppointment(null);
  };
  const confirmCancel = () => {
    try {
      if (selectedAppointment) {
        appointment.deleteAppointment(selectedAppointment.id);
        const updatedAppointments = appointments.filter(
          (appointment) => appointment.id !== selectedAppointment.id
        );
        setAppointments(updatedAppointments);
        setIsCancelDialogOpen(false);
        setSelectedAppointment(null);
      }
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>
          Your scheduled appointments that are coming up.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {appointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium">No upcoming appointments</h3>
            <p className="text-muted-foreground max-w-md mt-2">
              You don't have any upcoming appointments scheduled at the moment.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {formatDate(appointment.date)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {formatTime(appointment.time)}
                    </div>
                  </TableCell>
                  <TableCell>
                    Dr. {appointment.doctor.user.firstName}{" "}
                    {appointment.doctor.user.lastName}
                  </TableCell>
                  <TableCell>
                    {appointment.action.appointmentType.type.replace("_", " ")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReschedule(appointment)}
                      >
                        Reschedule
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancelAppointment(appointment)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {selectedAppointment && (
        <RescheduleModal
          isOpen={isRescheduleModalOpen}
          onClose={() => setIsRescheduleModalOpen(false)}
          appointmentSelected={selectedAppointment}
          onReschedule={confirmReschedule}
        />
      )}

      <ConfirmationDialog
        isOpen={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        onConfirm={confirmCancel}
        title="Cancel Appointment"
        description="Are you sure you want to cancel this appointment? This action cannot be undone."
      />
    </Card>
  );
}
