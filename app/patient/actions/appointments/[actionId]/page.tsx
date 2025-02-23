import { AppointmentsView } from "@/components/appointments-view";

export default function AppointmentsPage({
  params,
}: {
  params: { actionId: string };
}) {
  return <AppointmentsView actionId={Number.parseInt(params.actionId, 10)} />;
}
