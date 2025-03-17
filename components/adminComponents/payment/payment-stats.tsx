import { ArrowDownUp, Receipt } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Payment } from "@/types/payment"

interface PaymentStatsProps {
  payments: Payment[]
}

export function PaymentStats({ payments }: PaymentStatsProps) {
  // Calculate totals
  const totalPaid = payments
    .filter((payment) => payment.status.status === "PAID")
    .reduce((sum, payment) => sum + payment.amount, 0)

  const totalPending = payments
    .filter((payment) => payment.status.status === "PENDING")
    .reduce((sum, payment) => sum + payment.amount, 0)

  const todaysPayments = payments
    .filter((p) => {
      const today = new Date()
      const paymentDate = new Date(p.date)
      return (
        paymentDate.getDate() === today.getDate() &&
        paymentDate.getMonth() === today.getMonth() &&
        paymentDate.getFullYear() === today.getFullYear()
      )
    })
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
          <Receipt className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${(totalPaid + totalPending).toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">All time payments</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Paid</CardTitle>
          <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">${totalPaid.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {payments.filter((p) => p.status.status === "PAID").length} payments
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending</CardTitle>
          <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">${totalPending.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {payments.filter((p) => p.status.status === "PENDING").length} payments
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today's Cash</CardTitle>
          <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${todaysPayments.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Today's transactions</p>
        </CardContent>
      </Card>
    </div>
  )
}

