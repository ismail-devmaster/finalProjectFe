import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { AppointmentDetailsProps } from "@/types/appointment"
import { format, parseISO } from "date-fns"

export function AppointmentDetails({ appointment, isOpen, onOpenChange, allAppointments }: AppointmentDetailsProps) {
  if (!appointment) return null

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "outline"
      case "UPCOMING":
        return "secondary"
      case "WAITING":
        return "default"
      case "CANCELLED":
        return "destructive"
      default:
        return "default"
    }
  }

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "MMMM d, yyyy")
  }

  const formatTime = (timeString: string) => {
    return format(parseISO(timeString), "h:mm a")
  }

  const patientName = `${appointment.patient.user.firstName} ${appointment.patient.user.lastName}`
  const doctorName = `Dr. ${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}`
  const patientHistory = appointment.patient.medicalHistory || "No medical history available"

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogDescription>Appointment information for {patientName}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg" alt={patientName} />
              <AvatarFallback>{appointment.patient.user.firstName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">{patientName}</h3>
              <p className="text-sm text-muted-foreground">{appointment.patient.user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium">Appointment ID</h4>
              <p className="text-sm">{appointment.id}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Doctor</h4>
              <p className="text-sm">{doctorName}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Type</h4>
              <p className="text-sm">{appointment.action.appointmentType.type}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Status</h4>
              <Badge variant={getStatusVariant(appointment.status.status)}>{appointment.status.status}</Badge>
            </div>
            <div>
              <h4 className="text-sm font-medium">Date</h4>
              <p className="text-sm">{formatDate(appointment.date)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Time</h4>
              <p className="text-sm">{formatTime(appointment.time)}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium">Medical History</h4>
            <p className="text-sm mt-1 p-3 bg-muted rounded-md">{patientHistory}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium">Additional Notes</h4>
            <p className="text-sm mt-1 p-3 bg-muted rounded-md">
              {appointment.additionalNotes || "No additional notes"}
            </p>
          </div>

          {appointment.queueEntries.length > 0 && (
            <div>
              <h4 className="text-sm font-medium">Queue Information</h4>
              <div className="mt-1 p-3 bg-muted rounded-md">
                <p className="text-sm">Estimated wait time: {appointment.queueEntries[0].estimatedWaitTime} minutes</p>
                <p className="text-sm">Time to doctor: {appointment.queueEntries[0].estimatedTimeToDoctor} minutes</p>
                <p className="text-sm">Status: {appointment.queueEntries[0].status}</p>
              </div>
            </div>
          )}

          <div>
            <h4 className="text-sm font-medium mb-2">Patient Appointment History</h4>
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allAppointments
                    .filter((app) => app.patientId === appointment.patientId)
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((app) => (
                      <TableRow key={app.id}>
                        <TableCell>{formatDate(app.date)}</TableCell>
                        <TableCell>{app.action.appointmentType.type}</TableCell>
                        <TableCell>{`Dr. ${app.doctor.user.firstName} ${app.doctor.user.lastName}`}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(app.status.status)}>{app.status.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

