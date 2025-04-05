"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Appointment, Doctor } from "../types";
import { useState } from "react";

interface EditAppointmentDialogProps {
  appointment: Appointment;
  doctors: Doctor[];
  onSubmit: (appointment: Appointment) => void;
  onClose: () => void;
}

export function EditAppointmentDialog({
  appointment,
  doctors,
  onSubmit,
  onClose,
}: EditAppointmentDialogProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Appointment</DialogTitle>
        <DialogDescription>
          Update the appointment details below.
        </DialogDescription>
      </DialogHeader>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setSuccessMessage(null);
          setErrorMessage(null);

          try {
            const formData = new FormData(e.target as HTMLFormElement);
            const updatedAppointment = {
              ...appointment,
              doctorId: Number.parseInt(formData.get("doctorId") as string),
              date: formData.get("date") as string,
              time: formData.get("time") as string,
              additionalNotes: formData.get("additionalNotes") as string,
            };

            await onSubmit(updatedAppointment);
            setSuccessMessage("Appointment updated successfully!");

            // Hide success message after 2 seconds
            setTimeout(() => {
              setSuccessMessage(null);
              onClose();
            }, 1500);
          } catch (error) {
            const errorMsg =
              error instanceof Error
                ? error.message
                : "Failed to update appointment";
            setErrorMessage(errorMsg);
            setTimeout(() => {
              setErrorMessage(null);
              onClose();
            }, 1000);
          }
        }}
      >
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-doctorId" className="text-right">
              Doctor
            </Label>
            <Select
              name="doctorId"
              defaultValue={appointment.doctorId.toString()}
              required
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem
                    key={doctor.userId}
                    value={doctor.userId.toString()}
                  >
                    {`${doctor.user.firstName} ${doctor.user.lastName}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-date" className="text-right">
              Date
            </Label>
            <Input
              id="edit-date"
              name="date"
              type="date"
              defaultValue={appointment.date.split("T")[0]}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-time" className="text-right">
              Time
            </Label>
            <Input
              id="edit-time"
              name="time"
              type="time"
              defaultValue={appointment.time.split("T")[1].slice(0, 5)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-notes" className="text-right">
              Additional Notes
            </Label>
            <Textarea
              id="edit-notes"
              name="additionalNotes"
              defaultValue={appointment.additionalNotes}
              className="col-span-3"
              placeholder="Optional additional notes"
            />
          </div>
        </div>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {errorMessage}
          </div>
        )}

        <DialogFooter>
          <Button type="submit">Update Appointment</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
