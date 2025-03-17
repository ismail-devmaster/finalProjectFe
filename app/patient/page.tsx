"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { action, patient } from "@/app/api";
import Overview from "@/components/sections/patient/Overview";

type PersonalInfoType = {
  name: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
};

const capitalize = (text: string) =>
  text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : "Unknown";

const formatDate = (isoString: string) =>
  isoString
    ? new Date(isoString).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    : "No Date";

export default function Page() {
  const [profileInfo, setProfileInfo] = useState<PersonalInfoType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [appointments, setAppointments] = useState<string[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [balance, setBalance] = useState<number>();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const { patientId } = await patient.getPatientId();
        const actionData = await action.getActionsByPatientId(patientId);
        const response = await patient.getPatientData();

        if (response?.patientData) {
          const { user } = response.patientData;

          setProfileInfo({
            name: `${user.firstName} ${user.lastName}`,
            dob: new Date(user.dateOfBirth).toISOString().split("T")[0],
            phone: user.phone,
            email: user.email,
            address: user.address || "No address available",
          });
          profileInfo && console.log("Profile Info:", profileInfo);
          setAppointments(
            actionData.actions.map((appt: any) =>
              `${capitalize(appt.appointmentType?.type || "Unknown")}: ${formatDate(
                appt.appointments?.[0]?.time,
              )
              }`
            ),
          );

          setPayments(
            actionData.actions.map((appt: any) => {
              const payment = appt.payments?.[0];
              return `$${payment?.amount ?? 0} - ${capitalize(
                payment?.description || "No payment recorded",
              )
                } (${formatDate(payment?.date || new Date())})`;
            }),
          );

          setBalance(
            actionData.actions.reduce(
              (sum: number, appt: any) =>
                sum + (appt.payments?.[0]?.amount ?? 0),
              0,
            ),
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  profileInfo && console.log("Profile Info:", profileInfo);
  const getBalanceColor = (balance: number): string =>
    balance < 200 ? "text-red-800" : "text-green-800";

  if (isLoading) return <div className="text-center p-4">Loading...</div>;

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
