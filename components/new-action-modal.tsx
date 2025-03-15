"use client";

import type React from "react";

import { useEffect, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { appointmentType } from "@/app/api";
interface NewActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (action: any) => void;
}

interface AppointmentType {
  id: number;
  type: string;
}

export function NewActionModal({
  isOpen,
  onClose,
  onSubmit,
}: NewActionModalProps) {
  const [description, setDescription] = useState("");
  const [appointmentTypeId, setAppointmentTypeId] = useState<string>("");
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointmentTypes = async () => {
      try {
        const data = await appointmentType.getAllAppointmentTypes();
        setAppointmentTypes(data.appointmentTypes || data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch appointment types:", err);
        setError("Failed to load appointment types. Please try again.");
        setLoading(false);
      }
    };

    fetchAppointmentTypes();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description && appointmentTypeId) {
      onSubmit({
        description,
        appointmentTypeId: Number(appointmentTypeId),
      });
      onClose();
    }
  };

  if (loading) return <div>Loading appointment types...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Action</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="appointmentType" className="text-right">
                Appointment Type
              </Label>
              <Select
                onValueChange={setAppointmentTypeId}
                value={appointmentTypeId}
              >
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
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
