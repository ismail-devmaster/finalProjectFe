"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import {
  Calendar,
  ClipboardList,
  CreditCard,
  User,
  Loader2,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
}

interface Action {
  id: number;
  patientId: number;
  totalPayment: number;
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
  const [isAppointmentsDialogOpen, setIsAppointmentsDialogOpen] =
    useState(false);
  const [isPaymentsDialogOpen, setIsPaymentsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);

  useEffect(() => {
    const fetchPatientActions = async () => {
      if (!patient) return;
      setLoading(true);
      try {
        // const res = await action.getActionsByPatientId(patient.user.id);
        const res = await action.getAllActions();
        setPatientActions(res.actions);
      } catch (err) {
        console.error("Failed to fetch patient actions:", err);
      } finally {
        setLoading(false);
      }
    };
    if (patient) {
      fetchPatientActions();
    }
  }, [patient?.id, patient]);

  const fetchAppointments = async (actionId: number, action: Action) => {
    setLoading(true);
    try {
      const res = await appointment.getAppointmentsByActionId(actionId);
      setAppointments(res.appointments);
      setSelectedAction(action);
      setIsAppointmentsDialogOpen(true);
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPayments = async (actionId: number, action: Action) => {
    setLoading(true);
    try {
      const res = await payment.getPaymentsByActionId(actionId);
      setPayments(res.payments);
      setSelectedAction(action);
      setIsPaymentsDialogOpen(true);
    } catch (err) {
      console.error("Failed to fetch payments:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Treatment History
          </DialogTitle>
          <DialogDescription>
            {patient && (
              <>
                All treatments for patient{" "}
                <span className="font-medium">
                  {patient.firstName} {patient.lastName}
                </span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        {patient && (
          <div className="flex items-center gap-3 mt-2 mb-4">
            <div className="bg-sky-100 text-sky-700 p-3 rounded-full">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                {patient.firstName} {patient.lastName}
              </h3>
            </div>
          </div>
        )}

        <Separator />

        <ScrollArea className="flex-grow mt-4">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 text-sky-500 animate-spin" />
                <p className="text-muted-foreground">
                  Loading treatment history...
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 p-2">
              {patientActions.length > 0 ? (
                patientActions.map((action) => (
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
                              {format(
                                new Date(action.startDate),
                                "MMMM d, yyyy"
                              )}
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
                            size="sm"
                            className="flex items-center gap-2 hover:bg-sky-50 hover:text-sky-700"
                            onClick={() => fetchAppointments(action.id, action)}
                          >
                            <Calendar className="h-4 w-4" />
                            View Appointments
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 hover:bg-emerald-50 hover:text-emerald-700"
                            onClick={() => fetchPayments(action.id, action)}
                          >
                            <CreditCard className="h-4 w-4" />
                            View Payments
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <ClipboardList className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No treatment records found for this patient.
                  </p>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        <AppointmentsDialog
          open={isAppointmentsDialogOpen}
          onOpenChange={setIsAppointmentsDialogOpen}
          appointments={appointments}
          actionTitle={selectedAction?.appointmentType.type || ""}
        />

        <PaymentsDialog
          open={isPaymentsDialogOpen}
          onOpenChange={setIsPaymentsDialogOpen}
          payments={payments}
          totalPayment={selectedAction?.totalPayment}
          actionTitle={selectedAction?.appointmentType.type || ""}
        />
      </DialogContent>
    </Dialog>
  );
}
