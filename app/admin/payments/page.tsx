import { PaymentManagement } from "@/components/adminComponents/payment/payment-management";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function PaymentsPage() {
  return (
    <DashboardLayout>
      <PaymentManagement />
    </DashboardLayout>
  );
}
