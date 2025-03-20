"use client";

import { useEffect, useState } from "react";
import { action, patient, payment } from "@/app/api";

export function usePatientPayments() {
  const [actions, setActions] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [selectedAction, setSelectedAction] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const patientId = await patient.getPatientId();
        const actionData = await action.getActionsByPatientId(
          patientId.patientId,
        );
        setActions(actionData.actions);
      } catch (error) {
        console.error("Error fetching actions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActions();
  }, []);

  const handleViewDetails = async (actionId: number) => {
    setSelectedAction(actionId);
    setIsDialogOpen(true);
    try {
      const paymentsData = await payment.getPaymentsByActionId(actionId);
      setPayments(paymentsData.payments);
    } catch (error) {
      console.error("Error fetching payments:", error);
      setPayments([]);
    }
  };

  const actionDetails = selectedAction
    ? actions.find((action) => action.id === selectedAction)
    : null;

  return {
    actions,
    payments,
    selectedAction,
    isDialogOpen,
    isLoading,
    handleViewDetails,
    setIsDialogOpen,
    actionDetails,
  };
}
