"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, DollarSign, FileText, User } from "lucide-react";
import { action } from "@/app/api/action";
import { payment } from "@/app/api/payment";
import { patient } from "@/app/api/patient";

// Helper function to get appointment type badge color
const getAppointmentTypeColor = (type: string) => {
  switch (type) {
    case "GENERAL":
      return "bg-blue-100 text-blue-800";
    case "FOLLOW_UP":
      return "bg-green-100 text-green-800";
    case "EMERGENCY":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Helper function to get status badge color
const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "COMPLETED":
      return "bg-green-100 text-green-800";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function PaymentsHistory() {
  const [actions, setActions] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [selectedAction, setSelectedAction] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const patientIdData = await patient.getPatientId();
        const actionData = await action.getActionsByPatientId(
          patientIdData.patientId
        );
        setActions(actionData.actions);
      } catch (error) {
        console.error("Error fetching actions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActions();
  }, []);

  const handleViewDetails = async (actionId: number) => {
    setSelectedAction(actionId);
    setIsDialogOpen(true);
    try {
      const paymentsData = await payment.getPaymentsByActionId(actionId);
      setPayments(paymentsData.payments);
    } catch (error) {
      console.error("Error fetching payments:", error);
      setPayments([]);
    }
  };

  const actionDetails = selectedAction
    ? actions.find((action) => action.id === selectedAction)
    : null;

  if (isLoading) {
    return <div className="container mx-auto py-8 px-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center dark:text-white">
        Payments History
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
          <CardDescription>
            View all actions and their payment details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Total Payment</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {actions.map((action) => (
                  <TableRow key={action.id}>
                    <TableCell>
                      {format(new Date(action.startDate), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={getAppointmentTypeColor(
                          action.appointmentType.type
                        )}
                      >
                        {action.appointmentType.type.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>{action.description || "—"}</TableCell>
                    <TableCell>
                      ${action.totalPayment?.toFixed(2) || "0.00"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(action.id)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>
              {actionDetails && (
                <div className="flex flex-col gap-1 mt-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {format(
                        new Date(actionDetails.startDate),
                        "MMMM dd, yyyy"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{actionDetails.description || "No description"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={getAppointmentTypeColor(
                        actionDetails.appointmentType.type
                      )}
                    >
                      {actionDetails.appointmentType.type.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          {payments.length > 0 ? (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-4">Payments</h3>
              <div className="grid gap-4">
                {payments.map((payment) => (
                  <Card key={payment.id}>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              Date:{" "}
                              {format(new Date(payment.date), "MMMM dd, yyyy")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              Time: {format(new Date(payment.time), "hh:mm a")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              Amount: ${payment.amount?.toFixed(2) || "0.00"}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              Doctor:{" "}
                              {payment.doctor?.user
                                ? `${payment.doctor.user.firstName} ${payment.doctor.user.lastName}`
                                : "Unknown"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              Description:{" "}
                              {payment.description || "No description"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={getStatusColor(
                                payment.status?.status || ""
                              )}
                            >
                              {payment.status?.status || "Unknown"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">
                No payments found for this action
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
