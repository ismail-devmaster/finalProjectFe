import { DashboardLayout } from "@/components/dashboard-layout";
import { InventoryManagement } from "@/components/adminComponents/inventory/inventory-management";

export default function InventoryPage() {
  return (
    <DashboardLayout>
      <InventoryManagement />
    </DashboardLayout>
  );
}
