import type React from "react";
// src/components/History.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { Appointment } from "./types/appointment";

interface HistoryProps {
  appointmentHistory: Appointment[];
  handleViewDetails: (appointmentId: number) => void;
}

const History: React.FC<HistoryProps> = ({
  appointmentHistory,
  handleViewDetails,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Appointment History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointmentHistory.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    {new Date(appointment.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(appointment.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>{`${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}`}</TableCell>
                  <TableCell>
                    {appointment.action.appointmentType.type}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        appointment.status.status === "COMPLETED"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : appointment.status.status === "CANCELLED"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      }`}
                    >
                      {appointment.status.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="link"
                      onClick={() => handleViewDetails(appointment.id)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default History;
