<<<<<<< HEAD
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, AlertCircle } from "lucide-react"
import { formatDate, formatTime } from "@/lib/utils"
import { RescheduleModal } from "../components/reschedule-modal"
import { ConfirmationDialog } from "../components/confirmation-dialog"
import { appointment } from "@/app/api/appointment"

interface User {
  firstName: string
  lastName: string
}

interface Doctor {
  user: User
}

interface AppointmentType {
  type: string
}

interface Action {
  appointmentType: AppointmentType
}

interface Appointment {
  id: number
  date: string
  time: string
  doctor: Doctor
  action: Action
  doctorId: number
  additionalNotes: string
}

export function Waiting() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState<boolean>(false)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState<boolean>(false)
=======
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
import { RescheduleModal } from "../components/reschedule-modal";
import { ConfirmationDialog } from "../components/confirmation-dialog";
import { appointment } from "@/app/api";

interface User {
  firstName: string;
  lastName: string;
}

interface Doctor {
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
  doctorId: number;
  additionalNotes: string;
}

export function Waiting() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<
    Appointment | null
  >(null);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState<boolean>(
    false,
  );
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState<boolean>(false);
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95

  useEffect(() => {
    async function fetchAppointments() {
      try {
<<<<<<< HEAD
        const appointmentData = await appointment.getAppointmentsWithWaitingStatus()
        const waitingAppointments = appointmentData.appointments
        setAppointments(waitingAppointments)
      } catch (error) {
        console.error("Failed to fetch appointments:", error)
      }
    }
    fetchAppointments()
  }, [])

  const handleReschedule = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsRescheduleModalOpen(true)
  }

  const handleCancelAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsCancelDialogOpen(true)
  }

  const confirmReschedule = (updatedAppointment: Appointment) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === updatedAppointment.id ? updatedAppointment : appointment,
    )
    setAppointments(updatedAppointments)
    setIsRescheduleModalOpen(false)
    setSelectedAppointment(null)
  }
=======
        const appointmentData = await appointment
          .getAppointmentsWithWaitingStatus();
        const waitingAppointments = appointmentData.appointments;
        setAppointments(waitingAppointments);
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
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === updatedAppointment.id
        ? updatedAppointment
        : appointment
    );
    setAppointments(updatedAppointments);
    setIsRescheduleModalOpen(false);
    setSelectedAppointment(null);
  };
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95

  const confirmCancel = async () => {
    try {
      if (selectedAppointment) {
<<<<<<< HEAD
        await appointment.deleteAppointment(selectedAppointment.id)
        const updatedAppointments = appointments.filter((appointment) => appointment.id !== selectedAppointment.id)
        setAppointments(updatedAppointments)
        setIsCancelDialogOpen(false)
        setSelectedAppointment(null)
      }
    } catch (error) {
      console.error("Failed to cancel appointment:", error)
    }
  }
=======
        await appointment.deleteAppointment(selectedAppointment.id);
        const updatedAppointments = appointments.filter((appointment) =>
          appointment.id !== selectedAppointment.id
        );
        setAppointments(updatedAppointments);
        setIsCancelDialogOpen(false);
        setSelectedAppointment(null);
      }
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
    }
  };
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95

  return (
    <Card>
      <CardHeader>
        <CardTitle>Waiting Appointments</CardTitle>
<<<<<<< HEAD
        <CardDescription>Appointments that are currently in the waiting queue.</CardDescription>
      </CardHeader>
      <CardContent>
        {appointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium">No waiting appointments</h3>
            <p className="text-muted-foreground max-w-md mt-2">
              You don't have any appointments in the waiting queue at the moment.
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
                    Dr. {appointment.doctor.user.firstName} {appointment.doctor.user.lastName}
                  </TableCell>
                  <TableCell>{appointment.action.appointmentType.type.replace("_", " ")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleReschedule(appointment)}>
                        Reschedule
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleCancelAppointment(appointment)}>
                        Cancel
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
=======
        <CardDescription>
          Appointments that are currently in the waiting queue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {appointments.length === 0
          ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium">No waiting appointments</h3>
              <p className="text-muted-foreground max-w-md mt-2">
                You don't have any appointments in the waiting queue at the
                moment.
              </p>
            </div>
          )
          : (
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
                      {appointment.action.appointmentType.type.replace(
                        "_",
                        " ",
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleReschedule(appointment)}
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
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95
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
<<<<<<< HEAD
  )
}

=======
  );
}
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95
