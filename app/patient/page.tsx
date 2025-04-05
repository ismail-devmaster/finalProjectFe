"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  CalendarIcon,
  Clock,
  CreditCard,
  FileText,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { formatDate, formatTime } from "@/lib/utils";
import { appointment, patient, action } from "@/app/api";

export default function Dashboard() {
  const [patientData, setPatientData] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [nextAppointment, setNextAppointment] = useState<any>(null);
  const [waitingCount, setWaitingCount] = useState(0);
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [recentAppointments, setRecentAppointments] = useState<any[]>([]);
  const [paymentInfo, setPaymentInfo] = useState({
    totalPaid: 0,
    pendingBalance: 0,
    recentPayments: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [appointmentDates, setAppointmentDates] = useState<Date[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, you would get the patient ID from authentication
        const patientId = 1; // Example patient ID

        // Fetch patient data
        const patientResponse = await patient.getPatientById(patientId);
        setPatientData({
          ...patientResponse.patient,
          patientId: patientId.toString(),
          medicalHistory:
            "Patient has a history of hypertension and mild asthma. Regular check-ups recommended every 6 months. No known allergies to medications.",
        });

        // Fetch appointments
        const appointmentResponse =
          await appointment.getAppointmentsByPatientId(patientId);
        const allAppointments = appointmentResponse.appointments || [];
        setAppointments(allAppointments);

        // Filter appointments by status
        const waiting = allAppointments.filter(
          (app: any) => app.status.status === "WAITING"
        );
        const upcoming = allAppointments.filter(
          (app: any) => app.status.status === "UPCOMING"
        );
        const completed = allAppointments.filter(
          (app: any) => app.status.status === "COMPLETED"
        );

        setWaitingCount(waiting.length);
        setUpcomingCount(upcoming.length);

        // Get next appointment (closest upcoming appointment)
        if (upcoming.length > 0) {
          const sortedUpcoming = [...upcoming].sort(
            (a, b) =>
              new Date(a.date + "T" + a.time).getTime() -
              new Date(b.date + "T" + b.time).getTime()
          );
          setNextAppointment(sortedUpcoming[0]);
        }

        // Get recent appointments (3 most recent from any category)
        const sortedRecent = [...allAppointments]
          .sort(
            (a, b) =>
              new Date(b.date + "T" + b.time).getTime() -
              new Date(a.date + "T" + a.time).getTime()
          )
          .slice(0, 3);
        setRecentAppointments(sortedRecent);

        // Get appointment dates for calendar
        const dates = allAppointments.map((app: any) => new Date(app.date));
        setAppointmentDates(dates);

        // Fetch payment information
        const actionsResponse = await action.getActionsByPatientId(patientId);
        const actions = actionsResponse.actions || [];

        // Calculate payment totals
        let totalPaid = 0;
        let pendingBalance = 0;
        let recentPayments: any[] = [];

        actions.forEach((action: any) => {
          if (action.payments) {
            action.payments.forEach((payment: any) => {
              if (payment.statusId === 2) {
                // Completed payment
                totalPaid += payment.amount || 0;
                recentPayments.push({
                  ...payment,
                  date: payment.date,
                  appointmentType: action.appointmentType.type,
                });
              } else {
                // Pending payment
                pendingBalance += payment.amount || 0;
              }
            });
          }
        });

        // Sort recent payments by date and take the 3 most recent
        recentPayments.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        recentPayments = recentPayments.slice(0, 3);

        setPaymentInfo({ totalPaid, pendingBalance, recentPayments });
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin">
            <CalendarIcon className="h-8 w-8 text-primary" />
          </div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      {/* Header & Welcome */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {patientData?.user?.firstName || "Patient"}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's an overview of your health appointments and records
          </p>
        </div>
        <Button size="lg" className="gap-2" asChild>
          <Link href="/appointments/new">
            <CalendarIcon className="h-5 w-5" />
            Book New Appointment
          </Link>
        </Button>
      </div>

      {/* At-a-Glance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Next Appointment */}
        <Card className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Next Appointment
            </CardTitle>
          </CardHeader>
          <CardContent>
            {nextAppointment ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  <span className="font-medium">
                    {formatDate(nextAppointment.date)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{formatTime(nextAppointment.time)}</span>
                </div>
                <div className="font-medium">
                  Dr. {nextAppointment.doctor.user.firstName}{" "}
                  {nextAppointment.doctor.user.lastName}
                </div>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/appointments">View Details</Link>
                </Button>
              </div>
            ) : (
              <div className="text-muted-foreground text-sm py-2">
                No upcoming appointments
              </div>
            )}
          </CardContent>
        </Card>

        {/* Waiting Appointments */}
        <Card className="bg-gradient-to-br from-white to-amber-50 dark:from-gray-900 dark:to-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Waiting Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-bold">{waitingCount}</div>
              <div className="text-sm text-muted-foreground">
                Pending confirmation
              </div>
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href="/appointments?status=waiting">Manage</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-bold">{upcomingCount}</div>
              <div className="text-sm text-muted-foreground">
                Scheduled visits
              </div>
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href="/appointments?status=upcoming">View Calendar</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payments Overview */}
        <Card className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Payments Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Total Paid:
                </span>
                <span className="font-medium">
                  ${paymentInfo.totalPaid.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Pending:</span>
                <span className="font-medium">
                  ${paymentInfo.pendingBalance.toFixed(2)}
                </span>
              </div>
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href="/payments">View All</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Calendar & Profile */}
        <div className="space-y-8">
          {/* Calendar Snapshot */}
          <Card id="calendar" className="border shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                highlightedDays={appointmentDates.map((date) => date.getDate())}
              />
              <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-primary"></div>
                  <span>Appointment</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-muted"></div>
                  <span>Today</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Snapshot */}
          <Card className="border shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Profile Snapshot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center mb-4">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage
                    src="/placeholder.svg?height=80&width=80"
                    alt="Profile Picture"
                  />
                  <AvatarFallback>
                    {patientData?.user?.firstName?.[0]}
                    {patientData?.user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">
                  {patientData?.user?.firstName} {patientData?.user?.lastName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Patient ID: {patientData?.id}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{patientData?.user?.phone || "No phone number"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{patientData?.user?.email || "No email"}</span>
                </div>
              </div>

              <div className="mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/profile">Edit Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications & Reminders */}
          <Card className="border shadow-md bg-amber-50 dark:bg-amber-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <Bell className="h-5 w-5" />
                Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nextAppointment && (
                  <div className="rounded-lg bg-white dark:bg-gray-800 p-3 shadow-sm">
                    <div className="font-medium">Upcoming Appointment</div>
                    <p className="text-sm text-muted-foreground">
                      You have an appointment on{" "}
                      {formatDate(nextAppointment.date)} at{" "}
                      {formatTime(nextAppointment.time)}
                    </p>
                  </div>
                )}

                {paymentInfo.pendingBalance > 0 && (
                  <div className="rounded-lg bg-white dark:bg-gray-800 p-3 shadow-sm">
                    <div className="font-medium">Payment Due</div>
                    <p className="text-sm text-muted-foreground">
                      You have a pending balance of $
                      {paymentInfo.pendingBalance.toFixed(2)}
                    </p>
                  </div>
                )}

                {!nextAppointment && paymentInfo.pendingBalance === 0 && (
                  <div className="text-sm text-muted-foreground">
                    No active reminders at this time.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Appointments & Activity */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Appointments */}
          <Card className="border shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                Recent Appointments
              </CardTitle>
              <Button variant="ghost" size="sm" className="gap-1" asChild>
                <Link href="/appointments">
                  View All <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {recentAppointments.length > 0 ? (
                <div className="space-y-4">
                  {recentAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-start gap-4 p-3 rounded-lg border"
                    >
                      <div className="flex-shrink-0">
                        <div
                          className={`p-2 rounded-full ${
                            appointment.status.status === "COMPLETED"
                              ? "bg-green-100 text-green-700"
                              : appointment.status.status === "UPCOMING"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {appointment.status.status === "COMPLETED" ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : appointment.status.status === "UPCOMING" ? (
                            <CalendarIcon className="h-5 w-5" />
                          ) : (
                            <AlertCircle className="h-5 w-5" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium truncate">
                            {appointment.action.appointmentType.type.replace(
                              "_",
                              " "
                            )}
                          </h4>
                          <Badge variant="outline">
                            {appointment.status.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {formatDate(appointment.date)} at{" "}
                          {formatTime(appointment.time)}
                        </div>
                        <div className="text-sm mt-1">
                          Dr. {appointment.doctor.user.firstName}{" "}
                          {appointment.doctor.user.lastName}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">
                    No recent appointments found.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Payments */}
          <Card className="border shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Recent Payments
              </CardTitle>
              <Button variant="ghost" size="sm" className="gap-1" asChild>
                <Link href="/payments">
                  View All <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {paymentInfo.recentPayments.length > 0 ? (
                <div className="space-y-4">
                  {paymentInfo.recentPayments.map((payment, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-3 rounded-lg border"
                    >
                      <div className="flex-shrink-0">
                        <div className="p-2 rounded-full bg-green-100 text-green-700">
                          <CreditCard className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium truncate">
                            {payment.appointmentType.replace("_", " ")}
                          </h4>
                          <span className="font-medium text-green-600">
                            ${payment.amount.toFixed(2)}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {formatDate(payment.date)}
                        </div>
                        <div className="text-sm mt-1">
                          {payment.description || "Payment received"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">
                    No recent payments found.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Appointment Statistics */}
          <Card className="border shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Appointment Statistics
              </CardTitle>
              <CardDescription>
                Overview of your appointment history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Total Appointments */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-slate-200 dark:bg-slate-700">
                      <FileText className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                    </div>
                    <span>Total Appointments</span>
                  </div>
                  <span className="font-bold text-lg">
                    {appointments.length}
                  </span>
                </div>

                {/* Completed Appointments */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-200 dark:bg-green-800">
                      <CheckCircle className="h-5 w-5 text-green-700 dark:text-green-300" />
                    </div>
                    <span>Completed</span>
                  </div>
                  <span className="font-bold text-lg">
                    {
                      appointments.filter(
                        (app) => app.status.status === "COMPLETED"
                      ).length
                    }
                  </span>
                </div>

                {/* Upcoming Appointments */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-200 dark:bg-blue-800">
                      <CalendarIcon className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                    </div>
                    <span>Upcoming</span>
                  </div>
                  <span className="font-bold text-lg">{upcomingCount}</span>
                </div>

                {/* Waiting Appointments */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-amber-200 dark:bg-amber-800">
                      <AlertCircle className="h-5 w-5 text-amber-700 dark:text-amber-300" />
                    </div>
                    <span>Waiting</span>
                  </div>
                  <span className="font-bold text-lg">{waitingCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer / Help */}
      <div className="mt-12 pt-6 border-t">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-2">Support</h3>
            <div className="space-y-2">
              <Button variant="link" className="p-0 h-auto">
                Contact Support
              </Button>
              <Button variant="link" className="p-0 h-auto">
                FAQs
              </Button>
              <Button variant="link" className="p-0 h-auto">
                Privacy Policy
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Clinic Hours</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p>Saturday: 9:00 AM - 1:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Emergency Contact</h3>
            <div className="text-sm space-y-1">
              <p className="font-medium">For emergencies, please call:</p>
              <p className="text-lg font-bold text-primary">1-800-HEALTH</p>
              <p className="text-muted-foreground">Available 24/7</p>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Health Clinic. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
