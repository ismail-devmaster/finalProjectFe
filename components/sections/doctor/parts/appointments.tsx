"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TimePicker } from "@/components/ui/time-picker";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { appointment } from "@/app/api";
import { payment } from "@/app/api";
import {
  Calendar,
  Clock,
  User,
  CreditCard,
  Filter,
  Plus,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Appointment {
  doctorId: number;
  id: number;
  patientId: number;
  actionId: number;
  date: string;
  time: string;
  action: {
    appointmentType: {
      id: number;
      type: string;
    };
  };
  status: {
    id: number;
    status: string;
  };
  patient: Patient;
}

interface Patient {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  sex: {
    gender: string;
  };
  medicalHistory?: string;
}

interface Payment {
  id: number;
  amount: number;
  date: string;
  time: string;
  status: {
    id: number;
    status: string;
  };
  description: string;
}

interface AppointmentsProps {
  appointments: Appointment[];
  patients: Patient[];
}

const STATUS_OPTIONS = ["ALL", "WAITING", "UPCOMING", "COMPLETED"];
const DATE_OPTIONS = ["ALL", "TODAY", "THIS_WEEK", "THIS_MONTH"] as const;

type DateFilter = (typeof DATE_OPTIONS)[number];

export default function Appointments({ appointments }: AppointmentsProps) {
  const [selectedAppointment, setselectedAppointment] =
    React.useState<Appointment | null>(null);

  const [selectedStatus, setSelectedStatus] = React.useState<string>("ALL");
  const [selectedDate, setSelectedDate] = React.useState<DateFilter>("ALL");
  const [showAppointments, setShowAppointments] = React.useState(false);
  const [showPayments, setShowPayments] = React.useState(false);
  const [showNewAppointment, setShowNewAppointment] = React.useState(false);
  const [showNewPayment, setShowNewPayment] = React.useState(false);
  const [patientAppointments, setPatientAppointments] = React.useState<
    Appointment[]
  >([]);
  const [patientPayments, setPatientPayments] = React.useState<Payment[]>([]);

  const [newAppointment, setNewAppointment] = React.useState({
    date: new Date().toISOString().split("T")[0],
    time: "",
    additionalNotes: "",
    statusId: 2,
    actionId: selectedAppointment?.actionId || 0,
    patientId: selectedAppointment?.patientId || 0,
  });

  interface NewPaymentState {
    amount: string;
    date: string;
    time: string;
    description: string;
    statusId: number;
  }

  const [newPayment, setNewPayment] = React.useState<NewPaymentState>({
    amount: "",
    date: new Date().toISOString().split("T")[0],
    time: "",
    description: "",
    statusId: 1, // Default to PAID
  });

  const isInDateRange = React.useCallback(
    (appointmentDate: string, filter: DateFilter) => {
      const date = new Date(appointmentDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const appointmentDay = new Date(date);
      appointmentDay.setHours(0, 0, 0, 0);

      switch (filter) {
        case "TODAY":
          return appointmentDay.getTime() === today.getTime();
        case "THIS_WEEK": {
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          return appointmentDay >= startOfWeek && appointmentDay <= endOfWeek;
        }
        case "THIS_MONTH": {
          return (
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          );
        }
        default:
          return true;
      }
    },
    []
  );

  const filteredAppointments = React.useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesStatus =
        selectedStatus === "ALL" ||
        appointment.status.status.toUpperCase() === selectedStatus;

      const matchesDate = isInDateRange(appointment.date, selectedDate);

      return matchesStatus && matchesDate;
    });
  }, [appointments, selectedStatus, selectedDate, isInDateRange]);

  const handleAppointmentsClick = async (actionId: number) => {
    const res = await appointment.getAppointmentsByActionId(actionId);
    setPatientAppointments(res.appointments);
    setselectedAppointment(
      appointments.find((app) => app.actionId === actionId) || null
    );
    setShowAppointments(true);
  };
  const handlePaymentsClick = async (actionId: number) => {
    const res = await payment.getPaymentsByActionId(actionId);
    setPatientPayments(res.payments);
    setselectedAppointment(
      appointments.find((app) => app.actionId === actionId) || null
    );
    setShowPayments(true);
  };

  const handleNewAppointment = async () => {
    try {
      // Create date in local timezone without time component and add 1 day
      const [year, month, day] = newAppointment.date.split("-").map(Number);
      const localDate = new Date(year, month - 1, day);
      localDate.setDate(localDate.getDate() + 2); // Add one day
      const formattedDate = localDate.toISOString().split("T")[0];

      const appointmentData = {
        ...newAppointment,
        date: formattedDate,
        doctorId: selectedAppointment?.doctorId || 0,
        actionId: selectedAppointment?.actionId || 0,
        patientId: selectedAppointment?.patientId || 0,
      };
      await appointment.createAppointment(appointmentData);
      setShowNewAppointment(false);
      setNewAppointment({
        date: "",
        time: "",
        additionalNotes: "",
        statusId: 2,
        actionId: selectedAppointment?.actionId || 0,
        patientId: selectedAppointment?.patientId || 0,
      });
      // Optionally, refresh the appointments list here
    } catch (error) {
      console.error("Error creating appointment:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const handleNewPayment = async () => {
    try {
      const [year, month, day] = newPayment.date.split("-").map(Number);
      const localDate = new Date(year, month - 1, day);
      localDate.setDate(localDate.getDate() + 2); // Add one day
      const formattedDate = localDate.toISOString().split("T")[0];
      const payData = {
        actionId: selectedAppointment?.actionId,
        patientId: selectedAppointment?.patientId,
        doctorId: selectedAppointment?.doctorId,
        amount: Number(newPayment.amount),
        date: formattedDate,
        time: newPayment.time,
        description: newPayment.description,
        statusId: newPayment.statusId,
      };
      console.log(payData);
      await payment.createPayment(payData);
      setShowNewPayment(false);
      setNewPayment({
        amount: "",
        date: new Date().toISOString().split("T")[0],
        time: "",
        description: "",
        statusId: 1,
      });
      // Optionally, refresh the payments list here
    } catch (error) {
      console.error("Error creating payment:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

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
    <>
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 to-sky-600 bg-clip-text text-transparent">
            Appointment Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Schedule and manage patient appointments
          </p>
        </div>

        <Card className="shadow-md border-t-4 border-t-violet-500">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-violet-500" />
              <div>
                <CardTitle>Appointments</CardTitle>
                <CardDescription>
                  View and manage your appointments
                </CardDescription>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span>Filter appointments:</span>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                <Select
                  value={selectedDate}
                  onValueChange={(value) =>
                    setSelectedDate(value as DateFilter)
                  }
                >
                  <SelectTrigger className="w-full sm:w-[180px] bg-muted/40">
                    <SelectValue placeholder="Filter by date" />
                  </SelectTrigger>
                  <SelectContent>
                    {DATE_OPTIONS.map((dateOption) => (
                      <SelectItem key={dateOption} value={dateOption}>
                        {dateOption === "ALL"
                          ? "All Dates"
                          : dateOption
                              .split("_")
                              .map(
                                (word) =>
                                  word.charAt(0) + word.slice(1).toLowerCase()
                              )
                              .join(" ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-full sm:w-[180px] bg-muted/40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status === "ALL"
                          ? "All Status"
                          : status.charAt(0) + status.slice(1).toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-medium">Patient</TableHead>
                    <TableHead className="font-medium">Date</TableHead>
                    <TableHead className="font-medium">Time</TableHead>
                    <TableHead className="font-medium">Type</TableHead>
                    <TableHead className="font-medium">Status</TableHead>
                    <TableHead className="font-medium">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-8 text-muted-foreground"
                      >
                        No appointments found for the selected filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAppointments.map((appointment) => (
                      <TableRow
                        key={appointment.id}
                        className="hover:bg-violet-50"
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5 text-violet-500" />
                            {appointment.patient.firstName}{" "}
                            {appointment.patient.lastName}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            {new Date(appointment.date).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            {new Date(appointment.time).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })}
                          </div>
                        </TableCell>
                        <TableCell>
                          {appointment.action.appointmentType.type}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={getStatusBadgeVariant(
                              appointment.status.status
                            )}
                          >
                            {appointment.status.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1 hover:bg-violet-50 hover:text-violet-700"
                              onClick={() =>
                                handleAppointmentsClick(appointment.actionId)
                              }
                            >
                              <Calendar className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline">
                                Appointments
                              </span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1 hover:bg-emerald-50 hover:text-emerald-700"
                              onClick={() =>
                                handlePaymentsClick(appointment.actionId)
                              }
                            >
                              <CreditCard className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline">Payments</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog
        open={showAppointments}
        onOpenChange={() => setShowAppointments(false)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Appointment History
            </DialogTitle>
            <DialogDescription>
              {selectedAppointment && (
                <>
                  All appointments for {selectedAppointment.patient.firstName}{" "}
                  {selectedAppointment.patient.lastName}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-6 mt-4">
              <div className="flex items-center gap-3">
                <div className="bg-violet-100 text-violet-700 p-3 rounded-full">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedAppointment.patient.firstName}{" "}
                    {selectedAppointment.patient.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Treatment: {selectedAppointment.action.appointmentType.type}
                  </p>
                </div>
              </div>

              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="font-medium">Date</TableHead>
                      <TableHead className="font-medium">Time</TableHead>
                      <TableHead className="font-medium">Type</TableHead>
                      <TableHead className="font-medium">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientAppointments.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="text-center py-6 text-muted-foreground"
                        >
                          No appointment records found
                        </TableCell>
                      </TableRow>
                    ) : (
                      patientAppointments.map((app) => (
                        <TableRow key={app.id} className="hover:bg-violet-50">
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                              {new Date(app.date).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                              {new Date(app.time).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })}
                            </div>
                          </TableCell>
                          <TableCell>
                            {app.action.appointmentType.type}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={getStatusBadgeVariant(app.status.status)}
                            >
                              {app.status.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => setShowNewAppointment(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  New Appointment
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showPayments} onOpenChange={() => setShowPayments(false)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Payment History
            </DialogTitle>
            <DialogDescription>
              {selectedAppointment && (
                <>
                  All payments for {selectedAppointment.patient.firstName}{" "}
                  {selectedAppointment.patient.lastName}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-6 mt-4">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 text-emerald-700 p-3 rounded-full">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedAppointment.patient.firstName}{" "}
                    {selectedAppointment.patient.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Treatment: {selectedAppointment.action.appointmentType.type}
                  </p>
                </div>
              </div>

              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="font-medium">Date</TableHead>
                      <TableHead className="font-medium">Time</TableHead>
                      <TableHead className="font-medium">Amount</TableHead>
                      <TableHead className="font-medium">Description</TableHead>
                      <TableHead className="font-medium">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientPayments.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center py-6 text-muted-foreground"
                        >
                          No payment records found
                        </TableCell>
                      </TableRow>
                    ) : (
                      patientPayments.map((pay) => (
                        <TableRow key={pay.id} className="hover:bg-emerald-50">
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                              {new Date(pay.date).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                              {new Date(pay.time).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium text-emerald-600">
                            ${pay.amount}
                          </TableCell>
                          <TableCell>{pay.description || "-"}</TableCell>
                          <TableCell>
                            <Badge
                              variant={getStatusBadgeVariant(pay.status.status)}
                            >
                              {pay.status.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => setShowNewPayment(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  New Payment
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={showNewAppointment}
        onOpenChange={() => setShowNewAppointment(false)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              New Appointment
            </DialogTitle>
            <DialogDescription>
              Schedule a new appointment for this patient
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Select Date</Label>
              <div className="border rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">
                    {new Intl.DateTimeFormat("en-US", {
                      month: "long",
                      year: "numeric",
                    }).format(new Date(newAppointment.date || new Date()))}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const date = new Date(
                          newAppointment.date || new Date()
                        );
                        date.setMonth(date.getMonth() - 1);
                        setNewAppointment({
                          ...newAppointment,
                          date: date.toISOString().split("T")[0],
                        });
                      }}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const date = new Date(
                          newAppointment.date || new Date()
                        );
                        date.setMonth(date.getMonth() + 1);
                        setNewAppointment({
                          ...newAppointment,
                          date: date.toISOString().split("T")[0],
                        });
                      }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-xs font-medium text-muted-foreground"
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {(() => {
                    const date = new Date(newAppointment.date || new Date());
                    const month = date.getMonth();
                    const year = date.getFullYear();
                    const firstDay = new Date(year, month, 1).getDay();
                    const daysInMonth = new Date(year, month + 1, 0).getDate();
                    const days = [];

                    // Empty cells for days before the first of the month
                    for (let i = 0; i < firstDay; i++) {
                      days.push(<div key={`empty-${i}`} className="h-8" />);
                    }

                    // Days of the month
                    for (let day = 1; day <= daysInMonth; day++) {
                      const dayDate = new Date(year, month, day);
                      const isToday =
                        dayDate.toDateString() === new Date().toDateString();
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const isPast = dayDate < today;
                      const isWeekend =
                        dayDate.getDay() === 5 || dayDate.getDay() === 6;
                      const isSelected =
                        newAppointment.date ===
                        dayDate.toISOString().split("T")[0];

                      days.push(
                        <div
                          key={day}
                          className={cn(
                            "flex items-center justify-center rounded-md h-8",
                            "text-center cursor-pointer transition-colors",
                            isToday && "bg-muted font-bold",
                            isPast &&
                              "text-muted-foreground cursor-not-allowed",
                            isWeekend &&
                              "text-muted-foreground cursor-not-allowed",
                            isSelected &&
                              "bg-primary text-primary-foreground hover:bg-primary/90",
                            !isPast &&
                              !isWeekend &&
                              !isSelected &&
                              "hover:bg-muted"
                          )}
                          onClick={() => {
                            if (!isPast && !isWeekend) {
                              setNewAppointment({
                                ...newAppointment,
                                date: dayDate.toISOString().split("T")[0],
                              });
                            }
                          }}
                        >
                          {day}
                        </div>
                      );
                    }

                    return days;
                  })()}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <div className="col-span-3">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <TimePicker
                    value={newAppointment.time}
                    onChange={(time) => {
                      if (time) {
                        // Convert 12-hour format to 24-hour format
                        const [timePart, period] = time.split(" ");
                        let [hours, minutes] = timePart.split(":");
                        if (period === "PM" && hours !== "12") {
                          hours = String(Number(hours) + 12);
                        } else if (period === "AM" && hours === "12") {
                          hours = "00";
                        }
                        const formattedTime = `${hours.padStart(
                          2,
                          "0"
                        )}:${minutes}`;
                        setNewAppointment({
                          ...newAppointment,
                          time: formattedTime,
                        });
                      } else {
                        setNewAppointment({
                          ...newAppointment,
                          time: "",
                        });
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="additionalNotes" className="text-right">
                Additional Notes
              </Label>
              <div className="col-span-3">
                <div className="flex items-start">
                  <FileText className="mr-2 h-4 w-4 text-muted-foreground mt-2" />
                  <Textarea
                    id="additionalNotes"
                    className="flex-1 min-h-[100px]"
                    value={newAppointment.additionalNotes}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        additionalNotes: e.target.value,
                      })
                    }
                    placeholder="Additional notes for the appointment"
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewAppointment(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleNewAppointment} className="gap-2">
              <Calendar className="h-4 w-4" />
              Save Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showNewPayment}
        onOpenChange={() => setShowNewPayment(false)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">New Payment</DialogTitle>
            <DialogDescription>
              Record a new payment for this patient
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <div className="col-span-3">
                <Select
                  value={newPayment.statusId.toString()}
                  onValueChange={(value) =>
                    setNewPayment({ ...newPayment, statusId: Number(value) })
                  }
                >
                  <SelectTrigger id="status" className="w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">PAID</SelectItem>
                    <SelectItem value="1">PENDING</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <div className="col-span-3">
                <div className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    className="flex-1"
                    value={newPayment.amount}
                    onChange={(e) =>
                      setNewPayment({ ...newPayment, amount: e.target.value })
                    }
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Select Date</Label>
              <div className="border rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">
                    {new Intl.DateTimeFormat("en-US", {
                      month: "long",
                      year: "numeric",
                    }).format(new Date(newPayment.date || new Date()))}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const date = new Date(newPayment.date || new Date());
                        date.setMonth(date.getMonth() - 1);
                        setNewPayment({
                          ...newPayment,
                          date: date.toISOString().split("T")[0],
                        });
                      }}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const date = new Date(newPayment.date || new Date());
                        date.setMonth(date.getMonth() + 1);
                        setNewPayment({
                          ...newPayment,
                          date: date.toISOString().split("T")[0],
                        });
                      }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-xs font-medium text-muted-foreground"
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {(() => {
                    const date = new Date(newPayment.date || new Date());
                    const month = date.getMonth();
                    const year = date.getFullYear();
                    const firstDay = new Date(year, month, 1).getDay();
                    const daysInMonth = new Date(year, month + 1, 0).getDate();
                    const days = [];

                    // Empty cells for days before the first of the month
                    for (let i = 0; i < firstDay; i++) {
                      days.push(<div key={`empty-${i}`} className="h-8" />);
                    }

                    // Days of the month
                    for (let day = 1; day <= daysInMonth; day++) {
                      const dayDate = new Date(year, month, day);
                      const isToday =
                        dayDate.toDateString() === new Date().toDateString();
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const isPast = dayDate < today;
                      const isWeekend =
                        dayDate.getDay() === 5 || dayDate.getDay() === 6;
                      const isSelected =
                        newPayment.date === dayDate.toISOString().split("T")[0];

                      days.push(
                        <div
                          key={day}
                          className={cn(
                            "flex items-center justify-center rounded-md h-8",
                            "text-center cursor-pointer transition-colors",
                            isToday && "bg-muted font-bold",
                            isPast &&
                              "text-muted-foreground cursor-not-allowed",
                            isWeekend &&
                              "text-muted-foreground cursor-not-allowed",
                            isSelected &&
                              "bg-primary text-primary-foreground hover:bg-primary/90",
                            !isPast &&
                              !isWeekend &&
                              !isSelected &&
                              "hover:bg-muted"
                          )}
                          onClick={() => {
                            if (!isPast && !isWeekend) {
                              setNewPayment({
                                ...newPayment,
                                date: dayDate.toISOString().split("T")[0],
                              });
                            }
                          }}
                        >
                          {day}
                        </div>
                      );
                    }

                    return days;
                  })()}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentTime" className="text-right">
                Time
              </Label>
              <div className="col-span-3">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <TimePicker
                    value={newPayment.time}
                    onChange={(time) => {
                      if (time) {
                        // Convert 12-hour format to 24-hour format
                        const [timePart, period] = time.split(" ");
                        let [hours, minutes] = timePart.split(":");
                        if (period === "PM" && hours !== "12") {
                          hours = String(Number(hours) + 12);
                        } else if (period === "AM" && hours === "12") {
                          hours = "00";
                        }
                        const formattedTime = `${hours.padStart(
                          2,
                          "0"
                        )}:${minutes}`;
                        setNewPayment({
                          ...newPayment,
                          time: formattedTime,
                        });
                      } else {
                        setNewPayment({
                          ...newPayment,
                          time: "",
                        });
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <div className="col-span-3">
                <div className="flex items-start">
                  <FileText className="mr-2 h-4 w-4 text-muted-foreground mt-2" />
                  <Textarea
                    id="description"
                    className="flex-1 min-h-[100px]"
                    value={newPayment.description}
                    onChange={(e) =>
                      setNewPayment({
                        ...newPayment,
                        description: e.target.value,
                      })
                    }
                    placeholder="Payment description"
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewPayment(false)}>
              Cancel
            </Button>
            <Button onClick={handleNewPayment} className="gap-2">
              <CreditCard className="h-4 w-4" />
              Save Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
