"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { action } from "@/app/api";
import { AppointmentsDialog } from "./appointments-dialog";
import { PaymentsDialog } from "./payments-dialog";
import { appointment } from "@/app/api";
import { payment } from "@/app/api";
import { Calendar, ClipboardList, CreditCard } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Patient {
  id: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

interface Action {
  id: number;
  patientId: number;
  appointmentType: {
    type: string;
  };
  description: string;
  startDate: string;
}

interface ActionHistoryDialogProps {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  patient: Patient | null;
}

export function ActionHistoryDialog({
  open,
  onOpenChangeAction: onOpenChange,
  patient,
}: ActionHistoryDialogProps) {
  const [patientActions, setPatientActions] = useState<Action[]>([]);
  const [appointments, setAppointments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [isAppointmentsDialogOpen, setIsAppointmentsDialogOpen] = useState(
    false,
  );
  const [isPaymentsDialogOpen, setIsPaymentsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPatientActions = async () => {
      if (!patient) return;
      try {
        // const res = await action.getActionsByPatientId(patient.user.id);
        const res = await action.getAllActions();
        setPatientActions(res.actions);
      } catch (err) {
        console.error("Failed to fetch patient actions:", err);
      }
    };
    if (patient) {
      fetchPatientActions();
    }
  }, [patient?.user.id, patient]);

  const fetchAppointments = async (actionId: number) => {
    try {
      const res = await appointment.getAppointmentsByActionId(actionId);
      setAppointments(res.appointments);
      setIsAppointmentsDialogOpen(true);
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
    }
  };

  const fetchPayments = async (actionId: number) => {
    try {
      const res = await payment.getPaymentsByActionId(actionId);
      setPayments(res.payments);
      setIsPaymentsDialogOpen(true);
    } catch (err) {
      console.error("Failed to fetch payments:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Actions History - {patient?.user.firstName} {patient?.user.lastName}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow">
          <div className="grid gap-6 p-6">
            {patientActions.length > 0
              ? (
                patientActions.map((action) => (
                  <Card
                    key={action.id}
                    className="overflow-hidden transition-shadow hover:shadow-md"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-primary">
                          {action.appointmentType.type}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {format(new Date(action.startDate), "MMMM d, yyyy")}
                        </span>
                      </div>
                      <p className="mb-4 text-gray-600">{action.description}</p>
                      <div className="flex space-x-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center space-x-2"
                          onClick={() => fetchAppointments(action.id)}
                        >
                          <Calendar className="w-4 h-4" />
                          <span>View Appointments</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center space-x-2"
                          onClick={() => fetchPayments(action.id)}
                        >
                          <CreditCard className="w-4 h-4" />
                          <span>View Payments</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )
              : (
                <div className="text-center py-8">
                  <ClipboardList className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    No actions found for this patient.
                  </p>
                </div>
              )}
          </div>
        </ScrollArea>
        <AppointmentsDialog
          open={isAppointmentsDialogOpen}
          onOpenChange={setIsAppointmentsDialogOpen}
          appointments={appointments}
        />
        <PaymentsDialog
          open={isPaymentsDialogOpen}
          onOpenChange={setIsPaymentsDialogOpen}
          payments={payments}
        />
      </DialogContent>
    </Dialog>
  );
}
