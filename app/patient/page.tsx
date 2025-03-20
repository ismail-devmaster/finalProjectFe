"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Overview from "@/components/sections/patient/Overview";
import { usePatientData } from "@/hooks/pages/usePatientData";
export default function Page() {
  const { profileInfo, isLoading, appointments, payments, balance } =
    usePatientData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (isLoading) return <div className="text-center p-4">Loading...</div>;

  const getBalanceColor = (balance: number): string =>
    balance < 200 ? "text-red-800" : "text-green-800";

  const mockData = {
    profile: profileInfo,
    appointments: {
      upcoming: appointments,
      completed: [
        "Check-up: March 3, 2023 at 2:30 PM",
        "Filling: January 12, 2023 at 11:00 AM",
      ],
    },
    payments: {
      transactions: payments,
      balance,
      balanceColor: getBalanceColor(Number(balance)),
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
          isNewPatient={false}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      </Card>
    </div>
  );
}
