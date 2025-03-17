"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { action, patient } from "@/app/api";
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

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const patientId = await patient.getPatientId();
        const actionData = await action.getActionsByPatientId(patientId.patientId);
        setActions(actionData.actions || []);
      } catch (error) {
        console.error("Error fetching actions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActions();
  }, []);

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
            address: user.address || "there is no address", // Placeholder until actual data is available
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

  const fetchedDataValid = profileInfo && actions.length > 0;

  const mockData = fetchedDataValid
    ? {
      profile: {
        name: `${profileInfo.firstName} ${profileInfo.lastName}`,
        dob: profileInfo.dob,
        phone: profileInfo.phone,
        email: profileInfo.email,
        address: profileInfo.address,
      },
      appointments: actions.length
        ? {
          upcoming: actions.map((act) => act.description),
          past: [],
        }
        : { upcoming: [], past: [] },
      records: {
        procedures: [],
        allergies: "Cannot fetch data",
      },
      payments: payments.length
        ? {
          transactions: payments.map((pay) => `$${pay.amount} - ${pay.description}`),
          balance: "$0",
          balanceColor: "text-green-500",
        }
        : { transactions: [], balance: "Cannot fetch data", balanceColor: "text-red-500" },
      queue: {
        waitTime: "Cannot fetch data",
        appointment: "Canoot fetch data",
        estimatedStart: "Canoot fetch data",
      },
    }
    : {
      profile: {
        name: "Cannot fetch data",
        dob: "Cannot fetch data",
        phone: "Cannot fetch data",
        email: "Cannot fetch data",
        address: "Cannot fetch data",
      },
      appointments: {
        upcoming: ["Cannot fetch data"],
        past: ["Cannot fetch data"],
      },
      records: {
        procedures: ["Cannot fetch data"],
        allergies: "Cannot fetch data",
      },
      payments: {
        transactions: ["Cannot fetch data"],
        balance: "Cannot fetch data",
        balanceColor: "text-red-500",
      },
      queue: {
        waitTime: "Cannot fetch data",
        appointment: "Cannot fetch data",
        estimatedStart: "Cannot fetch data",
      },
    };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Quick Actions Overview</CardTitle>
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
