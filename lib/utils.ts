import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  const date = new Date(dateString)
  return format(date, "MMM d, yyyy")
}

export function formatTime(timeString: string) {
  // Check if timeString is in 24-hour format (HH:mm)
  if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeString)) {
    const [hours, minutes] = timeString.split(':')
    const date = new Date()
    date.setHours(parseInt(hours))
    date.setMinutes(parseInt(minutes))
    return format(date, "h:mm a")
  }
  // Fall back to ISO string parsing
  const time = new Date(timeString)
  return format(time, "h:mm a")
}
