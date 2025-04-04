"use client";

import { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  FileText,
  Tag,
  User,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { ActionDetailsModal } from "./action-details-modal";
import { action } from "@/app/api";
import { appointment } from "@/app/api";

interface AppointmentType {
  id: number;
  type: string;
}

interface Appointment {
  id: number;
  date: string;
  time: string;
  doctorId: number;
  status: {
    status: string;
  };
}

interface Action {
  id: number;
  startDate: string;
  appointmentType: AppointmentType;
  description: string;
  appointments?: Appointment[];
  endDate: string;
  totalPayment: number;
}

interface HistoryProps {
  patientId: number | undefined;
}

export function History({ patientId }: HistoryProps) {
  const [actions, setActions] = useState<Action[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useEffect(() => {
    async function fetchActions() {
      try {
        if (patientId) {
          const actionData = await action.getActionsByPatientId(patientId);
          setActions(actionData.actions);
        }
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    }
    if (patientId) {
      fetchActions();
    }
  }, [patientId]);
  const handleViewDetails = async (actionItem: Action) => {
    setSelectedAction(actionItem);
    try {
      const appointmentData = await appointment.getAppointmentsByActionId(
        actionItem.id
      );
      setAppointments(appointmentData.appointments);
      console.log(actionItem);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointment History</CardTitle>
        <CardDescription>
          A record of all your past appointments.
        </CardDescription>
      </CardHeader>
      {/* <CardContent>
        {actions.length === 0
          ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium">No appointment history</h3>
              <p className="text-muted-foreground max-w-md mt-2">
                You don't have any past appointments in your history.
              </p>
            </div>
          )
          : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Started Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {actions.map((action) => {
                  const appointment = action.appointments &&
                    action.appointments[0];
                  const status = "Unknown";
                  return (
                    <TableRow key={action.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {formatDate(action.startDate)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-muted-foreground" />
                          {action.appointmentType.type.replace("_", " ")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {action.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-muted-foreground" />
                          {status}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(action)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
      </CardContent> */}

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableRow>
                  <TableHead>Started Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableRow>
            </TableHeader>
            <TableBody>
              {actions.filter((action) => action.appointments?.length).length >
              0 ? (
                actions.map((action) => (
                  <TableRow key={action.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {formatDate(action.startDate)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        {action.appointmentType.type.replace("_", " ")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {action.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        {status}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(action)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                        <FileText className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div className="text-lg font-medium">
                        No appointment records found
                      </div>
                      <div className="text-sm text-muted-foreground max-w-sm">
                        There are no appointment records matching your criteria.
                        Appointments will appear here once they've been
                        processed.
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {selectedAction && (
        <ActionDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          action={selectedAction}
          appointments={appointments || []}
        />
      )}
    </Card>
  );
}
