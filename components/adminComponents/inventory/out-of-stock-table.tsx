"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface OutOfStockTableProps {
  items: any[]
  onEditItem: (item: any) => void
}

export function OutOfStockTable({ items, onEditItem }: OutOfStockTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Out of Stock Items</CardTitle>
        <CardDescription>Items that are currently out of stock.</CardDescription>
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
              {items.filter(item => item.status === "OUT_OF_STOCK").map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="font-medium">{item.name}</div>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {item.quantity} {item.unit}
                      <Badge variant="destructive">
                        Out of Stock
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
