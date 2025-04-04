"use client";

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
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, FileText } from "lucide-react";
import { usePatientPayments } from "@/hooks/pages/usePatientPayments";
export default function PaymentsHistory() {
  const {
    actions,
    payments,
    isDialogOpen,
    setIsDialogOpen,
    isLoading,
    handleViewDetails,
    actionDetails,
  } = usePatientPayments();
  if (isLoading) {
    return <div className="container mx-auto py-8 px-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center dark:text-white">
        Payments History
      </h1>
      <ActionsTable actions={actions} handleViewDetails={handleViewDetails} />
      <PaymentDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        actionDetails={actionDetails}
        payments={payments}
      />
    </div>
  );
}
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
const ActionsTable = ({
  actions,
  handleViewDetails,
}: {
  actions: any[];
  handleViewDetails: (id: number) => void;
}) => (
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
            {actions.filter((action) => action.payments?.length).length > 0 ? (
              actions
                .filter((action) => action.payments?.length)
                .map((action) => (
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
                    <TableCell>
                      {action.description || "No description available"}
                    </TableCell>
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
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                      <FileText className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div className="text-lg font-medium">
                      No payment records found
                    </div>
                    <div className="text-sm text-muted-foreground max-w-sm">
                      There are no payment records matching your criteria.
                      Payments will appear here once they've been processed.
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
);

const PaymentDialog = ({ isOpen, setIsOpen, actionDetails, payments }: any) => (
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>Payment Details</DialogTitle>
        <DialogDescription>
          {actionDetails && (
            <div className="flex flex-col gap-1 mt-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  {format(new Date(actionDetails.startDate), "MMMM dd, yyyy")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>
                  {actionDetails.description || "No description available"}
                </span>
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
      {payments?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Payment History</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment: any) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div>{format(new Date(payment.date), "MMM dd, yyyy")}</div>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(payment.time), "h:mm a")}
                    </div>
                  </TableCell>
                  <TableCell>${payment.amount?.toFixed(2)}</TableCell>
                  <TableCell>
                    {payment.description || "No description available"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={payment.statusId === 2 ? "default" : "secondary"}
                    >
                      {payment.statusId === 2 ? "COMPLETED" : "PENDING"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </DialogContent>
  </Dialog>
);
