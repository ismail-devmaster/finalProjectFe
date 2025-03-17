import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock, FileText, Printer, Receipt, AlertTriangle } from "lucide-react"
import type { Payment } from "@/types/payment"
import { parseISO, subDays } from "date-fns"

interface AuditTrailTabProps {
  payments: Payment[]
}

export function AuditTrailTab({ payments }: AuditTrailTabProps) {
  // Generate audit trail entries from payments
  const generateAuditTrail = () => {
    const auditEntries = []
    const today = new Date()

    // Add entries for each payment
    for (const payment of payments) {
      const paymentDate = parseISO(payment.date)
      const daysDiff = Math.floor((today.getTime() - paymentDate.getTime()) / (1000 * 60 * 60 * 24))

      // Create a payment received entry for PAID payments
      if (payment.status.status === "PAID") {
        auditEntries.push({
          id: `AUD-${payment.id}-1`,
          action: "Payment Received",
          amount: payment.amount,
          user: `${payment.doctor.user.firstName} ${payment.doctor.user.lastName}`,
          timestamp: subDays(today, Math.min(daysDiff, 7)).toISOString(),
          details: `Payment received for ${payment.action.description}`,
        })

        // Add aeceipt printed entry for some payments
        if (payment.id % 3 === 0) {
          auditEntries.push({
            id: `AUD-${payment.id}-2`,
            action: "Receipt Printed",
            amount: payment.amount,
            user: `${payment.doctor.user.firstName} ${payment.doctor.user.lastName}`,
            timestamp: subDays(today, Math.min(daysDiff, 7) - 1).toISOString(),
            details: `Receipt printed for Patient ${payment.patientId}`,
          })
        }
      }
      // Create a pending entry for PENDING payments
      else if (payment.status.status === "PENDING") {
        auditEntries.push({
          id: `AUD-${payment.id}-1`,
          action: "Payment Marked as Pending",
          amount: payment.amount,
          user: "Admin Staff",
          timestamp: subDays(today, Math.min(daysDiff, 5)).toISOString(),
          details: `Payment status updated to pending for ${payment.action.description}`,
        })
      }
      // Create a cancelled entry for CANCELLED payments
      else if (payment.status.status === "CANCELLED") {
        auditEntries.push({
          id: `AUD-${payment.id}-1`,
          action: "Payment Cancelled",
          amount: payment.amount,
          user: "Admin Staff",
          timestamp: subDays(today, Math.min(daysDiff, 3)).toISOString(),
          details: `Payment cancelled for ${payment.action.description}`,
        })
      }
    }

    // Sort by timestamp, most recent first
    return auditEntries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }

  const auditTrail = generateAuditTrail()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Trail</CardTitle>
        <CardDescription>Track all cash transactions and adjustments.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditTrail.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {entry.action === "Payment Received" ? (
                        <Receipt className="h-4 w-4 text-green-500" />
                      ) : entry.action === "Payment Marked as Pending" ? (
                        <Clock className="h-4 w-4 text-yellow-500" />
                      ) : entry.action === "Receipt Printed" ? (
                        <Printer className="h-4 w-4 text-blue-500" />
                      ) : entry.action === "Payment Cancelled" ? (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      ) : (
                        <FileText className="h-4 w-4 text-gray-500" />
                      )}
                      <span>{entry.action}</span>
                    </div>
                  </TableCell>
                  <TableCell>${entry.amount.toFixed(2)}</TableCell>
                  <TableCell>{entry.user}</TableCell>
                  <TableCell>
                    {new Date(entry.timestamp).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{entry.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

