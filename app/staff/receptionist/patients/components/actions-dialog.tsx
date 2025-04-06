"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import AppointmentsDialog from "./appointments-dialog";
import PaymentsDialog from "./payments-dialog";
import { appointment } from "@/app/api";
import { payment } from "@/app/api";
import { Calendar, CreditCard, ClipboardList, Loader2 } from "lucide-react";

interface Action {
  id: number;
  appointmentTypeId: number;
  patientId: number;
  description: string;
  totalPayment: number;
  startDate: string;
  endDate: string | null;
  appointmentType: {
    id: number;
    type: string;
  };
}

export interface ActionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
  actions: Action[];
}

interface AppointmentData {
  id?: number;
  date: string;
  time: string;
  patientId: number;
  doctorId: number;
  status?: string;
}

interface Payment {
  id: number;
  amount: number;
  status: "pending" | "completed" | "failed";
  createdAt: string;
  updatedAt?: string;
  userId: number;
  method: string;
}

interface Appointment {
  id: number;
  doctor: { user: { firstName: string; lastName: string } };
  status: { status: string };
  date: string;
  time: string;
  additionalNotes?: string;
}

interface PaymentDialog {
  id: number;
  doctor: { user: { firstName: string; lastName: string } };
  status: { status: string };
  date: string;
  time: string;
  description: string;
  amount: number;
}

export default function ActionsDialog(
  props: ActionsDialogProps
): React.ReactElement {
  const { isOpen, onClose, patientName, actions } = props;

  const [selectedAction, setSelectedAction] = React.useState<Action | null>(
    null
  );
  const [showPayments, setShowPayments] = React.useState(false);
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const [payments, setPayments] = React.useState<PaymentDialog[]>([]);
  const [loading, setLoading] = React.useState(false);

  function handleViewAppointments(action: Action): void {
    setLoading(true);
    appointment
      .getAppointmentsByActionId(action.id)
      .then((response): void => {
        if (response.data) {
          const mappedAppointments: Appointment[] = response.data.map(
            (appointment: AppointmentData) => ({
              id: appointment.id || 0,
              doctor: { user: { firstName: "Unknown", lastName: "Doctor" } },
              status: { status: appointment.status || "unknown" },
              date: appointment.date,
              time: appointment.time,
              additionalNotes: "",
            })
          );
          setAppointments(mappedAppointments);
          setSelectedAction(action);
          setShowPayments(false);
        } else {
          console.error("No data found in response");
        }
      })
      .catch((error: Error): void => {
        console.error("Error fetching appointments", error);
      })
      .finally((): void => {
        setLoading(false);
      });
  }

  function handleViewPayments(action: Action): void {
    setLoading(true);
    payment
      .getPaymentsByActionId(action.id)
      .then((response: Payment[]): void => {
        const mappedPayments: PaymentDialog[] = response.map(
          (payment: Payment) => ({
            id: payment.id,
            doctor: { user: { firstName: "Unknown", lastName: "Doctor" } },
            status: { status: payment.status },
            date: payment.createdAt,
            time: "00:00",
            description: `Payment for action ${action.id}`,
            amount: payment.amount,
          })
        );
        setPayments(mappedPayments);
        setSelectedAction(action);
        setShowPayments(true);
      })
      .catch((error: Error): void => {
        console.error("Error fetching payments", error);
      })
      .finally((): void => {
        setLoading(false);
      });
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Treatment History
            </DialogTitle>
            <DialogDescription>
              All treatments for patient{" "}
              <span className="font-medium">{patientName}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {actions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No treatment records found for this patient
              </div>
            ) : (
              actions.map(
                (action: Action): React.ReactElement => (
                  <Card
                    key={action.id}
                    className="overflow-hidden border-l-4 border-l-sky-500 hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="grid gap-4">
                        <div className="flex items-center gap-2">
                          <div className="bg-sky-100 text-sky-700 p-2 rounded-full">
                            <ClipboardList className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {action.appointmentType.type}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Started on{" "}
                              {new Date(action.startDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {action.description && (
                          <div className="bg-muted/50 p-3 rounded-md text-sm">
                            <span className="font-medium">Description:</span>{" "}
                            {action.description}
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 mt-2">
                          <Button
                            variant="outline"
                            className="flex items-center gap-2 hover:bg-sky-50 hover:text-sky-700"
                            onClick={(): void => handleViewAppointments(action)}
                          >
                            <Calendar className="h-4 w-4" />
                            View Appointments
                          </Button>
                          <Button
                            variant="outline"
                            className="flex items-center gap-2 hover:bg-emerald-50 hover:text-emerald-700"
                            onClick={(): void => handleViewPayments(action)}
                          >
                            <CreditCard className="h-4 w-4" />
                            View Payments
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              )
            )}
          </div>
          {loading && (
            <div className="flex justify-center py-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading data...</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {selectedAction && !showPayments && (
        <AppointmentsDialog
          isOpen={!!selectedAction}
          onCloseAction={(): void => setSelectedAction(null)}
          appointments={appointments}
        />
      )}

      {selectedAction && showPayments && (
        <PaymentsDialog
          isOpen={!!selectedAction}
          onCloseAction={(): void => setSelectedAction(null)}
          payments={payments}
        />
      )}
    </>
  );
}
