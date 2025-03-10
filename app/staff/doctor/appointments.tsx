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
<<<<<<< HEAD
  DialogHeader,
  DialogTitle,
  DialogFooter,
=======
  DialogFooter,
  DialogHeader,
  DialogTitle,
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
<<<<<<< HEAD
import { appointment } from "@/app/api/appointment";
import { payment } from "@/app/api/payment";
=======
import { appointment } from "@/app/api";
import { payment } from "@/app/api";
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95

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
  id: number;
  user: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    sex: {
      gender: string;
    };
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

export default function Appointments({
  appointments,
  patients,
}: AppointmentsProps) {
<<<<<<< HEAD
  const [selectedAppointment, setselectedAppointment] =
    React.useState<Appointment | null>(null);
=======
  const [selectedAppointment, setselectedAppointment] = React.useState<
    Appointment | null
  >(null);
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95
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
    date: "",
    time: "",
    notes: "",
  });

  const [newPayment, setNewPayment] = React.useState({
    amount: "",
    date: "",
    time: "",
    description: "",
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
<<<<<<< HEAD
    []
=======
    [],
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95
  );

  const filteredAppointments = React.useMemo(() => {
    return appointments.filter((appointment) => {
<<<<<<< HEAD
      const matchesStatus =
        selectedStatus === "ALL" ||
=======
      const matchesStatus = selectedStatus === "ALL" ||
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95
        appointment.status.status.toUpperCase() === selectedStatus;

      const matchesDate = isInDateRange(appointment.date, selectedDate);

      return matchesStatus && matchesDate;
    });
  }, [appointments, selectedStatus, selectedDate, isInDateRange]);

  const handleAppointmentsClick = async (actionId: number) => {
    const res = await appointment.getAppointmentsByActionId(actionId);
    setPatientAppointments(res.appointments);
    setselectedAppointment(
<<<<<<< HEAD
      appointments.find((app) => app.actionId === actionId) || null
=======
      appointments.find((app) => app.actionId === actionId) || null,
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95
    );
    setShowAppointments(true);
  };
  const handlePaymentsClick = async (actionId: number) => {
    const res = await payment.getPaymentsByActionId(actionId);
    setPatientPayments(res.payments);
    setselectedAppointment(
<<<<<<< HEAD
      appointments.find((app) => app.actionId === actionId) || null
=======
      appointments.find((app) => app.actionId === actionId) || null,
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95
    );
    setShowPayments(true);
  };

  const handleNewAppointment = async () => {
    try {
      await appointment.createAppointment(newAppointment);
      console.log("New appointment created:", newAppointment);
      setShowNewAppointment(false);
      setNewAppointment({ date: "", time: "", notes: "" });
      // Optionally, refresh the appointments list here
    } catch (error) {
      console.error("Error creating appointment:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const handleNewPayment = async () => {
    try {
      const payData = {
        actionId: selectedAppointment?.actionId,
        patientId: selectedAppointment?.patientId,
        doctorId: selectedAppointment?.doctorId,
        amount: Number(newPayment.amount),
        date: newPayment.date,
        time: newPayment.time,
        description: newPayment.description,
        statusId: 1,
      };
      console.log("New payment data:", payData);
      await payment.createPayment(payData);
      setShowNewPayment(false);
      setNewPayment({ amount: "", date: "", time: "", description: "" });
      // Optionally, refresh the payments list here
    } catch (error) {
      console.error("Error creating payment:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Appointments</CardTitle>
              <CardDescription>Manage your appointments</CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <Select
                value={selectedDate}
                onValueChange={(value) => setSelectedDate(value as DateFilter)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  {DATE_OPTIONS.map((dateOption) => (
                    <SelectItem key={dateOption} value={dateOption}>
<<<<<<< HEAD
                      {dateOption === "ALL"
                        ? "All Dates"
                        : dateOption
                            .split("_")
                            .map(
                              (word) =>
                                word.charAt(0) + word.slice(1).toLowerCase()
                            )
                            .join(" ")}
=======
                      {dateOption === "ALL" ? "All Dates" : dateOption
                        .split("_")
                        .map(
                          (word) =>
                            word.charAt(0) + word.slice(1).toLowerCase(),
                        )
                        .join(" ")}
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === "ALL" ? "All Status" : status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
<<<<<<< HEAD
              {filteredAppointments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground"
                  >
                    No appointments found for the selected filters
                  </TableCell>
                </TableRow>
              ) : (
                filteredAppointments.map((appointment) => (
                  <TableRow
                    key={appointment.id}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <TableCell>
                      {appointment.patient.user.firstName}{" "}
                      {appointment.patient.user.lastName}
                    </TableCell>
                    <TableCell>
                      {new Date(appointment.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(appointment.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell>
                      {appointment.action.appointmentType.type}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          appointment.status.status === "Confirmed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {appointment.status.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2"
                        onClick={() =>
                          handleAppointmentsClick(appointment.actionId)
                        }
                      >
                        Appointments
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handlePaymentsClick(appointment.actionId)
                        }
                      >
                        Payments
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
=======
              {filteredAppointments.length === 0
                ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-muted-foreground"
                    >
                      No appointments found for the selected filters
                    </TableCell>
                  </TableRow>
                )
                : (
                  filteredAppointments.map((appointment) => (
                    <TableRow
                      key={appointment.id}
                      className="cursor-pointer hover:bg-muted/50"
                    >
                      <TableCell>
                        {appointment.patient.user.firstName}{" "}
                        {appointment.patient.user.lastName}
                      </TableCell>
                      <TableCell>
                        {new Date(appointment.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(appointment.time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                      <TableCell>
                        {appointment.action.appointmentType.type}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={appointment.status.status === "Confirmed"
                            ? "default"
                            : "secondary"}
                        >
                          {appointment.status.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2"
                          onClick={() =>
                            handleAppointmentsClick(appointment.actionId)}
                        >
                          Appointments
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handlePaymentsClick(appointment.actionId)}
                        >
                          Payments
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={showAppointments}
        onOpenChange={() => setShowAppointments(false)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {selectedAppointment.patient.user.firstName}{" "}
                {selectedAppointment.patient.user.lastName}
                's Appointments
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patientAppointments.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>
                        {new Date(app.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(app.time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                      <TableCell>{app.action.appointmentType.type}</TableCell>
                      <TableCell>
                        <Badge
<<<<<<< HEAD
                          variant={
                            app.status.status === "Confirmed"
                              ? "default"
                              : "secondary"
                          }
=======
                          variant={app.status.status === "Confirmed"
                            ? "default"
                            : "secondary"}
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95
                        >
                          {app.status.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button onClick={() => setShowNewAppointment(true)}>
                New Appointment
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showPayments} onOpenChange={() => setShowPayments(false)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {selectedAppointment.patient.user.firstName}{" "}
                {selectedAppointment.patient.user.lastName}
                's Payments
              </h3>
              {/* Here you would map through the patient's payments */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>amount</TableHead>
                    <TableHead>description</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patientPayments.map((pay) => (
                    <TableRow key={pay.id}>
                      <TableCell>
                        {new Date(pay.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(pay.time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                      <TableCell>{pay.amount}</TableCell>
                      <TableCell>{pay.description || "-"}</TableCell>
                      <TableCell>
                        <Badge
<<<<<<< HEAD
                          variant={
                            pay.status.status === "Confirmed"
                              ? "default"
                              : "secondary"
                          }
=======
                          variant={pay.status.status === "Confirmed"
                            ? "default"
                            : "secondary"}
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95
                        >
                          {pay.status.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button onClick={() => setShowNewPayment(true)}>
                New Payment
              </Button>
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
            <DialogTitle>New Appointment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                className="col-span-3"
                value={newAppointment.date}
                onChange={(e) =>
<<<<<<< HEAD
                  setNewAppointment({ ...newAppointment, date: e.target.value })
                }
=======
                  setNewAppointment({
                    ...newAppointment,
                    date: e.target.value,
                  })}
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <Input
                id="time"
                type="time"
                className="col-span-3"
                value={newAppointment.time}
                onChange={(e) =>
<<<<<<< HEAD
                  setNewAppointment({ ...newAppointment, time: e.target.value })
                }
=======
                  setNewAppointment({
                    ...newAppointment,
                    time: e.target.value,
                  })}
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="notes"
                className="col-span-3"
                value={newAppointment.notes}
<<<<<<< HEAD
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    notes: e.target.value,
                  })
                }
=======
                onChange={(e) => setNewAppointment({
                  ...newAppointment,
                  notes: e.target.value,
                })}
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleNewAppointment}>Save Appointment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showNewPayment}
        onOpenChange={() => setShowNewPayment(false)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>New Payment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                className="col-span-3"
                value={newPayment.amount}
                onChange={(e) =>
<<<<<<< HEAD
                  setNewPayment({ ...newPayment, amount: e.target.value })
                }
=======
                  setNewPayment({ ...newPayment, amount: e.target.value })}
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentDate" className="text-right">
                Date
              </Label>
              <Input
                id="paymentDate"
                type="date"
                className="col-span-3"
                value={newPayment.date}
                onChange={(e) =>
<<<<<<< HEAD
                  setNewPayment({ ...newPayment, date: e.target.value })
                }
=======
                  setNewPayment({ ...newPayment, date: e.target.value })}
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentTime" className="text-right">
                Time
              </Label>
              <Input
                id="paymentTime"
                type="time"
                className="col-span-3"
                value={newPayment.time}
                onChange={(e) =>
<<<<<<< HEAD
                  setNewPayment({ ...newPayment, time: e.target.value })
                }
=======
                  setNewPayment({ ...newPayment, time: e.target.value })}
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                className="col-span-3"
                value={newPayment.description}
<<<<<<< HEAD
                onChange={(e) =>
                  setNewPayment({
                    ...newPayment,
                    description: e.target.value,
                  })
                }
=======
                onChange={(e) => setNewPayment({
                  ...newPayment,
                  description: e.target.value,
                })}
>>>>>>> ccdfed42d2f3e66a843c98c2fdb4312fb07caa95
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleNewPayment}>Save Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
