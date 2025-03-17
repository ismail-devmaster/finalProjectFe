import { AppointmentManagement } from "@/components/adminComponents/appointments/appointment-management";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function AppointmentsPage() {
  return (
    <DashboardLayout>
      <AppointmentManagement />
    </DashboardLayout>
  );
}
