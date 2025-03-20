import { DashboardOverview } from "@/components/adminComponents/dashboard-overview";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function Home() {
  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  );
}
