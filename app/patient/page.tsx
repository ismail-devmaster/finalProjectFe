"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { action, patient, payment } from "@/app/api";
import { useEffect } from "react";
import Overview from "@/components/sections/patient/Overview";

type PersonalInfoType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  patientId: string;
  medicalHistory: string;
};
export default function Page() {
  const [profileInfo, setProfileInfo] = useState<PersonalInfoType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNewPatient] = useState(false);
  const [actions, setActions] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [selectedAction, setSelectedAction] = useState<number | null>(null);

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
  console.log(actions);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await patient.getPatientData();
        if (response?.patientData) {
          const { user, medicalHistory } = response.patientData;
          setProfileInfo({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            dob: new Date(user.dateOfBirth).toISOString().split("T")[0],
            address: "", // Placeholder until actual data is available
            patientId: user.id.toString(),
            medicalHistory: medicalHistory || "No medical history available.",
          });
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPatientData();
  }, []);

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  const mockData = {
    profile: {
      name: "John Doe",
      dob: "05/15/1985",
      phone: "+1 (555) 123-4567",
      email: "john.doe@example.com",
      address: "123 Main St, Anytown, USA",
    },
    appointments: {
      upcoming: [
        "Cleaning: June 15, 2023 at 10:00 AM",
        "Check-up: August 22, 2023 at 2:30 PM",
      ],
      past: [
        "Check-up: March 3, 2023 at 2:30 PM",
        "Filling: January 12, 2023 at 11:00 AM",
      ],
    },
    records: {
      procedures: [
        "Filling (Tooth #18): January 12, 2023",
        "Root Canal (Tooth #30): November 5, 2022",
      ],
      allergies: "Penicillin, Latex",
    },
    payments: {
      transactions: [
        "$150 - Check-up (March 3, 2023)",
        "$300 - Filling (January 12, 2023)",
      ],
      balance: "$75",
      balanceColor: "text-red-500",
    },
    queue: {
      waitTime: "15 min",
      appointment: "10:00 AM",
      estimatedStart: "10:05 AM",
    },
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Quick Actions Overview
          </CardTitle>
        </CardHeader>
        <Overview
          mockData={mockData}
          isNewPatient={isNewPatient}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      </Card>
    </div>
  );
}

