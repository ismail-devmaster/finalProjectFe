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
import { AuditTrailTab } from "./audit-trail-tab";
import { ReceiptDialog } from "./receipt-dialog";
import { DetailsDialog } from "./details-dialog";
import { jsPDF } from "jspdf";
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
          <h2>Remdani Dental Center</h2>
          <p>Blida, Ouled Ya3ich</p>
          <p>Phone: +213 5 41 93 09 17</p>
        </div>

        <div class="patient-info">
          <div class="avatar">
            ${payment.patient.user.firstName.charAt(
              0
            )}${payment.patient.user.lastName.charAt(0)}
          </div>
          <div>
            <h3>${payment.patient.user.firstName} ${
        payment.patient.user.lastName
      }</h3>
          </div>
        </div>

        <div class="details-grid">
          <div class="detail-item">
            <h4>Receipt No</h4>
            <p>${payment.id}</p>
          </div>
          <div class="detail-item">
            <h4>Doctor</h4>
            <p>${payment.doctor.user.firstName} ${
        payment.doctor.user.lastName
      }</p>
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
                .filter((p) => p.patientId === payment.patientId)
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                .map(
                  (p) => `
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
                `
                )
                .join("")}
            </tbody>
          </table>
        </div>

        <div class="footer">
          <p>Thank you for choosing Remdani Dental Center!</p>
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
    // Create a new jsPDF document
    const doc = new jsPDF();

    // Set margins and starting coordinates
    let x = 15;
    let y = 20;

    // Add header information
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text("Remdani Dental Center", x, y, { align: "center" });
    y += 8;
    doc.setFontSize(12);
    doc.text("Blida, Ouled Ya3ich", x, y, { align: "center" });
    y += 6;
    doc.text("Phone: +213 5 41 93 09 17", x, y, { align: "center" });

    // Draw a line separator
    y += 10;
    doc.setDrawColor(200, 200, 200);
    doc.line(x, y, 195, y);

    // Patient info section
    y += 15;
    doc.setFontSize(14);
    doc.text(`Receipt No: ${payment.id}`, x, y);

    // Patient avatar and name
    y += 10;
    doc.setFillColor(240, 240, 240);
    doc.circle(x + 10, y + 10, 10, "F");
    doc.setFontSize(12);
    doc.text(
      `${payment.patient.user.firstName.charAt(
        0
      )}${payment.patient.user.lastName.charAt(0)}`,
      x + 10,
      y + 12,
      { align: "center" }
    );
    doc.text(
      `${payment.patient.user.firstName} ${payment.patient.user.lastName}`,
      x + 30,
      y + 12
    );

    // Details grid
    y += 25;
    const detailItems = [
      { label: "Amount", value: `${payment.amount.toFixed(2)} DA` },
      { label: "Status", value: payment.status.status.toLowerCase() },
      {
        label: "Date",
        value: new Date(payment.date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
      {
        label: "Time",
        value: new Date(payment.time).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
        }),
      },
      {
        label: "Doctor",
        value: `${payment.doctor.user.firstName} ${payment.doctor.user.lastName}`,
      },
    ];

    detailItems.forEach((item, i) => {
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(item.label, x + (i % 2 === 0 ? 0 : 100), y);
      doc.setFontSize(12);
      doc.setTextColor(40, 40, 40);
      doc.text(item.value, x + (i % 2 === 0 ? 0 : 100), y + 5);
      if (i % 2 === 1) y += 10;
    });

    // Service description
    y += 15;
    doc.setFontSize(12);
    doc.text("Service Description:", x, y);
    y += 7;
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(x, y, 180, 20, 3, 3, "F");
    doc.setTextColor(40, 40, 40);
    doc.text(payment.action.description, x + 5, y + 7, { maxWidth: 170 });

    // Payment history table
    y += 30;
    doc.setFontSize(12);
    doc.text("Patient Payment History", x, y);
    y += 7;

    // Table headers
    doc.setFillColor(240, 240, 240);
    doc.rect(x, y, 180, 10, "F");
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    ["Date", "Amount", "Description", "Status"].forEach((header, i) => {
      doc.text(header, x + i * 45, y + 7);
    });

    // Table rows
    doc.setFontSize(10);
    payments
      .filter((p) => p.patientId === payment.patientId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .forEach((p, i) => {
        y += 10;
        if (i % 2 === 0) {
          doc.setFillColor(250, 250, 250);
          doc.rect(x, y, 180, 10, "F");
        }
        doc.setTextColor(40, 40, 40);
        doc.text(
          new Date(p.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          x,
          y + 7
        );
        doc.text(`$${p.amount.toFixed(2)}`, x + 45, y + 7);
        doc.text(p.description, x + 90, y + 7, { maxWidth: 45 });

        // Status badge
        const statusColor =
          p.status.status === "PAID"
            ? [34, 197, 94]
            : p.status.status === "PENDING"
            ? [245, 158, 11]
            : [239, 68, 68];
        doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
        doc.roundedRect(x + 135, y + 2, 40, 6, 2, 2, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(p.status.status.toLowerCase(), x + 155, y + 7, {
          align: "center",
        });
      });

    // Footer
    y += 20;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Thank you for choosing Remdani Dental Center!", x, y, {
      align: "center",
    });

    // Save the PDF
    doc.save(`Receipt_${payment.id}.pdf`);

    // Provide a toast notification for download status
    toast({
      title: "Downloading Receipt",
      description: `Receipt for ${payment.patient.user.firstName} ${payment.patient.user.lastName} is being downloaded`,
    });
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
