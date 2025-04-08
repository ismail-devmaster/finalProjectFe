import {
  Dialog,
  DialogContent,
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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate, formatTime } from "@/lib/utils";
import { Calendar, Clock, CreditCard, FileText, User } from "lucide-react";

interface AppointmentType {
  type: string;
}

interface Status {
  status: string;
}

interface Action {
  id: number;
  appointmentType: AppointmentType;
  description: string;
  totalPayment: number;
  startDate: string;
  endDate: string;
}

interface Appointment {
  id: number;
  date: string;
  time: string;
  doctor: { user: { firstName: string; lastName: string } };
  doctorId: number;
  status: Status;
}

interface ActionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: Action;
  appointments: Appointment[];
}

export function ActionDetailsModal({
  isOpen,
  onClose,
  action,
  appointments,
}: ActionDetailsModalProps) {
  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "scheduled":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden rounded-xl">
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Appointment Details
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Main appointment info card */}
          <Card className="overflow-hidden border-none shadow-sm">
            <div className="bg-slate-50 px-6 py-4 border-b">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <FileText className="h-5 w-5 text-slate-500" />
                Appointment Information
              </h3>
            </div>
            <CardContent className="p-6 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Type</div>
                <div className="font-medium">
                  <Badge variant="outline" className="text-sm font-medium">
                    {action.appointmentType.type}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Total Payment
                </div>
                <div className="font-medium flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-emerald-500" />
                  <span className="text-emerald-600 font-semibold">
                    DA{action.totalPayment.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <div className="text-sm text-muted-foreground">Description</div>
                <div className="font-medium">{action.description}</div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Start Date</div>
                <div className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  {formatDate(action.startDate)}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">End Date</div>
                <div className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  {formatDate(action.endDate)}
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Appointments table section */}
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-slate-500" />
              Related Appointments
            </h3>

            {appointments.length > 0 ? (
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow
                        key={appointment.id}
                        className="hover:bg-slate-50"
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            {formatDate(appointment.date)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-slate-400" />
                            {formatTime(appointment.time)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-slate-400" />
                            <span>
                              Dr. {appointment.doctor.user.firstName}{" "}
                              {appointment.doctor.user.lastName}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={getStatusColor(
                              appointment.status.status
                            )}
                          >
                            {appointment.status.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <Card className="bg-slate-50">
                <CardContent className="p-6 text-center text-muted-foreground">
                  No appointments found for this action.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
