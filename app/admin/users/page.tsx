import { UserManagement } from "@/components/adminComponents/users/user-management";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function AppointmentsPage() {
  return (
    <DashboardLayout>
      <UserManagement />
    </DashboardLayout>
  );
}
