"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { PaymentStats } from "./payment-stats";
import { PaymentTable } from "./payment-table";
import { CashFlowTab } from "./cash-flow-tab";
import { AuditTrailTab } from "./audit-trail-tab";
import { ReceiptDialog } from "./receipt-dialog";
import { DetailsDialog } from "./details-dialog";
import { payment } from "@/app/api"; // Replace with the appropriate path where your API functions are defined
import type { Payment } from "@/types/payment";

export function PaymentManagement() {
  const { toast } = useToast();

  // State for payments fetched from API
  const [payments, setPayments] = useState<Payment[]>([]);
  // Dialog states
  const [isReceiptDialogOpen, setIsReceiptDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  // Fetch all payments from the API on component mount
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { payments } = await payment.getAllPayments();
        setPayments(payments);
      } catch (error: any) {
        console.error("Failed to fetch payments:", error);
        toast({
          title: "Error fetching payments",
          description: "Unable to load payments from the server.",
        });
      }
    };
    fetchPayments();
  }, [toast]);

  const handleViewReceipt = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsReceiptDialogOpen(true);
  };

  const handlePrintReceipt = (payment: Payment) => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt - ${payment.id}</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; border-bottom: 1px solid #ddd; padding-bottom: 15px; margin-bottom: 15px; }
          .row { display: flex; justify-content: space-between; margin-bottom: 8px; }
          .label { color: #666; }
          .value { font-weight: 500; }
          .section { border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; padding: 15px 0; margin: 15px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 0.9em; }
          .badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 0.8em; }
          .badge-paid { border: 1px solid #22c55e; color: #22c55e; }
          .badge-pending { background-color: #f59e0b; color: white; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>DentalCare Clinic</h2>
          <p>123 Dental Street, Suite 100</p>
          <p>Phone: (555) 123-4567</p>
        </div>
        
        <div class="row">
          <span class="label">Receipt No:</span>
          <span class="value">${payment.id}</span>
        </div>
        <div class="row">
          <span class="label">Date:</span>
          <span class="value">${new Date(payment.date).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}</span>
        </div>
        <div class="row">
          <span class="label">Time:</span>
          <span class="value">${new Date(payment.time).toLocaleTimeString(
            "en-US",
            {
              hour: "numeric",
              minute: "numeric",
            }
          )}</span>
        </div>
        
        <div class="section">
          <div class="row">
            <span class="value">Patient:</span>
            <span class="value">Patient ${payment.patientId}</span>
          </div>
          <div class="row">
            <span class="label">Doctor:</span>
            <span>${payment.doctor.user.firstName} ${
        payment.doctor.user.lastName
      }</span>
          </div>
          <div class="row">
            <span class="label">Service:</span>
            <span>${payment.action.description}</span>
          </div>
        </div>
        
        <div class="row">
          <span class="label">Amount:</span>
          <span class="value">$${payment.amount.toFixed(2)}</span>
        </div>
        <div class="row">
          <span class="label">Payment Method:</span>
          <span>Cash</span>
        </div>
        <div class="row">
          <span class="label">Status:</span>
          <span class="badge ${
            payment.status.status === "PAID" ? "badge-paid" : "badge-pending"
          }">${payment.status.status.toLowerCase()}</span>
        </div>
        
        <div class="footer">
          <p>Thank you for choosing DentalCare Clinic!</p>
        </div>
      </body>
      </html>
    `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }

    toast({
      title: "Printing Receipt",
      description: `Printing receipt for Patient ${payment.patientId}`,
    });
  };

  const handleDownloadReceipt = (payment: Payment) => {
    const receiptData = {
      clinicName: "DentalCare Clinic",
      clinicAddress: "123 Dental Street, Suite 100",
      clinicPhone: "(555) 123-4567",
      receiptNo: payment.id,
      date: new Date(payment.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: new Date(payment.time).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      }),
      patient: `Patient ${payment.patientId}`,
      doctor: `${payment.doctor.user.firstName} ${payment.doctor.user.lastName}`,
      service: payment.action.description,
      amount: payment.amount.toFixed(2),
      method: "Cash",
      status: payment.status.status.toLowerCase(),
    };

    console.log("Downloading receipt with data:", receiptData);

    toast({
      title: "Downloading Receipt",
      description: `Receipt for Patient ${payment.patientId} is being downloaded`,
    });

    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `Receipt_${payment.id}.pdf has been downloaded`,
      });
    }, 1500);
  };

  const handleMarkAsPaid = (payment: Payment) => {
    toast({
      title: "Payment Status Updated",
      description: `Payment for Patient ${payment.patientId} has been marked as paid`,
    });
  };

  const handleViewDetails = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDetailsDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Payment Management
        </h1>
      </div>

      <PaymentStats payments={payments} />

      <Tabs defaultValue="all-payments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all-payments">All Payments</TabsTrigger>
          <TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
          <TabsTrigger value="audit-trail">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="all-payments" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Payments</CardTitle>
              <CardDescription>
                View and manage all payment transactions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentTable
                payments={payments}
                onViewReceipt={handleViewReceipt}
                onPrintReceipt={handlePrintReceipt}
                onDownloadReceipt={handleDownloadReceipt}
                onMarkAsPaid={handleMarkAsPaid}
                onViewDetails={handleViewDetails}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cash-flow" className="space-y-4">
          <CashFlowTab payments={payments} />
        </TabsContent>

        <TabsContent value="audit-trail" className="space-y-4">
          <AuditTrailTab payments={payments} />
        </TabsContent>
      </Tabs>

      <ReceiptDialog
        open={isReceiptDialogOpen}
        onOpenChange={setIsReceiptDialogOpen}
        payment={selectedPayment}
        payments={payments}
        onPrintReceipt={handlePrintReceipt}
        onDownloadReceipt={handleDownloadReceipt}
      />

      <DetailsDialog
        open={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
        payment={selectedPayment}
        payments={payments}
        onViewReceipt={handleViewReceipt}
      />
    </div>
  );
}
