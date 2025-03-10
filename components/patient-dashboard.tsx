"use client";

import { useEffect, useState } from "react";
import { PatientCard } from "@/components/patient-card";
import { action } from "@/app/api";
import { Button } from "@/components/ui/button";
import { NewActionModal } from "@/components/new-action-modal";
import { patient } from "@/app/api";

export function PatientDashboard() {
  const [actions, setActions] = useState<any[]>([]);
  const [patientId, setPatientId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNewActionModalOpen, setIsNewActionModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientIdData = await patient.getPatientId();
        setPatientId(patientIdData.patientId);
        const actionsData = await action.getActionsByPatientId(
          patientIdData.patientId,
        );
        setActions(actionsData.actions);
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Actions</h2>
        <Button onClick={() => setIsNewActionModalOpen(true)}>
          New Action
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action) => <PatientCard
          key={action.id}
          action={action}
        />)}
      </div>
      <NewActionModal
        isOpen={isNewActionModalOpen}
        onClose={() => setIsNewActionModalOpen(false)}
        onSubmit={handleNewAction}
      />
    </div>
  );
}
