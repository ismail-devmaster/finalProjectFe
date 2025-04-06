"use client";
import type * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, User } from "lucide-react";

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

export default function AppointmentsDialog(
  props: AppointmentsDialogProps
): React.ReactElement {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onCloseAction}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Appointments</DialogTitle>
          <DialogDescription>
            Appointment details for this treatment
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {props.appointments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No appointment records found
            </div>
          ) : (
            props.appointments.map(
              (appointment: Appointment): React.ReactElement => (
                <Card
                  key={appointment.id}
                  className="overflow-hidden border-l-4 border-l-violet-500"
                >
                  <CardContent className="p-6">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-violet-500" />
                          <span className="font-semibold text-lg">
                            Dr. {appointment.doctor.user.firstName}{" "}
                            {appointment.doctor.user.lastName}
                          </span>
                        </div>
                        <Badge
                          variant={
                            appointment.status.status === "Completed"
                              ? "success"
                              : appointment.status.status === "Scheduled"
                              ? "secondary"
                              : appointment.status.status === "Cancelled"
                              ? "destructive"
                              : "outline"
                          }
                        >
                          {appointment.status.status}
                        </Badge>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(appointment.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(appointment.time).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                      {appointment.additionalNotes && (
                        <div className="bg-muted/50 p-3 rounded-md text-sm mt-2">
                          <span className="font-medium">Notes:</span>{" "}
                          {appointment.additionalNotes}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
