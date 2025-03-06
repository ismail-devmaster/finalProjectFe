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
  const time = new Date(timeString)
  return format(time, "h:mm a")
}

