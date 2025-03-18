import { useEffect, useState } from "react";
import { action, patient } from "@/app/api";

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

export function usePatientData() {
  const [profileInfo, setProfileInfo] = useState<PersonalInfoType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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

  return { profileInfo, isLoading, appointments, payments, balance };
}
