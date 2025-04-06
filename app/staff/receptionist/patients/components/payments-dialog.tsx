"use client";
import type * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, CreditCard, ClipboardList } from "lucide-react";

interface Payment {
  id: number;
  doctor: { user: { firstName: string; lastName: string } };
  status: { status: string };
  date: string;
  time: string;
  description: string;
  amount: number;
}

export interface PaymentsDialogProps {
  isOpen: boolean;
  onCloseAction: () => void;
  payments: Payment[];
}

export default function PaymentsDialog(
  props: PaymentsDialogProps
): React.ReactElement {
  const { isOpen, onCloseAction, payments } = props;

  return (
    <Dialog open={isOpen} onOpenChange={onCloseAction}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Payments</DialogTitle>
          <DialogDescription>
            Payment history for this treatment
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {payments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No payment records found
            </div>
          ) : (
            payments.map(
              (payment: Payment): React.ReactElement => (
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
                            payment.status.status === "completed"
                              ? "success"
                              : payment.status.status === "pending"
                              ? "secondary"
                              : payment.status.status === "failed"
                              ? "destructive"
                              : "outline"
                          }
                        >
                          {payment.status.status.charAt(0).toUpperCase() +
                            payment.status.status.slice(1)}
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
              )
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
