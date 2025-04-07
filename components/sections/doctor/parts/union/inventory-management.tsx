"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { InventoryStats } from "@/components/adminComponents/inventory/inventory-stats";
import { InventoryTabs } from "./inventory-tabs";
import { ItemFormDialog } from "./item-form-dialog";
import { ItemDetailsDialog } from "@/components/adminComponents/inventory/item-details-dialog";
import { inventory } from "@/app/api";
import { category } from "@/app/api";
import { unit } from "@/app/api";

export function InventoryManagement() {
  const [categories, setCategories] = useState<any[]>([]);
  const [inventoryItems, setInventoryItems] = useState<any[]>([]);
  const [units, setUnits] = useState<string[]>([]);
  const [lowStockItems, setLowStockItems] = useState(0);
  const [outOfStockItems, setOutOfStockItems] = useState(0);
  const [inStockItems, setInStockItems] = useState(0);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Form state for adding/editing items
  const [formData, setFormData] = useState({
    quantity: 0
  });

  const handleViewDetails = (item: any) => {
    setSelectedItem(item);
    setIsDetailsDialogOpen(true);
  };

  const handleAddItem = () => {
    setIsEditing(false);
    setFormData({
      quantity: 0
    });
    setIsItemDialogOpen(true);
  };

  const handleDeleteItem = async (item: any) => {
    try {
      await inventory.deleteInventory(item.id);
      const { inventories } = await inventory.getAllInventories();
      setInventoryItems(inventories);
      
      // Update stats
      const { inventories: lowStock } = await inventory.getLowStockInventories();
      const { inventories: outOfStock } = await inventory.getOutOfStockInventories();
      const { inventories: inStock } = await inventory.getInStockInventories();
      setLowStockItems(lowStock.length);
      setOutOfStockItems(outOfStock.length);
      setInStockItems(inStock.length);

      toast({
        title: "Item Deleted",
        description: `${item.name} has been deleted from inventory`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    }
  };

  const handleEditItem = (item: any) => {
    setIsEditing(true);
    setSelectedItem(item);
    setFormData({
      quantity: item.quantity
    });
    setIsItemDialogOpen(true);
  };

  const handleFormChange = (field: string, value: string) => {
    if (field === 'quantity') {
      setFormData({
        quantity: Number(value)
      });
    }
  };

  const handleSaveItem = async () => {
    // Validate form
    if (!formData.quantity || Number(formData.quantity) < 0) {
      toast({
        title: "Error",
        description: "Please enter a valid quantity",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isEditing && selectedItem) {
        // Update existing item
        await inventory.updateInventory(selectedItem.id, {
          quantity: Number(formData.quantity)
        });
        const { inventories } = await inventory.getAllInventories();
        setInventoryItems(inventories);
        toast({
          title: "Item Updated",
          description: "Quantity has been updated successfully",
        });
      } else {
        // Add new item
        await inventory.createInventory({
          quantity: Number(formData.quantity)
        });
        const { inventories } = await inventory.getAllInventories();
        setInventoryItems(inventories);
        toast({
          title: "Item Added",
          description: "New item has been added to inventory",
        });
      }
      setIsItemDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save item",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { inventories } = await inventory.getAllInventories();
        const { categories } = await category.getAllCategories();
        const { units } = await unit.getInventoryUnits();
        const { inventories: lowStock } =
          await inventory.getLowStockInventories();
        const { inventories: outOfStock } =
          await inventory.getOutOfStockInventories();
        const { inventories: inStock } =
          await inventory.getInStockInventories();

        setInventoryItems(inventories);
        setCategories(categories);
        setUnits(units);
        setLowStockItems(lowStock.length);
        setOutOfStockItems(outOfStock.length);
        setInStockItems(inStock.length);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    fetchData();
  }, []);

  // Calculate total items
  const totalItems = inventoryItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Inventory Management
        </h1>
      </div>

      <InventoryStats
        totalItems={totalItems}
        totalProducts={inventoryItems.length}
        lowStockItems={lowStockItems}
        outOfStockItems={outOfStockItems}
        inStockItems={inStockItems}
      />

      <InventoryTabs
        inventoryItems={inventoryItems}
        categories={categories}
        onViewDetails={handleViewDetails}
        onEditItem={handleEditItem}
        onDeleteItem={handleDeleteItem}
      />

      {selectedItem && (
        <ItemDetailsDialog
          item={selectedItem}
          isOpen={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
          onEdit={() => {
            setIsDetailsDialogOpen(false);
            handleEditItem(selectedItem);
          }}
        />
      )}

      <ItemFormDialog
        isOpen={isItemDialogOpen}
        onOpenChange={setIsItemDialogOpen}
        isEditing={isEditing}
        formData={formData}
        onFormChange={handleFormChange}
        onSave={handleSaveItem}
      />
    </div>
  );
}
