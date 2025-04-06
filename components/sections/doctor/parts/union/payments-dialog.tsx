import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar, Clock, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Payment {
  id: number;
  date: string;
  time: string;
  description: string;
  status: {
    status: string;
  };
  doctor: {
    user: {
      firstName: string;
      lastName: string;
    };
  };
  amount: number;
}

interface PaymentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payments: Payment[];
  actionTitle?: string;
}

export function PaymentsDialog({
  open,
  onOpenChange,
  payments,
  actionTitle,
}: PaymentsDialogProps) {
  const getStatusBadgeVariant = (status: string) => {
    switch (status.toUpperCase()) {
      case "PAID":
      case "COMPLETED":
        return "success";
      case "PENDING":
        return "secondary";
      case "CANCELLED":
      case "FAILED":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Payments</DialogTitle>
          <DialogDescription>
            {actionTitle
              ? `Payment history for ${actionTitle} treatment`
              : "Payment history for this treatment"}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-grow mt-4">
          <div className="space-y-4 p-1">
            {payments.length > 0 ? (
              payments.map((payment) => (
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
                          variant={getStatusBadgeVariant(payment.status.status)}
                        >
                          {payment.status.status}
                        </Badge>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {format(new Date(payment.date), "MMMM d, yyyy")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {format(new Date(payment.time), "h:mm a")}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div className="text-sm text-muted-foreground">
                          {payment.description}
                        </div>
                        <div className="text-lg font-bold text-emerald-600">
                          ${payment.amount.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No payment records found
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
