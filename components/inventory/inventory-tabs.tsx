"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InventoryTable } from "./inventory-table"
import { LowStockTable } from "./low-stock-table"
import { ExpiringItemsTable } from "./expiring-items-table"

interface InventoryTabsProps {
  inventoryItems: any[]
  categories: any[]
  onViewDetails: (item: any) => void
  onEditItem: (item: any) => void
}

export function InventoryTabs({ inventoryItems, categories, onViewDetails, onEditItem }: InventoryTabsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toString().toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <Tabs defaultValue="all-items" className="space-y-4">
      <TabsList>
        <TabsTrigger value="all-items">All Items</TabsTrigger>
        <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
        <TabsTrigger value="expiring-soon">Expiring Soon</TabsTrigger>
      </TabsList>

      <TabsContent value="all-items" className="space-y-4">
        <InventoryTable
          items={filteredItems}
          categories={categories}
          searchTerm={searchTerm}
          categoryFilter={categoryFilter}
          statusFilter={statusFilter}
          onSearchChange={setSearchTerm}
          onCategoryFilterChange={setCategoryFilter}
          onStatusFilterChange={setStatusFilter}
          onViewDetails={onViewDetails}
          onEditItem={onEditItem}
        />
      </TabsContent>

      <TabsContent value="low-stock" className="space-y-4">
        <LowStockTable
          items={inventoryItems.filter((item) => item.status === "LOW_STOCK" || item.status === "OUT_OF_STOCK")}
          onEditItem={onEditItem}
        />
      </TabsContent>

      <TabsContent value="expiring-soon" className="space-y-4">
        <ExpiringItemsTable
          items={inventoryItems.filter((item) => {
            if (!item.expiryDate) return false
            const expiryDate = new Date(item.expiryDate)
            const threeMonthsFromNow = new Date()
            threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
            return expiryDate <= threeMonthsFromNow
          })}
          onViewDetails={onViewDetails}
        />
      </TabsContent>
    </Tabs>
  )
}

