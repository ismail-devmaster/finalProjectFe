import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Payment } from "@/types/payment"
import { format, parseISO, startOfWeek, addDays } from "date-fns"

interface CashFlowTabProps {
  payments: Payment[]
}

export function CashFlowTab({ payments }: CashFlowTabProps) {
  // Generate cash flow data from payments
  const generateCashFlowData = () => {
    // Get the current week's start date
    const weekStart = startOfWeek(new Date())

    // Initialize data for each day of the week
    const weekData = Array.from({ length: 7 }).map((_, index) => {
      const day = addDays(weekStart, index)
      return {
        name: format(day, "EEE"),
        date: day,
        income: 0,
        expenses: 0,
      }
    })

    // Fill in the data from payments
    payments.forEach((payment) => {
      const paymentDate = parseISO(payment.date)
      const dayIndex = weekData.findIndex(
        (day) => day.date.getDate() === paymentDate.getDate() && day.date.getMonth() === paymentDate.getMonth(),
      )

      if (dayIndex !== -1) {
        if (payment.status.status === "PAID") {
          weekData[dayIndex].income += payment.amount
        } else if (payment.status.status === "CANCELLED") {
          weekData[dayIndex].expenses += payment.amount * 0.1 // Assume 10% loss on cancelled payments
        }
      }
    })

    return weekData
  }

  const cashFlowData = generateCashFlowData()

  // Calculate monthly summary
  const calculateMonthlySummary = () => {
    const totalIncome = payments.filter((p) => p.status.status === "PAID").reduce((sum, p) => sum + p.amount, 0)

    const totalExpenses = payments
      .filter((p) => p.status.status === "CANCELLED")
      .reduce((sum, p) => sum + p.amount * 0.1, 0) // Assume 10% loss on cancelled payments

    const netProfit = totalIncome - totalExpenses
    const profitMargin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0

    return {
      totalIncome,
      totalExpenses,
      netProfit,
      profitMargin,
    }
  }

  const monthlySummary = calculateMonthlySummary()

  // Calculate payment methods distribution
  const calculatePaymentMethods = () => {
    const paidPayments = payments.filter((p) => p.status.status === "PAID")
    const totalPaid = paidPayments.reduce((sum, p) => sum + p.amount, 0)

    // Group by appointment type as a proxy for payment method
    const byType = paidPayments.reduce(
      (acc, payment) => {
        const type = payment.action.appointmentTypeId
        if (!acc[type]) acc[type] = 0
        acc[type] += payment.amount
        return acc
      },
      {} as Record<number, number>,
    )

    // Convert to array with percentages
    return Object.entries(byType)
      .map(([type, amount]) => {
        const percentage = totalPaid > 0 ? (amount / totalPaid) * 100 : 0
        let methodName = "Other"

        // Map appointment type IDs to method names
        switch (Number(type)) {
          case 1:
            methodName = "General Checkup"
            break
          case 2:
            methodName = "Consultation"
            break
          case 3:
            methodName = "Follow-up"
            break
          case 4:
            methodName = "Emergency"
            break
        }

        return {
          method: methodName,
          amount,
          percentage,
        }
      })
      .sort((a, b) => b.amount - a.amount)
  }

  const paymentMethods = calculatePaymentMethods()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cash Flow Reports</CardTitle>
        <CardDescription>View daily, weekly, and monthly cash flow summaries.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Weekly Cash Flow</h3>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Income</TableHead>
                  <TableHead>Expenses</TableHead>
                  <TableHead>Profit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cashFlowData.map((day) => (
                  <TableRow key={day.name}>
                    <TableCell className="font-medium">{day.name}</TableCell>
                    <TableCell className="text-green-600">${day.income.toFixed(2)}</TableCell>
                    <TableCell className="text-red-600">${day.expenses.toFixed(2)}</TableCell>
                    <TableCell className={day.income - day.expenses > 0 ? "text-green-600" : "text-red-600"}>
                      ${(day.income - day.expenses).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50">
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="font-bold text-green-600">
                    ${cashFlowData.reduce((sum, day) => sum + day.income, 0).toFixed(2)}
                  </TableCell>
                  <TableCell className="font-bold text-red-600">
                    ${cashFlowData.reduce((sum, day) => sum + day.expenses, 0).toFixed(2)}
                  </TableCell>
                  <TableCell className="font-bold text-green-600">
                    ${cashFlowData.reduce((sum, day) => sum + (day.income - day.expenses), 0).toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Monthly Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Income</span>
                  <span className="font-medium">${monthlySummary.totalIncome.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Expenses</span>
                  <span className="font-medium">${monthlySummary.totalExpenses.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Net Profit</span>
                  <span className="font-medium text-green-600">${monthlySummary.netProfit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profit Margin</span>
                  <span className="font-medium">{monthlySummary.profitMargin.toFixed(1)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-muted-foreground">{method.method}</span>
                    <span className="font-medium">
                      ${method.amount.toFixed(2)} ({method.percentage.toFixed(0)}%)
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}

