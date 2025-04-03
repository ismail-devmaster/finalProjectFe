"use client"

import { useState } from "react"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TimePickerProps {
  value: string
  onChange: (time: string) => void
  className?: string
}

export function TimePicker({ value, onChange, className }: TimePickerProps) {
  const [open, setOpen] = useState(false)
  const [hours, setHours] = useState<string>(value ? value.split(":")[0] : "09")
  const [minutes, setMinutes] = useState<string>(value ? value.split(":")[1]?.split(" ")[0] : "00")
  const [period, setPeriod] = useState<string>(value ? (value.includes("PM") ? "PM" : "AM") : "AM")

  const hoursOptions = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 1
    return hour < 10 ? `0${hour}` : `${hour}`
  })

  const minutesOptions = Array.from({ length: 12 }, (_, i) => {
    const minute = i * 5
    return minute < 10 ? `0${minute}` : `${minute}`
  })

  const handleTimeChange = () => {
    const formattedTime = `${hours}:${minutes} ${period}`
    onChange(formattedTime)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={`w-full justify-start text-left font-normal ${className}`}>
          <Clock className="mr-2 h-4 w-4" />
          {value || "Select time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="grid gap-1 flex-1">
              <div className="font-medium text-sm">Hour</div>
              <Select value={hours} onValueChange={setHours}>
                <SelectTrigger>
                  <SelectValue placeholder="Hour" />
                </SelectTrigger>
                <SelectContent>
                  {hoursOptions.map((hour) => (
                    <SelectItem key={hour} value={hour}>
                      {hour}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1 flex-1">
              <div className="font-medium text-sm">Minute</div>
              <Select value={minutes} onValueChange={setMinutes}>
                <SelectTrigger>
                  <SelectValue placeholder="Minute" />
                </SelectTrigger>
                <SelectContent>
                  {minutesOptions.map((minute) => (
                    <SelectItem key={minute} value={minute}>
                      {minute}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1 flex-1">
              <div className="font-medium text-sm">Period</div>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="AM/PM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleTimeChange}>Apply</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

