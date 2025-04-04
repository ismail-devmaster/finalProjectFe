import { useEffect, useState } from "react";
import { patient } from "@/app/api";
interface PatientIdResponse {
  patientId: number;
}

interface UseAppointmentsReturn {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  patientId?: number;
}

export function useAppointments(): UseAppointmentsReturn {
  const [activeTab, setActiveTab] = useState<string>("book-new");
  const [patientId, setPatientId] = useState<number | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      try {
        const patientIdData: PatientIdResponse = await patient.getPatientId();
        setPatientId(patientIdData.patientId);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchData();
  }, []);

  return { activeTab, setActiveTab, patientId };
}
