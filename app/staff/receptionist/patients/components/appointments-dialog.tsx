"use client";
export default function AppointmentsDialog(
  props: AppointmentsDialogProps,
): React.ReactElement {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onCloseAction}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Appointments</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {props.appointments.map(
            function (appointment: Appointment): React.ReactElement {
              return (
                <Card key={appointment.id}>
                  <CardContent className="pt-6">
                    <div className="grid gap-3">
                      <div className="flex justify-between items-center">
                        <div className="font-semibold">
                          Dr. {appointment.doctor.user.firstName}{" "}
                          {appointment.doctor.user.lastName}
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {appointment.status.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div>
                          Date:{" "}
                          {new Date(appointment.date).toLocaleDateString()}
                        </div>
                        <div>
                          Time:{" "}
                          {new Date(appointment.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                      {appointment.additionalNotes && (
                        <div className="text-sm">
                          <span className="font-medium">Notes:</span>{" "}
                          {appointment.additionalNotes}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            },
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Appointment {
  id: number;
  doctor: { user: { firstName: string; lastName: string } };
  status: { status: string };
  date: string;
  time: string;
  additionalNotes?: string;
}

interface AppointmentsDialogProps {
  isOpen: boolean;
  onCloseAction: () => void;
  appointments: Appointment[];
}
