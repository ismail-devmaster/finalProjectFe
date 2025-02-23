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
import type {
  AppointmentFormData,
  Doctor,
  Patient,
  AppointmentType,
} from "../types";

interface AddAppointmentDialogProps {
  patients: Patient[];
  doctors: Doctor[];
  appointmentTypes: AppointmentType[];
  onSubmit: (data: AppointmentFormData) => void;
}

export function AddAppointmentDialog({
  patients,
  doctors,
  appointmentTypes,
  onSubmit,
}: AddAppointmentDialogProps) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Appointment</DialogTitle>
        <DialogDescription>
          Enter the details for the new appointment.
        </DialogDescription>
      </DialogHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          onSubmit(
            Object.fromEntries(formData) as unknown as AppointmentFormData
          );
        }}
      >
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="patientId" className="text-right">
              Patient
            </Label>
            <Select name="patientId" required>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((patient) => (
                  <SelectItem
                    key={patient.userId}
                    value={patient.userId.toString()}
                  >
                    {`${patient.user.firstName} ${patient.user.lastName}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="doctorId" className="text-right">
              Doctor
            </Label>
            <Select name="doctorId" required>
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
            <Label htmlFor="appointmentTypeId" className="text-right">
              Appointment Type
            </Label>
            <Select name="appointmentTypeId" required>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select appointment type" />
              </SelectTrigger>
              <SelectContent>
                {appointmentTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id.toString()}>
                    {type.type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Input
              id="date"
              name="date"
              type="date"
              className="col-span-3"
              required
              min={today}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Time
            </Label>
            <Input
              id="time"
              name="time"
              type="time"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="additionalNotes" className="text-right">
              Additional Notes
            </Label>
            <Textarea
              id="additionalNotes"
              name="additionalNotes"
              className="col-span-3"
              placeholder="Optional additional notes"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add Appointment</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
