"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { payment } from "@/app/api";

interface PaymentsViewProps {
  actionId: number;
}

interface Payment {
  id: number;
  patientId: number;
  doctorId: number;
  statusId: number;
  actionId: number;
  amount: number;
  date: string;
  time: string;
  description: string;
  doctor: {
    userId: number;
  };
  patient: {
    userId: number;
    medicalHistory: string;
  };
  status: {
    id: number;
    status: string;
  };
  action: {
    id: number;
    appointmentTypeId: number;
    patientId: number;
    description: string;
    totalPayment: number;
    startDate: string;
    endDate: string | null;
  };
}

export function PaymentsView({ actionId }: PaymentsViewProps) {
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof Payment | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await payment.getAllPayments();
        setPayments(
          response.payments.filter((p: Payment) => p.actionId === actionId),
        );
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch payments. Please try again.");
        setLoading(false);
      }
    };

    fetchPayments();
  }, [actionId]);

  const handleSort = (column: keyof Payment) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedPayments = [...payments].sort((a, b) => {
    if (!sortColumn) return 0;
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const filteredPayments = sortedPayments.filter((payment) =>
    Object.values(payment).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalAmount = filteredPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0,
  );

  if (loading) return <div>Loading payments...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Button onClick={() => router.push("/")} variant="outline">
          Back to Dashboard
        </Button>
        <h2 className="text-2xl font-bold">Payment History</h2>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold">
          Total Amount: ${totalAmount.toFixed(2)}
        </p>
      </div>
      <Input
        type="text"
        placeholder="Search payments..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={() => handleSort("doctorId")}
              className="cursor-pointer"
            >
              Doctor ID
            </TableHead>
            <TableHead
              onClick={() => handleSort("amount")}
              className="cursor-pointer"
            >
              Amount
            </TableHead>
            <TableHead
              onClick={() => handleSort("date")}
              className="cursor-pointer"
            >
              Date
            </TableHead>
            <TableHead
              onClick={() => handleSort("time")}
              className="cursor-pointer"
            >
              Time
            </TableHead>
            <TableHead
              onClick={() => handleSort("description")}
              className="cursor-pointer"
            >
              Description
            </TableHead>
            <TableHead
              onClick={() => handleSort("status")}
              className="cursor-pointer"
            >
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPayments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.doctorId}</TableCell>
              <TableCell>${payment.amount.toFixed(2)}</TableCell>
              <TableCell>
                {new Date(payment.date).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(payment.time).toLocaleTimeString()}
              </TableCell>
              <TableCell>{payment.description}</TableCell>
              <TableCell>{payment.status.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
