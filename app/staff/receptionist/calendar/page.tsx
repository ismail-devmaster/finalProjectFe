"use client";

import { Button } from "@/components/ui/button";
import {
  format,
  getDay,
  isSameDay,
  isSameMonth,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  parseISO,
  addYears,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AppointmentCard } from "@/components/receptionistComponents/appointments/appointment-card";
import { useEffect, useState } from "react";
import { appointment } from "@/app/api";
import { toast } from "@/hooks/use-toast";
import type { Appointment } from "@/types/appointment";

export default function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const onPreviousYear = () => {
    setCurrentMonth(addYears(currentMonth, -1));
  };

  const onNextYear = () => {
    setCurrentMonth(addYears(currentMonth, 1));
  };

  const onSelectDate = (date: Date | undefined) => {
    setSelectedDate(date || null);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await appointment.getAllAppointments();
        setAppointments(data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast({
          title: "Error",
          description: "Failed to fetch appointments",
          variant: "destructive",
        });
      }
    };

    fetchAppointments();
  }, []);

  // Generate days for the calendar
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get appointments for each day
  const getAppointmentsForDay = (day: Date) => {
    return appointments.filter((appointment) =>
      isSameDay(parseISO(appointment.date), day)
    );
  };

  const calendarAppointments = selectedDate
    ? appointments.filter((appointment) =>
        isSameDay(parseISO(appointment.date), selectedDate)
      )
    : [];

  return (
    <div>
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={onPreviousYear}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            {currentMonth.getFullYear() - 1}
          </Button>
          <h3 className="text-lg font-semibold">
            {format(currentMonth, "MMMM yyyy")}
          </h3>
          <Button variant="outline" size="sm" onClick={onNextYear}>
            {currentMonth.getFullYear() + 1}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 12 }, (_, i) => {
            const month = new Date(currentMonth.getFullYear(), i, 1);
            const isCurrentMonth = i === currentMonth.getMonth();
            return (
              <Button
                key={i}
                variant={isCurrentMonth ? "default" : "outline"}
                size="sm"
                className="flex-1 min-w-[80px]"
                onClick={() => {
                  setCurrentMonth(new Date(currentMonth.getFullYear(), i, 1));
                }}
              >
                {format(month, "MMM")}
              </Button>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center mb-2">
        <div className="text-sm font-medium">Sun</div>
        <div className="text-sm font-medium">Mon</div>
        <div className="text-sm font-medium">Tue</div>
        <div className="text-sm font-medium">Wed</div>
        <div className="text-sm font-medium">Thu</div>
        <div className="text-sm font-medium">Fri</div>
        <div className="text-sm font-medium">Sat</div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 42 }).map((_, index) => {
          const dayOffset = getDay(monthStart); // 0 for Sunday, 1 for Monday, etc.
          const day = index - dayOffset + 1;
          const date = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
          );
          const isCurrentMonth = isSameMonth(date, currentMonth);
          const isToday = isSameDay(date, new Date());
          const isSelected = selectedDate && isSameDay(date, selectedDate);

          // Check if there are appointments on this day
          const dayAppointments = getAppointmentsForDay(date);
          const hasAppointments = dayAppointments.length > 0;

          return (
            <div
              key={index}
              className={`
                h-24 border rounded-md p-1 relative cursor-pointer
                ${!isCurrentMonth ? "bg-muted/50 text-muted-foreground" : ""}
                ${isToday ? "border-primary" : ""}
                ${isSelected ? "bg-primary/10 border-primary" : ""}
              `}
              onClick={() => onSelectDate(isCurrentMonth ? date : undefined)}
            >
              <div className="text-right text-sm">
                {isCurrentMonth ? day : ""}
              </div>
              {hasAppointments && isCurrentMonth && (
                <div className="absolute bottom-1 left-1 right-1">
                  <div className="text-xs bg-primary/10 text-primary rounded p-1 mb-1 truncate">
                    {dayAppointments.length} appointment
                    {dayAppointments.length !== 1 ? "s" : ""}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedDate && calendarAppointments.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">
            Appointments for {format(selectedDate, "MMMM d, yyyy")}
          </h3>
          <div className="space-y-4">
            {calendarAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onViewDetails={() => onSelectDate(selectedDate)}
              />
            ))}
          </div>
        </div>
      )}

      {selectedDate && calendarAppointments.length === 0 && (
        <div className="mt-6 text-center p-4 border rounded-md">
          <p className="text-muted-foreground">
            No appointments for {format(selectedDate, "MMMM d, yyyy")}
          </p>
        </div>
      )}
    </div>
  );
}
