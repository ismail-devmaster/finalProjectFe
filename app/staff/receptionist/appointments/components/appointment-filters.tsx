"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AppointmentFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  filterPeriod: string
  onFilterChange: (value: string) => void
}

export function AppointmentFilters({
  searchTerm,
  onSearchChange,
  filterPeriod,
  onFilterChange,
}: AppointmentFiltersProps) {
  return (
    <div className="flex space-x-2">
      <Input
        placeholder="Search appointments..."
        className="w-64"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <Select value={filterPeriod} onValueChange={onFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="this-week">This Week</SelectItem>
          <SelectItem value="this-month">This Month</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

