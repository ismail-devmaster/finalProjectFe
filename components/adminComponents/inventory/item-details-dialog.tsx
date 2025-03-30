"use client";

import { Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ItemDetailsDialogProps {
  item: any;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
}

export function ItemDetailsDialog({
  item,
  isOpen,
  onOpenChange,
  onEdit,
}: ItemDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Inventory Item Details</DialogTitle>
          <DialogDescription>
            Detailed information about this inventory item.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-md bg-primary/10 flex items-center justify-center">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.id}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium">Category</h4>
              <p className="text-sm">{item.category}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Quantity</h4>
              <p className="text-sm">
                {item.quantity} {item.unit}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Status</h4>
              <Badge
                variant={
                  item.status === "IN_STOCK"
                    ? "outline"
                    : item.status === "LOW_STOCK"
                    ? "secondary"
                    : "destructive"
                }
              >
                {item.status === "IN_STOCK"
                  ? "In Stock"
                  : item.status === "LOW_STOCK"
                  ? "Low Stock"
                  : "Out of Stock"}
              </Badge>
            </div>
            <div>
              <h4 className="text-sm font-medium">Expiry Date</h4>
              <p className="text-sm">
                {item.expiryDate
                  ? new Date(item.expiryDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={onEdit}>Edit Item</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
