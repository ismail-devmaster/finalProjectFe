"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { AppointmentListProps } from "@/types/appointment"
import { AppointmentFilters } from "./appointment-filters"
import { format, parseISO } from "date-fns"

export function AppointmentList({ filteredAppointments, onViewDetails, filterProps }: AppointmentListProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "outline"
      case "UPCOMING":
        return "secondary"
      case "WAITING":
        return "default"
      case "CANCELLED":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <AppointmentFilters {...filterProps} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">View Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No appointments found.
                </TableCell>
              </TableRow>
            ) : (
              filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="/placeholder.svg"
                          alt={`${appointment.patient.user.firstName} ${appointment.patient.user.lastName}`}
                        />
                        <AvatarFallback>{appointment.patient.user.firstName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{`${appointment.patient.user.firstName} ${appointment.patient.user.lastName}`}</div>
                        <div className="text-xs text-muted-foreground">{appointment.patient.user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{`Dr. ${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}`}</TableCell>
                  <TableCell>{appointment.action.appointmentType.type}</TableCell>
                  <TableCell>
                    {format(parseISO(appointment.date), "MMM d, yyyy")} at{" "}
                    {format(parseISO(appointment.time), "h:mm a")}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(appointment.status.status)}>{appointment.status.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => onViewDetails(appointment)}>
                      View Details
                    </Button>
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

