import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Action {
  id: number
  name: string
  patientId: number
  description: string
  totalPayment: number
  startDate: string
  endDate: string | null
}

interface PatientCardProps {
  action: Action
  onViewAppointments: () => void
}

export function PatientCard({ action, onViewAppointments }: PatientCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{action.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">{action.description}</p>
        <p className="text-sm text-muted-foreground mb-2">Patient ID: {action.patientId}</p>
        <p className="font-semibold">Total Payments: ${action.totalPayment.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground">Started: {new Date(action.startDate).toLocaleDateString()}</p>
        {action.endDate && (
          <p className="text-sm text-muted-foreground">Ended: {new Date(action.endDate).toLocaleDateString()}</p>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={onViewAppointments}>View Appointments</Button>
      </CardFooter>
    </Card>
  )
}

