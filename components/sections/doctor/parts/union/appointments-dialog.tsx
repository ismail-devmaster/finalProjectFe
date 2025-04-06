import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar, Clock, FileText, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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
  actionTitle?: string;
}

export function AppointmentsDialog({
  open,
  onOpenChange,
  appointments,
  actionTitle,
}: AppointmentsDialogProps) {
  const getStatusBadgeVariant = (status: string) => {
    switch (status.toUpperCase()) {
      case "CONFIRMED":
      case "COMPLETED":
        return "success";
      case "WAITING":
      case "UPCOMING":
        return "secondary";
      case "CANCELLED":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Appointments</DialogTitle>
          <DialogDescription>
            {actionTitle
              ? `Appointment details for ${actionTitle} treatment`
              : "Appointment details for this treatment"}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-grow mt-4">
          <div className="space-y-4 p-1">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <Card
                  key={appointment.id}
                  className="overflow-hidden border-l-4 border-l-violet-500"
                >
                  <CardContent className="p-6">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-violet-500" />
                          <span className="font-semibold text-lg">
                            Dr. {appointment.doctor.user.firstName}{" "}
                            {appointment.doctor.user.lastName}
                          </span>
                        </div>
                        <Badge
                          variant={getStatusBadgeVariant(
                            appointment.status.status
                          )}
                        >
                          {appointment.status.status}
                        </Badge>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {format(new Date(appointment.date), "MMMM d, yyyy")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {format(new Date(appointment.time), "h:mm a")}
                          </span>
                        </div>
                      </div>

                      {appointment.additionalNotes && (
                        <div className="bg-muted/50 p-3 rounded-md text-sm mt-2">
                          <div className="flex items-start gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <span className="font-medium">Notes:</span>{" "}
                              {appointment.additionalNotes}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No appointment records found
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
