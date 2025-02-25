import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, User } from "lucide-react";
import { format } from "date-fns";
import type { Appointment } from "./types/appointment";
import { appointment } from "@/app/api/appointment";

interface UpcomingProps {
  upcomingAppointments: Appointment[];
  handleReschedule: (appointment: Appointment) => void;
  handleCancel: (appointmentId: number) => void;
}
console.log(appointment);

export default function Upcoming({
  upcomingAppointments,
  handleReschedule,
  handleCancel,
}: UpcomingProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {upcomingAppointments.map((appointment) => {
        const appointmentDate = new Date(appointment.date);
        const appointmentTime = new Date(appointment.time);
        return (
          <Card
            key={appointment.id}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="bg-blue-50 dark:bg-gray-700">
              <CardTitle className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5 text-blue-500" />
                {format(appointmentDate, "MMMM d, yyyy")}
              </CardTitle>
              <CardDescription className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                {format(appointmentTime, "h:mm a")}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center mb-2">
                <User className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <p className="font-semibold text-gray-900 dark:text-white">
                  {appointment.doctor.user.firstName}{" "}
                  {appointment.doctor.user.lastName}
                </p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {appointment.action.appointmentType.type}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                className="border-gray-200 dark:border-gray-700"
                onClick={() => handleReschedule(appointment)}
              >
                Reschedule
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleCancel(appointment.id)}
              >
                Cancel
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
