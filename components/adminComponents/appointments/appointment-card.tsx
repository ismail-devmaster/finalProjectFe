"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { AppointmentCardProps } from "@/types/appointment"
import { format, parseISO } from "date-fns"

export function AppointmentCard({ appointment, onViewDetails }: AppointmentCardProps) {
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
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="/placeholder.svg"
                alt={`${appointment.patient.user.firstName} ${appointment.patient.user.lastName}`}
              />
              <AvatarFallback>{appointment.patient.user.firstName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{`${appointment.patient.user.firstName} ${appointment.patient.user.lastName}`}</div>
              <div className="text-sm text-muted-foreground">
                {format(parseISO(appointment.time), "h:mm a")} - {appointment.action.appointmentType.type}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={getStatusVariant(appointment.status.status)}>{appointment.status.status}</Badge>
            <Button variant="ghost" size="sm" onClick={() => onViewDetails(appointment)}>
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

