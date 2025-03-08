"use client";

export default function PaymentsDialog(
  props: PaymentsDialogProps,
): React.ReactElement {
  const { isOpen, onCloseAction, payments } = props;

  return (
    <Dialog open={isOpen} onOpenChange={onCloseAction}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Payments</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {payments.map(function (payment: Payment): React.ReactElement {
            return (
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
                        Time: {new Date(payment.time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="text-muted-foreground">
                        {payment.description}
                      </div>
                      <div className="font-medium">
                        Amount: ${payment.amount}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
