"use client";

import type React from "react";

import { useEffect, useState } from "react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimePicker } from "./time-picker";
import { appointment } from "@/app/api";
import { doctor } from "@/app/api";

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
  doctorId: number;
  additionalNotes: string;
  date: string;
  time: string;
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
  doctorId: number;
  additionalNotes: string;
  statusId: number;
}

export function RescheduleModal(
  { isOpen, onClose, appointmentSelected, onReschedule }: RescheduleModalProps,
) {
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const [time, setTime] = useState<string>("00:00");
  const [selectedDoctor, setSelectedDoctor] = useState<number>(
    appointmentSelected ? appointmentSelected.doctorId : 1,
  );
  const [notes, setNotes] = useState<string>(
    appointmentSelected ? appointmentSelected.additionalNotes : "",
  );
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!appointmentSelected) return;
      const updateData: AppointmentUpdateData = {
        date: date,
        time: time,
        doctorId: selectedDoctor,
        additionalNotes: notes,
        statusId: 1, // Assuming 1 is for "WAITING" status
      };

      await appointment.updateAppointment(appointmentSelected.id, updateData);
      // Create a new appointment object with updated values
      const updatedAppointment = {
        ...appointmentSelected,
        date: date,
        time: new Date(`1970-01-01T${time}:00.000Z`).toISOString(),
        doctorId: selectedDoctor,
        additionalNotes: notes,
      };

      onReschedule(updatedAppointment);
      onClose();
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
    }
  };
  useEffect(() => {
    async function fetchDoctors() {
      try {
        const doctorsData = await doctor.getAllDoctors();
        setDoctors(doctorsData.doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    }
    fetchDoctors();
  }, []);
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
              <Label htmlFor="doctor">Doctor</Label>
              <Select
                value={selectedDoctor.toString()}
                onValueChange={(value) =>
                  setSelectedDoctor(Number.parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doc) => (
                    <SelectItem key={doc.userId} value={doc.userId.toString()}>
                      Dr. {doc.user.firstName} {doc.user.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
