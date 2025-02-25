"use client";

import { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import BookNew from "./bookNew";
import Waiting from "./waiting";
import Upcoming from "./upcoming";
import History from "./history";
import Reminders from "./reminders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { Appointment } from "./types/appointment";
import { appointment } from "@/app/api/appointment";

export default function MainFile() {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [additionalNotes, setAdditionalNotes] = useState<string>("");
  const [upcomingAppointments, setUpcomingAppointments] = useState<
    Appointment[]
  >([]);
  const [waitingAppointments, setWaitingAppointments] = useState<Appointment[]>(
    []
  );
  const [appointmentToReschedule, setAppointmentToReschedule] =
    useState<Appointment | null>(null);
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
  const [appointmentHistory, setAppointmentHistory] = useState<Appointment[]>(
    []
  );
  const [selectedAppointmentDetails, setSelectedAppointmentDetails] =
    useState<Appointment | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("book-new");

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  const handleConfirmAppointment = async () => {
    try {
      const newAppointment: any = {
        date: format(date, "yyyy-MM-dd"),
        time: selectedTime || "",
        doctorId: Number.parseInt(selectedDoctor || "0"),
        additionalNotes: additionalNotes,
        statusId: 1, // Assuming 1 is for "WAITING" status
      };

      const createdAppointment = await appointment.createAppointment(
        newAppointment
      );
      setWaitingAppointments((prevAppointments) => [
        ...prevAppointments,
        createdAppointment,
      ]);

      // Reset form
      setDate(new Date());
      setSelectedTime(null);
      setSelectedDoctor(null);
      setAdditionalNotes("");

      // Switch to the Waiting tab
      setActiveTab("waiting");
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  const handleCancelBooking = () => {
    // Reset form
    setDate(new Date());
    setSelectedTime(null);
    setSelectedDoctor(null);
    setAdditionalNotes("");
  };

  const handleReschedule = (appointmentToReschedule: Appointment) => {
    setAppointmentToReschedule(appointmentToReschedule);
    setIsRescheduleDialogOpen(true);
  };

  const handleConfirmReschedule = async () => {
    if (!date || !selectedTime || !appointmentToReschedule) {
      return;
    }

    try {
      const updatedAppointment: Appointment = {
        ...appointmentToReschedule,
        date: format(date, "yyyy-MM-dd"),
        time: selectedTime,
      };

      await appointment.updateAppointment(
        appointmentToReschedule.id,
        updatedAppointment
      );

      setIsRescheduleDialogOpen(false);
      setAppointmentToReschedule(null);
      setDate(new Date());
      setSelectedTime(null);
      setActiveTab("waiting");

      // Refresh appointments
      fetchAppointments();
    } catch (error) {}
  };

  const handleCancel = async (appointmentId: number) => {
    try {
      await appointment.deleteAppointment(appointmentId);

      setUpcomingAppointments((appointments) =>
        appointments.filter((apt) => apt.id !== appointmentId)
      );
      setWaitingAppointments((appointments) =>
        appointments.filter((apt) => apt.id !== appointmentId)
      );
    } catch (error) {}
  };

  const handleViewDetails = async (appointmentId: number) => {
    try {
      const appointmentDetails = await appointment.getAppointmentById(
        appointmentId
      );
      setSelectedAppointmentDetails(appointmentDetails);
      setIsDetailsDialogOpen(true);
    } catch (error) {}
  };

  const today = new Date();

  const disabledDates = ["2024-11-25", "2024-12-31"];

  // Function to handle date selection, with disabled dates check
  const handleSelectDate = (selectedDate: Date) => {
    const isDisabled = disabledDates.some(
      (disabledDate) =>
        new Date(disabledDate).toDateString() === selectedDate.toDateString()
    );
    if (!isDisabled) {
      setDate(selectedDate);
    }
  };

  const mockAppointments = [
    {
      id: 26,
      patientId: 5,
      doctorId: 2,
      actionId: 11,
      statusId: 1,
      date: "2025-02-24T00:00:00.000Z",
      time: "1970-01-01T01:11:00.000Z",
      additionalNotes: "k",
      status: {
        id: 1,
        status: "WAITING",
      },
      queueEntries: [],
      action: {
        appointmentType: {
          id: 6,
          type: "SPECIALIST",
        },
      },
      patient: {
        medicalHistory: null,
        user: {
          id: 5,
          firstName: "ismail",
          lastName: "pc",
          dateOfBirth: "2025-02-11T23:00:00.000Z",
          phone: "12",
          email: "ismailpcuse@gmail.com",
          sex: {
            gender: "MALE",
          },
        },
      },
      doctor: {
        user: {
          firstName: "Alice",
          lastName: "Smith",
        },
      },
    },
    {
      id: 27,
      patientId: 5,
      doctorId: 2,
      actionId: 11,
      statusId: 2,
      date: "2025-02-23T00:00:00.000Z",
      time: "1970-01-01T00:20:00.000Z",
      additionalNotes: "hghghgh",
      status: {
        id: 2,
        status: "UPCOMING",
      },
      queueEntries: [],
      action: {
        appointmentType: {
          id: 6,
          type: "SPECIALIST",
        },
      },
      patient: {
        medicalHistory: null,
        user: {
          id: 5,
          firstName: "ismail",
          lastName: "pc",
          dateOfBirth: "2025-02-11T23:00:00.000Z",
          phone: "12",
          email: "ismailpcuse@gmail.com",
          sex: {
            gender: "MALE",
          },
        },
      },
      doctor: {
        user: {
          firstName: "Alice",
          lastName: "Smith",
        },
      },
    },
  ];

  const fetchAppointments = useCallback(async () => {
    setUpcomingAppointments(
      mockAppointments.filter((app) => app.status.status === "UPCOMING")
    );
    setWaitingAppointments(
      mockAppointments.filter((app) => app.status.status === "WAITING")
    );
    setAppointmentHistory(mockAppointments);
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const doctors = [
    {
      user: {
        id: 2,
        firstName: "Alice",
        lastName: "Smith",
      },
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <main>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center dark:text-white">
          Appointments
        </h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <TabsTrigger
              value="book-new"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-white"
            >
              Book New
            </TabsTrigger>
            <TabsTrigger
              value="waiting"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-white"
            >
              Waiting
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-white"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-white"
            >
              History
            </TabsTrigger>
            <TabsTrigger
              value="reminders"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-white"
            >
              Reminders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="book-new">
            <BookNew
              date={date}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              selectedDoctor={selectedDoctor}
              setSelectedDoctor={setSelectedDoctor}
              additionalNotes={additionalNotes}
              setAdditionalNotes={setAdditionalNotes}
              handleConfirmAppointment={handleConfirmAppointment}
              handleCancelBooking={handleCancelBooking}
              timeSlots={timeSlots}
              handleSelectDate={handleSelectDate}
              doctors={doctors}
            />
          </TabsContent>

          <TabsContent value="waiting">
            <Waiting
              waitingAppointments={waitingAppointments}
              handleReschedule={handleReschedule}
              handleCancel={handleCancel}
            />
          </TabsContent>

          <TabsContent value="upcoming">
            <Upcoming
              upcomingAppointments={upcomingAppointments}
              handleReschedule={handleReschedule}
              handleCancel={handleCancel}
            />
          </TabsContent>

          <TabsContent value="history">
            <History
              appointmentHistory={appointmentHistory}
              handleViewDetails={handleViewDetails}
            />
          </TabsContent>

          <TabsContent value="reminders">
            <Reminders />
          </TabsContent>
        </Tabs>
      </main>

      <Dialog
        open={isRescheduleDialogOpen}
        onOpenChange={setIsRescheduleDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogDescription>
              Please select a new date and time for your appointment.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Date
              </Label>
              <div className="col-span-3">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate: Date | undefined) =>
                    newDate && setDate(newDate)
                  }
                  fromDate={new Date()}
                  className="rounded-md border"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Time
              </Label>
              <Select
                value={selectedTime || ""}
                onValueChange={setSelectedTime}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRescheduleDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmReschedule}>
              Confirm Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
          </DialogHeader>
          {selectedAppointmentDetails && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-bold">Date:</Label>
                <div className="col-span-3">
                  {selectedAppointmentDetails.date}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-bold">Time:</Label>
                <div className="col-span-3">
                  {selectedAppointmentDetails.time}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-bold">Doctor:</Label>
                <div className="col-span-3">
                  {selectedAppointmentDetails.doctor.user.firstName}{" "}
                  {selectedAppointmentDetails.doctor.user.lastName}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-bold">Reason:</Label>
                <div className="col-span-3">
                  {selectedAppointmentDetails.action.appointmentType.type}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-bold">Status:</Label>
                <div className="col-span-3">
                  {selectedAppointmentDetails.status.status}
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right font-bold">
                  Additional Notes:
                </Label>
                <div className="col-span-3">
                  {selectedAppointmentDetails.additionalNotes}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDetailsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
