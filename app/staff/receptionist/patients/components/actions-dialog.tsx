"use client";

export default function ActionsDialog(
  props: ActionsDialogProps,
): React.ReactElement {
  const { isOpen, onClose, patientName, actions } = props;

  const [selectedAction, setSelectedAction] = React.useState<Action | null>(
    null,
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
          const mappedAppointments: Appointment[] = response.data.map((
            appointment: AppointmentData,
          ) => ({
            id: appointment.id || 0,
            doctor: { user: { firstName: "Unknown", lastName: "Doctor" } },
            status: { status: appointment.status || "unknown" },
            date: appointment.date,
            time: appointment.time,
            additionalNotes: "",
          }));
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
        const mappedPayments: PaymentDialog[] = response.map((
          payment: Payment,
        ) => ({
          id: payment.id,
          doctor: { user: { firstName: "Unknown", lastName: "Doctor" } },
          status: { status: payment.status },
          date: payment.createdAt,
          time: "00:00",
          description: `Payment for action ${action.id}`,
          amount: payment.amount,
        }));
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
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Actions History - {patientName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {actions.map((action: Action): React.ReactElement => (
              <Card key={action.id}>
                <CardContent className="pt-6">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <div className="font-semibold">
                        Action Type: {action.appointmentType.type}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Description: {action.description}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Date: {new Date(action.startDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={(): void =>
                          handleViewAppointments(action)}
                      >
                        View Appointments
                      </Button>
                      <Button
                        variant="outline"
                        onClick={(): void => handleViewPayments(action)}
                      >
                        View Payments
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {loading && <div>Loading...</div>}
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

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AppointmentsDialog from "./appointments-dialog";
import PaymentsDialog from "./payments-dialog";
import { appointment } from "@/app/api/appointment";
import { payment } from "@/app/api/payment";

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
