import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Action {
  id: number;
  name: string;
  patientId: number;
  description: string;
  totalPayment: number;
  startDate: string;
  endDate: string | null;
  appointmentType: {
    type: string;
  };
}

interface PatientCardProps {
  action: Action;
  onViewAppointments: () => void;
  onViewPayments: () => void;
}

export function PatientCard({
  action,
  onViewAppointments,
  onViewPayments,
}: PatientCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{action.appointmentType.type}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">
          {action.description}
        </p>
        <p className="font-semibold">
          Total Payments: ${action.totalPayment.toFixed(2)}
        </p>
        <p className="text-sm text-muted-foreground">
          Started: {new Date(action.startDate).toLocaleDateString()}
        </p>
        {action.endDate && (
          <p className="text-sm text-muted-foreground">
            Ended: {new Date(action.endDate).toLocaleDateString()}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={onViewAppointments}>View Appointments</Button>
        <Button onClick={onViewPayments} variant="outline">
          View Payments
        </Button>
      </CardFooter>
    </Card>
  );
}
