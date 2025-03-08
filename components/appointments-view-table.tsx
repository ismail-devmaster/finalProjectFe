import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Appointment } from "@/types/appointment";

interface AppointmentsTableProps {
  appointments: Appointment[];
  onSort: (column: string) => void;
  getDoctorName: (doctorId: number) => string;
  onEdit: (appointment: Appointment) => void;
}

export default function AppointmentsTable({
  appointments,
  onSort,
  getDoctorName,
  onEdit,
}: AppointmentsTableProps): React.ReactElement {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            onClick={() => onSort("date")}
            className="cursor-pointer"
          >
            Date
          </TableHead>
          <TableHead
            onClick={() => onSort("time")}
            className="cursor-pointer"
          >
            Time
          </TableHead>
          <TableHead
            onClick={() => onSort("doctorId")}
            className="cursor-pointer"
          >
            Doctor
          </TableHead>
          <TableHead
            onClick={() => onSort("status")}
            className="cursor-pointer"
          >
            Status
          </TableHead>
          <TableHead>Notes</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell>
              {new Date(appointment.date).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {new Date(appointment.time).toLocaleTimeString()}
            </TableCell>
            <TableCell>{getDoctorName(appointment.doctor.userId)}</TableCell>
            <TableCell>{appointment.status.status}</TableCell>
            <TableCell>{appointment.additionalNotes}</TableCell>
            <TableCell>
              {(appointment.status.status === "WAITING" ||
                appointment.status.status === "UPCOMING") && (
                <Button
                  onClick={() => onEdit(appointment)}
                  variant="outline"
                  size="sm"
                >
                  Edit
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
