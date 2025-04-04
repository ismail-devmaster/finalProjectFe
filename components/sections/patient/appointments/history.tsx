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
import { Calendar, CheckCircle, FileText, Tag, User } from "lucide-react";
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
  doctor: {
    user: {
      firstName: string;
      lastName: string;
    };
  };
  doctorId: number;
  statusId: number;
  status: {
    status: string;
  };
}

interface Action {
  id: number;
  startDate: string;
  appointmentType: AppointmentType;
  description: string;
  isCompleted: boolean;
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
          const { actions } = await action.getActionsByPatientId(patientId);
          const filteredActions = actions.filter((action: Action) =>
            action.appointments!.some(
              // Assuming statusId === 3 represents "Completed" status
              (appointment) => appointment.statusId === 3
            )
          );
          setActions(filteredActions);
        }
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    }
    if (patientId) {
      fetchActions();
    }
  }, []);
  const handleViewDetails = async (actionItem: Action) => {
    setSelectedAction(actionItem);
    try {
      const { appointments } = await appointment.getAppointmentsByActionId(
        actionItem.id
      );
      const filterAppointments = appointments.filter(
        (appointment: Appointment) => appointment.status.status === "COMPLETED"
      );
      setAppointments(filterAppointments);
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
      <CardContent>
        <div className="overflow-x-auto">
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
                        {action.description || "No description available"}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        {action.isCompleted ? "COMPLETED" : "PENDING"}
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
