import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar, Clock, FileText, User, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

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
}

export function PaymentsDialog({
  open,
  onOpenChange,
  payments,
}: PaymentsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Payments</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow">
          <div className="grid gap-4 p-4 md:grid-cols-2">
            {payments.length > 0 ? (
              payments.map((payment) => (
                <Card
                  key={payment.id}
                  className="overflow-hidden transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-primary" />
                        <h3 className="text-sm font-semibold truncate">
                          Dr. {payment.doctor.user.firstName}{" "}
                          {payment.doctor.user.lastName}
                        </h3>
                      </div>
                      <Badge
                        className={cn(
                          "px-2 py-1 text-xs font-medium",
                          payment.status.status === "PENDING" &&
                            "bg-yellow-100 text-yellow-800",
                          payment.status.status === "PAID" &&
                            "bg-green-100 text-green-800",
                          payment.status.status === "CANCELLED" &&
                            "bg-red-100 text-red-800"
                        )}
                      >
                        {payment.status.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-gray-500" />
                        <span>
                          {format(new Date(payment.date), "MMM d, yyyy")}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-gray-500" />
                        <span>{format(new Date(payment.time), "h:mm a")}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 mb-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="text-lg font-semibold">
                        {payment.amount.toFixed(2)}
                      </span>
                    </div>
                    {payment.description && (
                      <div className="flex items-start space-x-1">
                        <FileText className="w-3 h-3 text-gray-500 mt-1" />
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {payment.description}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-2">
                No payments found.
              </p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
