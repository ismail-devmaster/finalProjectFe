"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Download, Printer } from "lucide-react"
import type { Payment } from "@/types/payment"

interface ReceiptDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  payment: Payment | null
  onPrintReceipt: (payment: Payment) => void
  onDownloadReceipt: (payment: Payment) => void
}

export function ReceiptDialog({ open, onOpenChange, payment, onPrintReceipt, onDownloadReceipt }: ReceiptDialogProps) {
  if (!payment) return null

  // Combine date and time for display
  const paymentDateTime = new Date(payment.date)
  const timeOnly = new Date(payment.time)
  paymentDateTime.setHours(timeOnly.getHours())
  paymentDateTime.setMinutes(timeOnly.getMinutes())

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Payment Receipt</DialogTitle>
          <DialogDescription>Receipt for payment #{payment.id}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="text-center border-b pb-4">
            <h3 className="text-xl font-bold">DentalCare Clinic</h3>
            <p className="text-sm text-muted-foreground">123 Dental Street, Suite 100</p>
            <p className="text-sm text-muted-foreground">Phone: (555) 123-4567</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Receipt No:</span>
              <span>{payment.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span>
                {new Date(payment.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time:</span>
              <span>
                {new Date(payment.time).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="border-t border-b py-4">
            <div className="flex justify-between font-medium">
              <span>Patient:</span>
              <span>Patient {payment.patientId}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-muted-foreground">Doctor:</span>
              <span>
                {payment.doctor.user.firstName} {payment.doctor.user.lastName}
              </span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-muted-foreground">Service:</span>
              <span>{payment.action.description}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-medium">${payment.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method:</span>
              <span>Cash</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
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
          </div>

          <div className="border-t pt-4 text-center">
            <p className="text-sm text-muted-foreground">Thank you for choosing DentalCare Clinic!</p>
          </div>
        </div>
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => payment && onPrintReceipt(payment)}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button onClick={() => payment && onDownloadReceipt(payment)}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

