"use client";

import { format } from "date-fns";
import { Edit } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { Appointment, Doctor } from "../types";
import { EditAppointmentDialog } from "./edit-appointment-dialog";

interface AppointmentTableProps {
  appointments: Appointment[];
  doctors: Doctor[];
  onEdit: (appointment: Appointment) => void;
  onRemove: (id: number) => void;
}

export function AppointmentTable({
  appointments,
  doctors,
  onEdit,
  onRemove,
}: AppointmentTableProps) {
  return (
    <ScrollArea className="h-[400px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Doctor Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{`${appointment.patient.user.firstName} ${appointment.patient.user.lastName}`}</TableCell>
              <TableCell>{`${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}`}</TableCell>
              <TableCell>{appointment.action.appointmentType.type}</TableCell>
              <TableCell>
                {`${format(new Date(appointment.date), "dd/MM/yyyy")} ${format(
                  new Date(appointment.time),
                  "HH:mm"
                )}`}
              </TableCell>
              <TableCell className="space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  </DialogTrigger>
                  <EditAppointmentDialog
                    appointment={appointment}
                    doctors={doctors}
                    onSubmit={onEdit}
                    onClose={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))}
                  />
                </Dialog>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onRemove(appointment.id)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
