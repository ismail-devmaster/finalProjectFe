"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { appointmentType } from "@/app/api/appointmentType";
import { action } from "@/app/api/action";

export function CreateActionModal({
  isOpen,
  onClose,
  patientId,
  onActionCreated,
}) {
  const [selectedAppointmentType, setSelectedAppointmentType] =
    useState(undefined);
  const [description, setDescription] = useState("");
  const [appointmentTypes, setAppointmentTypes] = useState([]);

  useEffect(() => {
    const fetchAppointmentTypes = async () => {
      try {
        const appointmentTypeData =
          await appointmentType.getAllAppointmentTypes();
        setAppointmentTypes(appointmentTypeData.appointmentTypes);
      } catch (error) {
        console.error("Failed to fetch appointment types:", error);
      }
    };

    fetchAppointmentTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await action.createAction({
        patientId,
        appointmentTypeId: Number(selectedAppointmentType),
        description,
      });
      onClose();
    } catch (error) {
      console.error("Failed to create action:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Action</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="appointmentType">Appointment Type</Label>
            <Select
              onValueChange={setSelectedAppointmentType}
              value={selectedAppointmentType}
            >
              <SelectTrigger>
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

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter action description"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Action</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
