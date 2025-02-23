"use client";

import { useState, useEffect } from "react";
import { PatientCard } from "@/components/patient-card";
import { AppointmentsView } from "@/components/appointments-view";
import { PaymentsView } from "@/components/payments-view";
import { action } from "@/app/api/action";
import { doctor } from "@/app/api/doctor";
import { Button } from "@/components/ui/button";
import { NewActionModal } from "@/components/new-action-modal";
import { patient } from "@/app/api/patient";

export function PatientDashboard() {
  const [selectedActionId, setSelectedActionId] = useState<number | null>(null);
  const [actions, setActions] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [patientId, setPatientId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNewActionModalOpen, setIsNewActionModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<
    "actions" | "appointments" | "payments"
  >("actions");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientIdData = await patient.getPatientId();
        setPatientId(patientIdData.patientId);
        const [actionsData, doctorsData] = await Promise.all([
          action.getActionsByPatientId(patientIdData.patientId),
          doctor.getAllDoctors(),
        ]);
        setActions(actionsData.actions);
        setDoctors(doctorsData.doctors);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNewAction = async (newAction: any) => {
    try {
      newAction.patientId = patientId;
      const createdAction = await action.createAction(newAction);
      const actionsData = await action.getActionsByPatientId(patientId!);
      setActions(actionsData.actions);
    } catch (err) {
      console.error("Failed to create action:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {viewMode === "actions" ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Actions</h2>
            <Button onClick={() => setIsNewActionModalOpen(true)}>
              New Action
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {actions.map((action) => (
              <PatientCard
                key={action.id}
                action={action}
                onViewAppointments={() => {
                  setSelectedActionId(action.id);
                  setViewMode("appointments");
                }}
                onViewPayments={() => {
                  setSelectedActionId(action.id);
                  setViewMode("payments");
                }}
              />
            ))}
          </div>
          <NewActionModal
            isOpen={isNewActionModalOpen}
            onClose={() => setIsNewActionModalOpen(false)}
            onSubmit={handleNewAction}
          />
        </>
      ) : viewMode === "appointments" ? (
        <AppointmentsView
          actionId={selectedActionId!}
          doctors={doctors}
          onBack={() => {
            setSelectedActionId(null);
            setViewMode("actions");
          }}
        />
      ) : (
        <PaymentsView
          actionId={selectedActionId!}
          onBack={() => {
            setSelectedActionId(null);
            setViewMode("actions");
          }}
        />
      )}
    </div>
  );
}
