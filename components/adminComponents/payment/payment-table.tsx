"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpDown, CalendarIcon, Download, Filter, Printer, Search } from "lucide-react"
import { format } from "date-fns"
import type { Payment } from "@/types/payment"

interface PaymentTableProps {
  payments: Payment[]
  onViewReceipt: (payment: Payment) => void
  onPrintReceipt: (payment: Payment) => void
  onDownloadReceipt: (payment: Payment) => void
  onMarkAsPaid: (payment: Payment) => void
  onViewDetails: (payment: Payment) => void
}

export function PaymentTable({
  payments,
  onViewReceipt,
  onPrintReceipt,
  onDownloadReceipt,
  onMarkAsPaid,
  onViewDetails,
}: PaymentTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [date, setDate] = useState<Date | undefined>(undefined)

  const filteredPayments = payments.filter((payment) => {
    const patientName = `${payment.doctor.user.firstName} ${payment.doctor.user.lastName}`
    const matchesSearch =
      patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toString().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || payment.status.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesDate = !date || isSameDay(new Date(payment.date), date)

    return matchesSearch && matchesStatus && matchesDate
  })

  function isSameDay(date1: Date, date2: Date) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search payments..."
              className="pl-8 w-[250px] sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[150px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <Button variant="outline" size="icon">
            <Printer className="h-4 w-4" />
            <span className="sr-only">Print</span>
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download</span>
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No payments found.
                </TableCell>
              </TableRow>
            ) : (
              filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={`Patient ${payment.patientId}`} />
                        <AvatarFallback>{payment.patientId}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">Patient {payment.patientId}</div>
                    </div>
                  </TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    {new Date(payment.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>{payment.description}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <ArrowUpDown className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onViewReceipt(payment)}>View Receipt</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onPrintReceipt(payment)}>Print Receipt</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDownloadReceipt(payment)}>Download Receipt</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {payment.status.status === "PENDING" && (
                          <DropdownMenuItem onClick={() => onMarkAsPaid(payment)}>Mark as Paid</DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => onViewDetails(payment)}>View Details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

