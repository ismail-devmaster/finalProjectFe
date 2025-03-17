"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Payment } from "@/types/payment";

interface DetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payment: Payment | null;
  payments: Payment[];
  onViewReceipt: (payment: Payment) => void;
}

export function DetailsDialog({
  open,
  onOpenChange,
  payment,
  payments,
  onViewReceipt,
}: DetailsDialogProps) {
  if (!payment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
          <DialogDescription>
            Payment information for {payment.patient.user.firstName}{" "}
            {payment.patient.user.lastName}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={`/placeholder.svg?height=64&width=64`}
                alt={`Patient ${payment.patientId}`}
              />
              <AvatarFallback>{payment.patientId}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">
                {payment.patient.user.firstName} {payment.patient.user.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">
                {payment.patient.user.id}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium">Payment ID</h4>
              <p className="text-sm">{payment.id}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Doctor</h4>
              <p className="text-sm">
                {payment.doctor.user.firstName} {payment.doctor.user.lastName}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Amount</h4>
              <p className="text-sm font-semibold">
                ${payment.amount.toFixed(2)}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Status</h4>
              <Badge
                variant={
                  payment.status.status === "PAID"
                    ? "outline"
                    : payment.status.status === "PENDING"
                    ? "secondary"
                    : "destructive"
                }
              >
                {payment.status.status.toLowerCase()}
              </Badge>
            </div>
            <div>
              <h4 className="text-sm font-medium">Date</h4>
              <p className="text-sm">
                {new Date(payment.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Time</h4>
              <p className="text-sm">
                {new Date(payment.time).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium">Description</h4>
            <p className="text-sm mt-1 p-3 bg-muted rounded-md">
              {payment.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">
              Patient Payment History
            </h4>
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments
                    .filter((pay) => pay.patientId === payment.patientId)
                    .sort(
                      (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    )
                    .map((pay) => (
                      <TableRow key={pay.id}>
                        <TableCell>
                          {new Date(pay.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell>${pay.amount.toFixed(2)}</TableCell>
                        <TableCell>{pay.description}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              pay.status.status === "PAID"
                                ? "outline"
                                : pay.status.status === "PENDING"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {pay.status.status.toLowerCase()}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            onClick={() => {
              onOpenChange(false);
              onViewReceipt(payment);
            }}
          >
            View Receipt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
