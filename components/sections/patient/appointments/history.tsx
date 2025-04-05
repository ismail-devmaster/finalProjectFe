"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  CheckCircle,
  ClipboardList,
  FileText,
  Filter,
  Search,
  ArrowUp,
  ArrowDown,
  Info,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchActions() {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    }

    if (patientId) {
      fetchActions();
    }
  }, [patientId]);

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
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };

  const [sortField, setSortField] = useState<"date" | "status">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: "date" | "status") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedActions = [...actions].sort((a, b) => {
    if (sortField === "date") {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    } else {
      // status
      const statusA = a.isCompleted ? 1 : 0;
      const statusB = b.isCompleted ? 1 : 0;
      return sortDirection === "asc" ? statusA - statusB : statusB - statusA;
    }
  });

  const getAppointmentTypeColor = (type: string) => {
    switch (type.toUpperCase()) {
      case "GENERAL":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "FOLLOW_UP":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "EMERGENCY":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-slate-100 text-slate-800 hover:bg-slate-100";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Appointment History</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin">
              <ClipboardList className="h-8 w-8 text-primary" />
            </div>
            <p className="text-muted-foreground">
              Loading appointment history...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-slate-500" />
              Appointment History
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-slate-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click on Date or Status headers to sort</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              A record of all your past appointments
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs defaultValue="all" className="w-full">
          <div className="px-6 pt-4">
            <TabsList>
              <TabsTrigger value="all">All Appointments</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <AppointmentTable
              actions={sortedActions}
              handleViewDetails={handleViewDetails}
              getAppointmentTypeColor={getAppointmentTypeColor}
            />
          </TabsContent>
        </Tabs>
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

interface AppointmentTableProps {
  actions: Action[];
  handleViewDetails: (action: Action) => void;
  getAppointmentTypeColor: (type: string) => string;
}

function AppointmentTable({
  actions,
  handleViewDetails,
  getAppointmentTypeColor,
}: AppointmentTableProps) {
  const [sortField, setSortField] = useState<"date" | "status">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: "date" | "status") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedActions = [...actions].sort((a, b) => {
    if (sortField === "date") {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    } else {
      // status
      const statusA = a.isCompleted ? 1 : 0;
      const statusB = b.isCompleted ? 1 : 0;
      return sortDirection === "asc" ? statusA - statusB : statusB - statusA;
    }
  });

  const hasActions =
    sortedActions.filter((action) => action.appointments?.length).length > 0;

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/50">
            <TableHead>
              <button
                onClick={() => handleSort("date")}
                className="flex items-center gap-1 hover:text-primary transition-colors font-medium"
              >
                Date
                {sortField === "date" ? (
                  sortDirection === "asc" ? (
                    <ArrowUp className="h-4 w-4 text-primary" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-primary" />
                  )
                ) : (
                  <span className="w-4 h-4" />
                )}
              </button>
            </TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead>
              <button
                onClick={() => handleSort("status")}
                className="flex items-center gap-1 hover:text-primary transition-colors font-medium"
              >
                Status
                {sortField === "status" ? (
                  sortDirection === "asc" ? (
                    <ArrowUp className="h-4 w-4 text-primary" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-primary" />
                  )
                ) : (
                  <span className="w-4 h-4" />
                )}
              </button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hasActions ? (
            sortedActions.map((action) => (
              <TableRow key={action.id} className="hover:bg-slate-50">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span className="font-medium">
                      {formatDate(action.startDate)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={getAppointmentTypeColor(
                      action.appointmentType.type
                    )}
                  >
                    {action.appointmentType.type.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-slate-400" />
                    <span>
                      {action.description || "No description available"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <CheckCircle
                      className={`h-4 w-4 ${
                        action.isCompleted
                          ? "text-emerald-500"
                          : "text-amber-500"
                      }`}
                    />
                    <Badge
                      variant="secondary"
                      className={
                        action.isCompleted
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                          : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                      }
                    >
                      {action.isCompleted ? "COMPLETED" : "PENDING"}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(action)}
                    className="text-xs"
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
                  <div className="rounded-full bg-slate-100 p-3">
                    <FileText className="h-6 w-6 text-slate-400" />
                  </div>
                  <div className="text-lg font-medium">
                    No appointment records found
                  </div>
                  <div className="text-sm text-muted-foreground max-w-sm">
                    There are no appointment records matching your criteria.
                    Appointments will appear here once they've been completed.
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
