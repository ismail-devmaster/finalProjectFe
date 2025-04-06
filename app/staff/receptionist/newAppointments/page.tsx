"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TimePicker } from "@/components/ui/time-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CalendarIcon, Clock, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

// Import the real API functions
import { appointment } from "@/app/api";
import { doctor } from "@/app/api";

interface Patient {
  user: User;
  fullName: string;
  sex: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  medicalHistory: string;
}

interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  user: User;
}

interface AppointmentType {
  type: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  sex: {
    gender: string;
  };
}

interface Appointment {
  id: number;
  date: string;
  time: string;
  doctor: Doctor;
  type: AppointmentType;
  additionalNotes: string;
  patient: Patient;
  action: { appointmentType: { type: string } };
  status: {
    status: string;
  };
}

const Component = () => {
  // Appointments state remains the same
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Replace static availableDoctors with a dynamic state
  const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([]);

  // Fetch appointments from the API when the component mounts
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await appointment.getAppointmentsWithWaitingStatus();
        setAppointments(data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast({
          title: "Error",
          description: "Failed to fetch appointments",
          variant: "destructive",
        });
      }
    };

    fetchAppointments();
  }, []);

  // Fetch doctors from the real API and update availableDoctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await doctor.getAllDoctors();
        // Transform the API data into the Doctor type expected by the component
        setAvailableDoctors(
          data.doctors.map((doc: any) => ({
            id: doc.user.id,
            firstName: doc.user.firstName,
            lastName: doc.user.lastName,
          }))
        );
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast({
          title: "Error",
          description: "Failed to fetch doctors",
          variant: "destructive",
        });
      }
    };

    fetchDoctors();
  }, []);

  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
  const [isPatientInfoDialogOpen, setIsPatientInfoDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const calendarDays = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="calendar-day" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = date.toDateString() === new Date().toDateString();
      const isPast = date < new Date();
      const isWeekend = date.getDay() === 5 || date.getDay() === 6;
      const isSelectable = !isPast && !isWeekend;
      const isSelected = selectedDate?.toDateString() === date.toDateString();

      calendarDays.push(
        <div
          key={date.toISOString()}
          className={cn(
            "flex items-center justify-center rounded-md",
            "text-center cursor-pointer p-1 text-sm transition-colors",
            isToday && "bg-muted font-bold",
            isPast && "text-muted-foreground cursor-not-allowed",
            isWeekend && "text-muted-foreground cursor-not-allowed",
            isSelected &&
              "bg-primary text-primary-foreground hover:bg-primary/90",
            isSelectable && !isSelected && "hover:bg-muted"
          )}
          onClick={() => {
            if (isSelectable) {
              setSelectedDate(date);
              setNewDate(
                `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
                  2,
                  "0"
                )}-${String(date.getDate()).padStart(2, "0")}`
              );
            }
          }}
        >
          {day}
        </div>
      );
    }
    return calendarDays;
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const convertTimeTo24Hour = (timeStr: string) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = (Number.parseInt(hours, 10) + 12).toString();
    }

    return `${hours}:${minutes}`;
  };

  const handleReschedule = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsRescheduleDialogOpen(true);
  };

  const handleRescheduleConfirm = async () => {
    if (!newTime || !newDate) {
      toast({
        title: "Error",
        description: "Please select a new date and time.",
        variant: "destructive",
      });
      return;
    } else if (selectedAppointment) {
      await appointment.updateAppointment(selectedAppointment.id, {
        date: newDate,
        time: newTime,
        statusId: 2, // UPCOMING
      });
      console.log("Appointment rescheduled:", newDate, newTime);
      setAppointments((prev) =>
        prev.filter((app) => app.id !== selectedAppointment.id)
      );
      setIsRescheduleDialogOpen(false);
      toast({
        title: "Appointment Rescheduled",
        description: "The appointment has been rescheduled successfully.",
      });
    }
  };

  const handleCancel = async (id: number) => {
    try {
      await appointment.deleteAppointment(id);
      setAppointments((prev) => prev.filter((app) => app.id !== id));
      toast({
        title: "Appointment Cancelled",
        description: "Your appointment has been cancelled successfully.",
      });
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast({
        title: "Error",
        description: "Failed to cancel appointment",
        variant: "destructive",
      });
    }
  };

  const handleConfirm = async (id: number) => {
    // statusId = 2 === UPCOMING
    await appointment.updateAppointment(id, { statusId: 2 });
    setAppointments((prev) => prev.filter((app) => app.id !== id));
    toast({
      title: "Appointment Confirmed",
      description: "Your appointment has been confirmed.",
    });
  };

  const handlePatientInfoClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsPatientInfoDialogOpen(true);
  };

  const calculateAge = (dateOfBirth: string): number => {
    const dob = new Date(dateOfBirth);
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  };

  return (
    <>
      <Tabs defaultValue="waiting">
        <TabsContent value="waiting">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appointment) => (
              <Card
                key={appointment.id}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="bg-blue-50 dark:bg-gray-700">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-5 w-5 text-blue-500" />
                      {format(new Date(appointment.date), "dd/MM/yyyy")}
                    </div>
                    <Button
                      variant="ghost"
                      className="p-0 hover:bg-transparent"
                      onClick={() => handlePatientInfoClick(appointment)}
                    >
                      <span className="text-blue-500 hover:underline">
                        {appointment.patient.user.firstName}{" "}
                        {appointment.patient.user.lastName}
                      </span>
                    </Button>
                  </CardTitle>
                  <CardDescription className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    {format(new Date(appointment.time), "HH:mm")}
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
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {appointment.action.appointmentType.type}
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Additional Notes:
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {appointment.additionalNotes}
                    </p>
                  </div>
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
                  <Button
                    variant="default"
                    onClick={() => handleConfirm(appointment.id)}
                  >
                    Confirm
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog
        open={isRescheduleDialogOpen}
        onOpenChange={setIsRescheduleDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="new-date" className="text-right pt-2">
                New Date
              </Label>
              <div className="col-span-3 border rounded-lg p-2 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm">
                    {months[currentMonth]} {currentYear}
                  </h3>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handlePrevMonth}
                      type="button"
                      className="h-7 w-7 p-0"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleNextMonth}
                      type="button"
                      className="h-7 w-7 p-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center mb-1">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-xs font-medium text-muted-foreground"
                      >
                        {day.slice(0, 1)}
                      </div>
                    )
                  )}
                </div>
                <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
                <input
                  type="hidden"
                  name="date"
                  value={
                    selectedDate
                      ? `${selectedDate.getFullYear()}-${String(
                          selectedDate.getMonth() + 1
                        ).padStart(2, "0")}-${String(
                          selectedDate.getDate()
                        ).padStart(2, "0")}`
                      : ""
                  }
                  onChange={(e) => setNewDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-time" className="text-right">
                New Time
              </Label>
              <div className="col-span-3">
                <TimePicker
                  value={newTime}
                  onChange={(value) => {
                    const time24 = convertTimeTo24Hour(value);
                    setNewTime(time24);
                  }}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRescheduleDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleRescheduleConfirm}>
              Confirm Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isPatientInfoDialogOpen}
        onOpenChange={setIsPatientInfoDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Patient Information</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4 max-h-[60vh] overflow-y-auto pr-6 -mr-6">
            {selectedAppointment && (
              <>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">
                    Personal Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs">Full Name</Label>
                      <p className="text-sm font-medium">
                        {selectedAppointment.patient.user.firstName}{" "}
                        {selectedAppointment.patient.user.lastName}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs">Age</Label>
                      <p className="text-sm font-medium">
                        {calculateAge(
                          selectedAppointment.patient.user.dateOfBirth
                        )}
                      </p>
                    </div>

                    <div>
                      <Label className="text-xs">Date of Birth</Label>
                      <p className="text-sm font-medium">
                        {format(
                          new Date(
                            selectedAppointment.patient.user.dateOfBirth
                          ),
                          "dd/MM/yyyy"
                        )}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs">Sex</Label>
                      <p className="text-sm font-medium">
                        {selectedAppointment.patient.user.sex.gender}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs">Phone Number</Label>
                      <p className="text-sm font-medium">
                        {selectedAppointment.patient.user.phone}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs">Email</Label>
                      <p className="text-sm font-medium">
                        {selectedAppointment.patient.user.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">
                    Medical History
                  </h4>
                  <p className="text-sm whitespace-pre-wrap">
                    {selectedAppointment.patient.medicalHistory}
                  </p>
                </div>
              </>
            )}
          </div>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsPatientInfoDialogOpen(false)}
              className="transition-all duration-200 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Component;
