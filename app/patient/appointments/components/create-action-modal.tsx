<<<<<<< HEAD
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { appointmentType } from "@/app/api/appointmentType"
import { action } from "@/app/api/action"

interface AppointmentType {
  id: number
  type: string
}

interface CreateActionModalProps {
  isOpen: boolean
  onClose: () => void
  patientId: number | undefined
  onActionCreated: (newAction: any) => void
}

interface ActionData {
  patientId: number | undefined
  appointmentTypeId: number
  description: string
}
export function CreateActionModal({ isOpen, onClose, patientId, onActionCreated }: CreateActionModalProps) {
  const [selectedAppointmentType, setSelectedAppointmentType] = useState<string | undefined>(undefined)
  const [description, setDescription] = useState<string>("")
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>([])
=======
"use client";

import type React from "react";
import { useEffect, useState } from "react";
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
import { appointmentType } from "@/app/api";
import { action } from "@/app/api";

interface AppointmentType {
  id: number;
  type: string;
}

interface CreateActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: number | undefined;
  onActionCreated: (newAction: any) => void;
}

interface ActionData {
  patientId: number | undefined;
  appointmentTypeId: number;
  description: string;
}
export function CreateActionModal(
  { isOpen, onClose, patientId, onActionCreated }: CreateActionModalProps,
) {
  const [selectedAppointmentType, setSelectedAppointmentType] = useState<
    string | undefined
  >(undefined);
  const [description, setDescription] = useState<string>("");
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>(
    [],
  );
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95

  useEffect(() => {
    const fetchAppointmentTypes = async () => {
      try {
<<<<<<< HEAD
        const appointmentTypeData = await appointmentType.getAllAppointmentTypes()
        setAppointmentTypes(appointmentTypeData.appointmentTypes)
      } catch (error) {
        console.error("Failed to fetch appointment types:", error)
      }
    }

    fetchAppointmentTypes()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!selectedAppointmentType || patientId === undefined) return
=======
        const appointmentTypeData = await appointmentType
          .getAllAppointmentTypes();
        setAppointmentTypes(appointmentTypeData.appointmentTypes);
      } catch (error) {
        console.error("Failed to fetch appointment types:", error);
      }
    };

    fetchAppointmentTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!selectedAppointmentType || patientId === undefined) return;
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95

      const actionData: ActionData = {
        patientId,
        appointmentTypeId: Number(selectedAppointmentType),
        description,
<<<<<<< HEAD
      }

      const newAction = await action.createAction(actionData)
      onActionCreated(newAction)
      onClose()
    } catch (error) {
      console.error("Failed to create action:", error)
    }
  }
=======
      };

      const newAction = await action.createAction(actionData);
      onActionCreated(newAction);
      onClose();
    } catch (error) {
      console.error("Failed to create action:", error);
    }
  };
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Action</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="appointmentType">Appointment Type</Label>
<<<<<<< HEAD
            <Select onValueChange={setSelectedAppointmentType} value={selectedAppointmentType}>
=======
            <Select
              onValueChange={setSelectedAppointmentType}
              value={selectedAppointmentType}
            >
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95
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
<<<<<<< HEAD
  )
}

=======
  );
}
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95
