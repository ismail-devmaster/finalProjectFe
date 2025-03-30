"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ExpiringItemsTableProps {
  items: any[];
  onViewDetails: (item: any) => void;
}

export function ExpiringItemsTable({
  items,
  onViewDetails,
}: ExpiringItemsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expiring Soon</CardTitle>
        <CardDescription>
          Items that will expire within the next 3 months.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="font-medium">{item.name}</div>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    {item.expiryDate
                      ? new Date(item.expiryDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {item.quantity} {item.unit}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails(item)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
