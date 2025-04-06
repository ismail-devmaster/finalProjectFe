"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Calendar,
  CreditCard,
  ClipboardList,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Import the real API functions
import { patient } from "@/app/api";
import { appointment } from "@/app/api";
import { payment } from "@/app/api";
import { action } from "@/app/api";

interface Action {
  id: number;
  appointmentTypeId: number;
  patientId: number;
  description: string;
  totalPayment: number;
  startDate: string;
  endDate: string | null;
  appointmentType: {
    id: number;
    type: string;
  };
}

interface Patient {
  userId: number;
  medicalHistory: string | null;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phone: string;
    email: string;
    sex: { gender: string };
  };
}

const PaymentsDialog = ({
  isOpen,
  onClose,
  payments,
}: {
  isOpen: boolean;
  onClose: () => void;
  payments: any[];
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Payments</DialogTitle>
          <DialogDescription>
            Payment history for this appointment
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {payments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No payment records found
            </div>
          ) : (
            payments.map((payment) => (
              <Card
                key={payment.id}
                className="overflow-hidden border-l-4 border-l-emerald-500"
              >
                <CardContent className="p-6">
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-emerald-500" />
                        <span className="font-semibold text-lg">
                          Dr. {payment.doctor.user.firstName}{" "}
                          {payment.doctor.user.lastName}
                        </span>
                      </div>
                      <Badge
                        variant={
                          payment.status.status === "Paid"
                            ? "success"
                            : "outline"
                        }
                      >
                        {payment.status.status}
                      </Badge>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {new Date(payment.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClipboardList className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {new Date(payment.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm text-muted-foreground">
                        {payment.description}
                      </div>
                      <div className="text-lg font-bold text-emerald-600">
                        ${payment.amount}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AppointmentsDialog = ({
  isOpen,
  onClose,
  appointments,
}: {
  isOpen: boolean;
  onClose: () => void;
  appointments: any[];
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Appointments</DialogTitle>
          <DialogDescription>
            Appointment details for this treatment
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {appointments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No appointment records found
            </div>
          ) : (
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
                        variant={
                          appointment.status.status === "Completed"
                            ? "success"
                            : appointment.status.status === "Scheduled"
                            ? "secondary"
                            : appointment.status.status === "Cancelled"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {appointment.status.status}
                      </Badge>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {new Date(appointment.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClipboardList className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {new Date(appointment.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                    {appointment.additionalNotes && (
                      <div className="bg-muted/50 p-3 rounded-md text-sm mt-2">
                        <span className="font-medium">Notes:</span>{" "}
                        {appointment.additionalNotes}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ActionsDialog = ({
  isOpen,
  onClose,
  patientName,
  actions,
}: {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
  actions: Action[];
}) => {
  const [selectedAction, setSelectedAction] = React.useState<Action | null>(
    null
  );
  const [showPayments, setShowPayments] = React.useState(false);
  const [appointments, setAppointments] = React.useState<any[]>([]);
  const [payments, setPayments] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleViewAppointments = async (action: Action) => {
    setLoading(true);
    try {
      const appointmentsData = await appointment.getAppointmentsByActionId(
        action.id
      );
      console.log(appointmentsData.appointments);
      setAppointments(appointmentsData.appointments);
      setSelectedAction(action);
      setShowPayments(false);
    } catch (error) {
      console.error("Error fetching appointments", error);
    }
    setLoading(false);
  };

  const handleViewPayments = async (action: Action) => {
    setLoading(true);
    try {
      const paymentsData = await payment.getPaymentsByActionId(action.id);
      setPayments(paymentsData.payments);
      console.log(paymentsData.payments);
      setSelectedAction(action);
      setShowPayments(true);
    } catch (error) {
      console.error("Error fetching payments", error);
    }
    setLoading(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Treatment History
            </DialogTitle>
            <DialogDescription>
              All treatments for patient{" "}
              <span className="font-medium">{patientName}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {actions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No treatment records found for this patient
              </div>
            ) : (
              actions.map((action) => (
                <Card
                  key={action.id}
                  className="overflow-hidden border-l-4 border-l-sky-500 hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="grid gap-4">
                      <div className="flex items-center gap-2">
                        <div className="bg-sky-100 text-sky-700 p-2 rounded-full">
                          <ClipboardList className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {action.appointmentType.type}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Started on{" "}
                            {new Date(action.startDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {action.description && (
                        <div className="bg-muted/50 p-3 rounded-md text-sm">
                          <span className="font-medium">Description:</span>{" "}
                          {action.description}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mt-2">
                        <Button
                          variant="outline"
                          className="flex items-center gap-2 hover:bg-sky-50 hover:text-sky-700"
                          onClick={() => handleViewAppointments(action)}
                        >
                          <Calendar className="h-4 w-4" />
                          View Appointments
                        </Button>
                        <Button
                          variant="outline"
                          className="flex items-center gap-2 hover:bg-emerald-50 hover:text-emerald-700"
                          onClick={() => handleViewPayments(action)}
                        >
                          <CreditCard className="h-4 w-4" />
                          View Payments
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          {loading && (
            <div className="flex justify-center py-4">
              <div className="animate-pulse text-center">
                <div className="h-6 w-24 bg-muted rounded mx-auto"></div>
                <p className="text-sm text-muted-foreground mt-2">
                  Loading data...
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {selectedAction && !showPayments && (
        <AppointmentsDialog
          isOpen={!!selectedAction}
          onClose={() => setSelectedAction(null)}
          appointments={appointments}
        />
      )}

      {selectedAction && showPayments && (
        <PaymentsDialog
          isOpen={!!selectedAction}
          onClose={() => setSelectedAction(null)}
          payments={payments}
        />
      )}
    </>
  );
};

const ReceptionistPatient = () => {
  const [patients, setPatients] = React.useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedPatient, setSelectedPatient] = React.useState<Patient | null>(
    null
  );
  const [actions, setActions] = React.useState<Action[]>([]);
  const [loadingPatients, setLoadingPatients] = React.useState(false);
  const [loadingActions, setLoadingActions] = React.useState(false);
  const patientsPerPage = 10;

  React.useEffect(() => {
    const fetchPatients = async () => {
      setLoadingPatients(true);
      try {
        const patientsData = await patient.getAllPatients();
        setPatients(patientsData.patients);
      } catch (error) {
        console.error("Error fetching patients", error);
      }
      setLoadingPatients(false);
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePatientClick = async (patient: Patient) => {
    setSelectedPatient(patient);
    setLoadingActions(true);
    try {
      const actionsData = await action.getActionsByPatientId(patient.user.id);
      setActions(actionsData.actions);
    } catch (error) {
      console.error("Error fetching actions", error);
    }
    setLoadingActions(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-600 to-violet-600 bg-clip-text text-transparent">
          Patient Management
        </h1>
        <p className="text-muted-foreground mt-2">
          View and manage patient records and appointments
        </p>
      </div>

      <Card className="shadow-md border-t-4 border-t-sky-500">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-sky-500" />
            Patient Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="w-full md:w-1/3">
              <Label
                htmlFor="search-patients"
                className="text-sm font-medium mb-1.5 block"
              >
                Search Patients
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search-patients"
                  placeholder="Search by name..."
                  className="pl-10 bg-muted/40"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-end">
              <Badge variant="outline" className="h-9 px-4 text-sm">
                {filteredPatients.length} patients found
              </Badge>
            </div>
          </div>

          {loadingPatients ? (
            <div className="flex justify-center py-12">
              <div className="animate-pulse text-center">
                <div className="h-8 w-32 bg-muted rounded mx-auto"></div>
                <div className="h-4 w-48 bg-muted rounded mx-auto mt-2"></div>
                <p className="text-sm text-muted-foreground mt-4">
                  Loading patient data...
                </p>
              </div>
            </div>
          ) : (
            <>
              {currentPatients.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No patients found matching your search criteria
                </div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableCell className="font-medium">Name</TableCell>
                        <TableCell className="font-medium">Email</TableCell>
                        <TableCell className="font-medium">Phone</TableCell>
                        <TableCell className="font-medium">
                          Date of Birth
                        </TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentPatients.map((patient) => (
                        <TableRow
                          key={patient.userId}
                          className="cursor-pointer transition-colors hover:bg-sky-50"
                          onClick={() => handlePatientClick(patient)}
                        >
                          <TableCell className="font-medium">
                            {patient.user.firstName} {patient.user.lastName}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {patient.user.email}
                          </TableCell>
                          <TableCell>{patient.user.phone}</TableCell>
                          <TableCell>
                            {new Date(
                              patient.user.dateOfBirth
                            ).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </>
          )}

          <div className="flex items-center justify-between space-x-2 py-4 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex-1 text-center text-sm text-muted-foreground">
              Page {currentPage} of {totalPages || 1}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || totalPages === 0}
              className="gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedPatient && (
        <>
          {loadingActions ? (
            <div>Loading actions...</div>
          ) : (
            <ActionsDialog
              isOpen={!!selectedPatient}
              onClose={() => setSelectedPatient(null)}
              patientName={`${selectedPatient.user.firstName} ${selectedPatient.user.lastName}`}
              actions={actions}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ReceptionistPatient;
