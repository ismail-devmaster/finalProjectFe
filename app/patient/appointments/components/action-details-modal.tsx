import { appointment } from "@/app/api/appointment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatTime } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";
export function ActionDetailsModal({ isOpen, onClose, action, appointments }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Action Details</DialogTitle>
          <DialogDescription>
            Viewing details for action ID: {action.id}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Action Information</h3>
          <p>
            <strong>Type:</strong> {action.appointmentType.type}
          </p>
          <p>
            <strong>Description:</strong> {action.description}
          </p>
          <p>
            <strong>Total Payment:</strong> ${action.totalPayment}
          </p>
          <p>
            <strong>Start Date:</strong> {formatDate(action.startDate)}
          </p>
          <p>
            <strong>End Date:</strong> {formatDate(action.endDate)}
          </p>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Related Appointments</h3>
          {appointments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {formatDate(appointment.date)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {formatTime(appointment.time)}
                      </div>
                    </TableCell>
                    <TableCell>
                      Dr.{" "}
                      {appointment.doctorId === 1 ? "Alice Smith" : "Unknown"}
                    </TableCell>
                    <TableCell>{appointment.status.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No appointments found for this action.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
