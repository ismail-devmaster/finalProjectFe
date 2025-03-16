export interface InventoryItem {
  id: string | number
  name: string
  category: string | { id: string | number; name: string }
  quantity: number
  unit: string
  status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK"
  expiryDate?: string
}

export interface Category {
  id: string | number
  name: string
}

