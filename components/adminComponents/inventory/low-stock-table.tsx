"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface LowStockTableProps {
  items: any[]
  onEditItem: (item: any) => void
}

export function LowStockTable({ items, onEditItem }: LowStockTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Low Stock Items</CardTitle>
        <CardDescription>Items that need to be reordered soon.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.id}</div>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {item.quantity} {item.unit}
                      <Badge variant={item.status === "OUT_OF_STOCK" ? "destructive" : "secondary"}>
                        {item.status === "OUT_OF_STOCK" ? "Out of Stock" : "Low Stock"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => onEditItem(item)}>
                      Edit Item
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

