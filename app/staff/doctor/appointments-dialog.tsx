import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar, Clock, FileText, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Appointment {
  id: number;
  date: string;
  time: string;
  additionalNotes: string;
  status: {
    status: string;
  };
  doctor: {
    user: {
      firstName: string;
      lastName: string;
    };
  };
}

interface AppointmentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointments: Appointment[];
}

export function AppointmentsDialog({
  open,
  onOpenChange,
  appointments,
}: AppointmentsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Appointments</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <Card
                key={appointment.id}
                className="overflow-hidden transition-shadow hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold">
                        Dr. {appointment.doctor.user.firstName}{" "}
                        {appointment.doctor.user.lastName}
                      </h3>
                    </div>
                    <Badge
                      className={cn(
                        "px-2 py-1 text-xs font-medium",
                        appointment.status.status === "WAITING" &&
                          "bg-yellow-100 text-yellow-800",
                        appointment.status.status === "UPCOMING" &&
                          "bg-blue-100 text-blue-800",
                        appointment.status.status === "COMPLETED" &&
                          "bg-green-100 text-green-800",
                        appointment.status.status === "CANCELLED" &&
                          "bg-red-100 text-red-800"
                      )}
                    >
                      {appointment.status.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        {format(new Date(appointment.date), "MMMM d, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        {format(new Date(appointment.time), "h:mm a")}
                      </span>
                    </div>
                  </div>
                  {appointment.additionalNotes && (
                    <div className="mt-4 flex items-start space-x-2">
                      <FileText className="w-4 h-4 text-gray-500 mt-1" />
                      <p className="text-sm text-gray-600">
                        {appointment.additionalNotes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500">No appointments found.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
