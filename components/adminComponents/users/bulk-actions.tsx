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

    </div>
  )
}

