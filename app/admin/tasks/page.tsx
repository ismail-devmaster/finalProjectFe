import { TaskManagement } from "@/components/adminComponents/tasks/task-management";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function TasksPage() {
  return (
    <DashboardLayout>
      <TaskManagement />
    </DashboardLayout>
  );
}
