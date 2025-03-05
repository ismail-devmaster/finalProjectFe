"use client";

import type React from "react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TimePicker } from "../components/time-picker";
import { Label } from "@/components/ui/label";
import { appointment } from "@/app/api/appointment";

export function BookAppointmentModal({
  isOpen,
  onClose,
  patientId,
  onAppointmentBooked,
  action,
  doctors,
}) {
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [time, setTime] = useState<string>("00:00");
  const [doctorId, setDoctorId] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await appointment.createAppointment({
        actionId: action.id,
        patientId,
        date,
        time,
        doctorId: Number(doctorId),
        statusId: 1, // Assuming 1 is for "WAITING" status
        additionalNotes,
      });
      onAppointmentBooked();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <h2 className="text-2xl font-semibold mb-6">Book New Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
          <div className="space-y-2">
            <Label htmlFor="doctor">Select Doctor</Label>
            <Select onValueChange={setDoctorId} value={doctorId}>
              <SelectTrigger>
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem
                    key={doctor.userId}
                    value={doctor.userId.toString()}
                  >
                    Dr. {doctor.user.firstName} {doctor.user.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Any additional information for your visit"
              className="min-h-[120px]"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-black text-white hover:bg-black/90"
            >
              Confirm Appointment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
