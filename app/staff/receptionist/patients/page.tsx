"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
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
} from "@/components/ui/dialog";

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
          <DialogTitle>Payments</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {payments.map((payment) => (
            <Card key={payment.id}>
              <CardContent className="pt-6">
                <div className="grid gap-3">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">
                      Dr. {payment.doctor.user.firstName}{" "}
                      {payment.doctor.user.lastName}
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {payment.status.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div>
                      Date: {new Date(payment.date).toLocaleDateString()}
                    </div>
                    <div>
                      Time:{" "}
                      {new Date(payment.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="text-muted-foreground">
                      {payment.description}
                    </div>
                    <div className="font-medium">Amount: ${payment.amount}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
          <DialogTitle>Appointments</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardContent className="pt-6">
                <div className="grid gap-3">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">
                      Dr. {appointment.doctor.user.firstName}{" "}
                      {appointment.doctor.user.lastName}
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {appointment.status.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div>
                      Date: {new Date(appointment.date).toLocaleDateString()}
                    </div>
                    <div>
                      Time:{" "}
                      {new Date(appointment.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  {appointment.additionalNotes && (
                    <div className="text-sm">
                      <span className="font-medium">Notes:</span>{" "}
                      {appointment.additionalNotes}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
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
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Actions History - {patientName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {actions.map((action) => (
              <Card key={action.id}>
                <CardContent className="pt-6">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <div className="font-semibold">
                        Action Type: {action.appointmentType.type}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Description: {action.description}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Date: {new Date(action.startDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleViewAppointments(action)}
                      >
                        View Appointments
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleViewPayments(action)}
                      >
                        View Payments
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {loading && <div>Loading...</div>}
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
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center dark:text-gray-100">
        Patient Management
      </h1>
      <Card className="col-span-2 mb-6">
        <CardHeader>
          <CardTitle>Patient Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="w-1/3">
              <Label htmlFor="search-patients">Search Patients</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search-patients"
                  placeholder="Search patients..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          {loadingPatients ? (
            <div>Loading patients...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Date of Birth</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPatients.map((patient) => (
                  <TableRow
                    key={patient.userId}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handlePatientClick(patient)}
                  >
                    <TableCell>
                      {patient.user.firstName} {patient.user.lastName}
                    </TableCell>
                    <TableCell>{patient.user.email}</TableCell>
                    <TableCell>{patient.user.phone}</TableCell>
                    <TableCell>
                      {new Date(patient.user.dateOfBirth).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <div className="flex items-center justify-between space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex-1 text-center text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
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
