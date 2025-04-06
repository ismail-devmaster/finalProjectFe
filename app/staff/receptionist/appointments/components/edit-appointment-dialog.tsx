"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TimePicker } from "@/components/ui/time-picker";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Appointment, Doctor } from "../types";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditAppointmentDialogProps {
  appointment: Appointment;
  onSubmit: (appointment: Appointment) => void;
  onClose: () => void;
}

export function EditAppointmentDialog({
  appointment,
  onSubmit,
  onClose,
}: EditAppointmentDialogProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [timeValue, setTimeValue] = useState(
    appointment.time.split("T")[1].slice(0, 5)
  );

  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(appointment.date.split("T")[0])
  );
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const calendarDays = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="calendar-day" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = date.toDateString() === new Date().toDateString();
      const isPast = date < new Date();
      const isWeekend = date.getDay() === 5 || date.getDay() === 6; // 5=Friday, 6=Saturday
      const isSelectable = !isPast && !isWeekend;
      const isSelected = selectedDate?.toDateString() === date.toDateString();

      calendarDays.push(
        <div
          key={date.toISOString()}
          className={cn(
            "flex items-center justify-center rounded-md",
            "text-center cursor-pointer p-1 text-sm transition-colors",
            isToday && "bg-muted font-bold",
            isPast && "text-muted-foreground cursor-not-allowed",
            isWeekend && "text-muted-foreground cursor-not-allowed",
            isSelected &&
              "bg-primary text-primary-foreground hover:bg-primary/90",
            isSelectable && !isSelected && "hover:bg-muted"
          )}
          onClick={() => isSelectable && setSelectedDate(date)}
        >
          {day}
        </div>
      );
    }
    return calendarDays;
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const convertTimeTo24Hour = (timeStr: string) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = (Number.parseInt(hours, 10) + 12).toString();
    }

    return `${hours}:${minutes}`;
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Appointment</DialogTitle>
        <DialogDescription>
          Update the appointment details below.
        </DialogDescription>
      </DialogHeader>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setSuccessMessage(null);
          setErrorMessage(null);

          try {
            const formData = new FormData(e.target as HTMLFormElement);
            const updatedAppointment = {
              ...appointment,
              date: formData.get("date") as string,
              time: formData.get("time") as string,
            };
            await onSubmit(updatedAppointment);
            setSuccessMessage("Appointment updated successfully!");

            // Hide success message after 2 seconds
            setTimeout(() => {
              setSuccessMessage(null);
              onClose();
            }, 1500);
          } catch (error) {
            const errorMsg =
              error instanceof Error
                ? error.message
                : "Failed to update appointment";
            setErrorMessage(errorMsg);
            setTimeout(() => {
              setErrorMessage(null);
              onClose();
            }, 1000);
          }
        }}
      >
        <div className="grid gap-3 py-2">
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="edit-date" className="text-right pt-2">
              Date
            </Label>
            <div className="col-span-3 border rounded-lg p-2 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-sm">
                  {months[currentMonth]} {currentYear}
                </h3>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePrevMonth}
                    type="button"
                    className="h-7 w-7 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNextMonth}
                    type="button"
                    className="h-7 w-7 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center mb-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-xs font-medium text-muted-foreground"
                    >
                      {day.slice(0, 1)}
                    </div>
                  )
                )}
              </div>
              <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
              <input
                type="hidden"
                name="date"
                value={`${selectedDate.getFullYear()}-${String(
                  selectedDate.getMonth() + 1
                ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(
                  2,
                  "0"
                )}`}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-time" className="text-right">
              Time
            </Label>
            <div className="col-span-3">
              <TimePicker
                value={timeValue}
                onChange={(value) => {
                  const time24 = convertTimeTo24Hour(value);
                  setTimeValue(value);
                  const input = document.querySelector(
                    'input[name="time"]'
                  ) as HTMLInputElement;
                  if (input) input.value = time24;
                }}
              />
              <input
                type="hidden"
                name="time"
                value={convertTimeTo24Hour(timeValue)}
                required
              />
            </div>
          </div>
        </div>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {errorMessage}
          </div>
        )}

        <DialogFooter>
          <Button type="submit">Update Appointment</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
