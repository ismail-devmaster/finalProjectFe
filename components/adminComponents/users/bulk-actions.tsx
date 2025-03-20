"use client"

import { Check, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BulkActionsProps {
  selectedCount: number
}

export function BulkActions({ selectedCount }: BulkActionsProps) {
  if (selectedCount === 0) return null

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm">
        <Check className="mr-2 h-4 w-4" />
        Change Role
      </Button>
      <Button variant="outline" size="sm">
        <Check className="mr-2 h-4 w-4" />
        Change Status
      </Button>
      <Button variant="destructive" size="sm">
        <Trash className="mr-2 h-4 w-4" />
        Delete
      </Button>
    </div>
  )
}

