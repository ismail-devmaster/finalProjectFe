"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  className?: string;
}

export function TimePicker({ value, onChange, className }: TimePickerProps) {
  const [open, setOpen] = React.useState(false);

  // Generate time slots from 8:00 AM to 6:00 PM in 30-minute intervals
  const timeSlots = React.useMemo(() => {
    const slots = [];
    const startHour = 8;
    const endHour = 18; // 6 PM

    for (let hour = startHour; hour <= endHour; hour++) {
      for (const minute of [0, 30]) {
        if (hour === endHour && minute > 0) continue; // Don't go past 6:00 PM

        const amPm = hour >= 12 ? "PM" : "AM";
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        const displayMinute = minute === 0 ? "00" : minute;

        slots.push(`${displayHour}:${displayMinute} ${amPm}`);
      }
    }

    return slots;
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {value || "Select time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <div className="max-h-[300px] overflow-y-auto p-2">
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((timeSlot) => (
              <Button
                key={timeSlot}
                variant={value === timeSlot ? "default" : "outline"}
                className={cn(
                  "justify-center",
                  value === timeSlot && "bg-primary text-primary-foreground"
                )}
                onClick={() => {
                  onChange(timeSlot);
                  setOpen(false);
                }}
              >
                {timeSlot}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
