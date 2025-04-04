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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  CreditCard,
  DollarSign,
  FileText,
  Filter,
  Receipt,
  Search,
} from "lucide-react";
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
    return (
      <div className="container mx-auto py-12 px-4 flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin">
            <CreditCard className="h-8 w-8 text-primary" />
          </div>
          <p className="text-muted-foreground">Loading payment history...</p>
        </div>
      </div>
    );
  }

  const hasPayments = actions.some((action) => action.payments?.length);

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Payments History
          </h1>
          <p className="text-muted-foreground mt-1">
            View and manage your payment records
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search payments..."
              className="pl-9 h-10 w-full md:w-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Payments</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <PaymentsSummaryCards actions={actions} />
          <ActionsTable
            actions={actions}
            handleViewDetails={handleViewDetails}
          />
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <PaymentsSummaryCards
            actions={actions.filter((a) =>
              a.payments?.some((p) => p.statusId === 2)
            )}
          />
          <ActionsTable
            actions={actions.filter((a) =>
              a.payments?.some((p) => p.statusId === 2)
            )}
            handleViewDetails={handleViewDetails}
          />
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          <PaymentsSummaryCards
            actions={actions.filter((a) =>
              a.payments?.some((p) => p.statusId !== 2)
            )}
          />
          <ActionsTable
            actions={actions.filter((a) =>
              a.payments?.some((p) => p.statusId !== 2)
            )}
            handleViewDetails={handleViewDetails}
          />
        </TabsContent>
      </Tabs>

      <PaymentDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        actionDetails={actionDetails}
        payments={payments}
      />
    </div>
  );
}

const PaymentsSummaryCards = ({ actions }: { actions: any[] }) => {
  const filteredActions = actions.filter((action) => action.payments?.length);

  // Calculate total paid amount
  const totalPaid = filteredActions.reduce((sum, action) => {
    const completedPayments =
      action.payments?.filter((p) => p.statusId === 3) || [];
    return (
      sum + completedPayments.reduce((pSum, p) => pSum + (p.amount || 0), 0)
    );
  }, 0);

  // Calculate pending amount
  const pendingAmount = filteredActions.reduce((sum, action) => {
    const pendingPayments =
      action.payments?.filter((p) => p.statusId !== 2) || [];
    return sum + pendingPayments.reduce((pSum, p) => pSum + (p.amount || 0), 0);
  }, 0);

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
          <DollarSign className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-600">
            ${totalPaid.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Across {filteredActions.length} appointments
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Payments
          </CardTitle>
          <Receipt className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-600">
            ${pendingAmount.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Awaiting processing
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
          <Calendar className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {filteredActions.length > 0
              ? format(
                  new Date(
                    filteredActions[0]?.payments?.[0]?.date || new Date()
                  ),
                  "MMM dd"
                )
              : "No activity"}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Last payment received
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const getAppointmentTypeColor = (type: string) => {
  switch (type) {
    case "GENERAL":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "FOLLOW_UP":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "EMERGENCY":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

const ActionsTable = ({
  actions,
  handleViewDetails,
}: {
  actions: any[];
  handleViewDetails: (id: number) => void;
}) => {
  const filteredActions = actions.filter((action) => action.payments?.length);

  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-slate-50 border-b">
        <CardTitle className="text-lg flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-slate-500" />
          Payment Records
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50">
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="hidden md:table-cell">
                  Description
                </TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActions.length > 0 ? (
                filteredActions.map((action) => (
                  <TableRow key={action.id} className="hover:bg-slate-50">
                    <TableCell>
                      <div className="font-medium">
                        {format(new Date(action.startDate), "MMM dd, yyyy")}
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
                      {action.description || "No description available"}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-emerald-600">
                        ${action.totalPayment?.toFixed(2) || "0.00"}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(action.id)}
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
};

const PaymentDialog = ({
  isOpen,
  setIsOpen,
  actionDetails,
  payments,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  actionDetails: any;
  payments: any[];
}) => (
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-xl">
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Payment Details
          </DialogTitle>
        </DialogHeader>
      </div>

      <div className="p-6 max-h-[70vh] overflow-y-auto">
        {actionDetails && (
          <Card className="border-none shadow-sm mb-6">
            <CardHeader className="bg-slate-50 border-b px-6 py-4">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <FileText className="h-5 w-5 text-slate-500" />
                Appointment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Date</div>
                <div className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  {format(new Date(actionDetails.startDate), "MMMM dd, yyyy")}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Type</div>
                <div>
                  <Badge
                    variant="secondary"
                    className={getAppointmentTypeColor(
                      actionDetails.appointmentType.type
                    )}
                  >
                    {actionDetails.appointmentType.type.replace("_", " ")}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <div className="text-sm text-muted-foreground">Description</div>
                <div className="font-medium">
                  {actionDetails.description || "No description available"}
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <div className="text-sm text-muted-foreground">
                  Total Amount
                </div>
                <div className="font-medium text-lg text-emerald-600">
                  ${actionDetails.totalPayment?.toFixed(2) || "0.00"}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {payments?.length > 0 && (
          <>
            <Separator className="my-6" />

            <div className="mb-4">
              <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                <Receipt className="h-5 w-5 text-slate-500" />
                Payment History
              </h3>

              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Description
                      </TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment: any) => (
                      <TableRow key={payment.id} className="hover:bg-slate-50">
                        <TableCell>
                          <div className="font-medium">
                            {format(new Date(payment.date), "MMM dd, yyyy")}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {format(new Date(payment.time), "h:mm a")}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-emerald-600">
                            ${payment.amount?.toFixed(2)}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                          {payment.description || "No description available"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              payment.statusId === 2
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                            }
                          >
                            {payment.statusId === 2 ? "COMPLETED" : "PENDING"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </>
        )}
      </div>
    </DialogContent>
  </Dialog>
);
