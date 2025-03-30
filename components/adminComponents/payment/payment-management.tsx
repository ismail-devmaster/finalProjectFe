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
          body { font-family: Arial, sans-serif; max-width: 550px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; border-bottom: 1px solid #ddd; padding-bottom: 15px; margin-bottom: 15px; }
          .patient-info { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }
          .avatar { width: 64px; height: 64px; border-radius: 50%; background: #f0f0f0; display: flex; align-items: center; justify-content: center; font-weight: bold; }
          .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
          .detail-item h4 { font-size: 0.875rem; font-weight: 500; margin-bottom: 4px; color: #666; }
          .detail-item p { margin: 0; }
          .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; }
          .badge-paid { border: 1px solid #22c55e; color: #22c55e; }
          .badge-pending { background-color: #f59e0b; color: white; }
          .badge-cancelled { background-color: #ef4444; color: white; }
          .description { background: #f5f5f5; padding: 12px; border-radius: 6px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 8px 12px; text-align: left; border-bottom: 1px solid #ddd; }
          th { font-weight: 500; color: #666; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 0.9em; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>DentalCare Clinic</h2>
          <p>123 Dental Street, Suite 100</p>
          <p>Phone: (555) 123-4567</p>
        </div>

        <div class="patient-info">
          <div class="avatar">
            ${payment.patient.user.firstName.charAt(0)}${payment.patient.user.lastName.charAt(0)}
          </div>
          <div>
            <h3>${payment.patient.user.firstName} ${payment.patient.user.lastName}</h3>
          </div>
        </div>

        <div class="details-grid">
          <div class="detail-item">
            <h4>Receipt No</h4>
            <p>${payment.id}</p>
          </div>
          <div class="detail-item">
            <h4>Doctor</h4>
            <p>${payment.doctor.user.firstName} ${payment.doctor.user.lastName}</p>
          </div>
          <div class="detail-item">
            <h4>Amount</h4>
            <p>${payment.amount.toFixed(2)} DA</p>
          </div>
          <div class="detail-item">
            <h4>Status</h4>
            <span class="badge ${
              payment.status.status === "PAID" 
                ? "badge-paid" 
                : payment.status.status === "PENDING" 
                  ? "badge-pending" 
                  : "badge-cancelled"
            }">${payment.status.status.toLowerCase()}</span>
          </div>
          <div class="detail-item">
            <h4>Date</h4>
            <p>${new Date(payment.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</p>
          </div>
          <div class="detail-item">
            <h4>Time</h4>
            <p>${new Date(payment.time).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
            })}</p>
          </div>
        </div>

        <div>
          <h4>Service Description</h4>
          <div class="description">
            ${payment.action.description}
          </div>
        </div>

        <div>
          <h4>Patient Payment History</h4>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${payments
                .filter(p => p.patientId === payment.patientId)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map(p => `
                  <tr>
                    <td>${new Date(p.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}</td>
                    <td>$${p.amount.toFixed(2)}</td>
                    <td>${p.description}</td>
                    <td>
                      <span class="badge ${
                        p.status.status === "PAID" 
                          ? "badge-paid" 
                          : p.status.status === "PENDING" 
                            ? "badge-pending" 
                            : "badge-cancelled"
                      }">${p.status.status.toLowerCase()}</span>
                    </td>
                  </tr>
                `).join('')}
            </tbody>
          </table>
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
