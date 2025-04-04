"use client";

import type React from "react";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TimePicker } from "@/components/ui/time-picker";
import { appointment } from "@/app/api";

interface User {
  firstName: string;
  lastName: string;
}

interface Doctor {
  userId: number;
  user: User;
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

interface Action {
  appointmentType: AppointmentType;
}

interface AppointmentType {
  type: string;
}

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentSelected: Appointment | null;
  onReschedule: (updatedAppointment: Appointment) => void;
}

interface AppointmentUpdateData {
  date: string;
  time: string;
  additionalNotes: string;
  statusId: number;
}

export function RescheduleModal({
  isOpen,
  onClose,
  appointmentSelected,
  onReschedule,
}: RescheduleModalProps) {
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [time, setTime] = useState<string>("00:00");
  const [notes, setNotes] = useState<string>(
    appointmentSelected ? appointmentSelected.additionalNotes : ""
  );
  const convertTo24HourFormat = (timeStr: string | null) => {
    if (!timeStr) return "00:00";

    const [time, period] = timeStr.split(" ");
    const [hours, minutes] = time.split(":");

    let hourNum = parseInt(hours);
    if (period === "PM" && hourNum < 12) {
      hourNum += 12;
    } else if (period === "AM" && hourNum === 12) {
      hourNum = 0;
    }

    return `${hourNum.toString().padStart(2, "0")}:${minutes}`;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!appointmentSelected) return;
      const updateData: AppointmentUpdateData = {
        date: date,
        time: convertTo24HourFormat(time),
        additionalNotes: notes,
        statusId: 1, // Assuming 1 is for "WAITING" status
      };
      await appointment.updateAppointment(appointmentSelected.id, updateData);
      // Create a new appointment object with updated values
      const updatedAppointment = {
        ...appointmentSelected,
        date: date,
        time: convertTo24HourFormat(time),
        additionalNotes: notes,
        doctor: appointmentSelected.doctor,
        action: appointmentSelected.action,
      };

      onReschedule(updatedAppointment);
      onClose();
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reschedule Appointment</DialogTitle>
          <DialogDescription>
            Update the appointment details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <input
                id="date"
                type="date"
                value={date}
                min={new Date().toISOString().split("T")[0]} // Prevent past dates
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <TimePicker value={time} onChange={setTime} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional information here..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
