"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { InventoryStats } from "./inventory-stats";
import { InventoryTabs } from "./inventory-tabs";
import { ItemFormDialog } from "./item-form-dialog";
import { ItemDetailsDialog } from "./item-details-dialog";
import { inventory } from "@/app/api/inventory";
import { category } from "@/app/api/category";
import { unit } from "@/app/api/unit";

export function InventoryManagement() {
  const [categories, setCategories] = useState<any[]>([]);
  const [inventoryItems, setInventoryItems] = useState<any[]>([]);
  const [units, setUnits] = useState<string[]>([]);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Form state for adding/editing items
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "", // Changed from 'category' to 'categoryId'
    quantity: 0,
    unit: "",
    status: "",
    expiryDate: "",
  });

  const handleViewDetails = (item: any) => {
    setSelectedItem(item);
    setIsDetailsDialogOpen(true);
  };

  const handleAddItem = () => {
    setIsEditing(false);
    setFormData({
      name: "",
      categoryId: "",
      quantity: 0,
      unit: "",
      status: "",
      expiryDate: "",
    });
    setIsItemDialogOpen(true);
  };

  const handleEditItem = (item: any) => {
    setIsEditing(true);
    setSelectedItem(item);

    // Format the expiry date for the input field
    let formattedExpiryDate = "";
    if (item.expiryDate) {
      const date = new Date(item.expiryDate);
      formattedExpiryDate = date.toISOString().split("T")[0];
    }

    setFormData({
      name: item.name,
      categoryId: item.categoryId, // Changed from 'category' to 'categoryId'
      quantity: item.quantity.toString(),
      unit: item.unit,
      status: item.status,
      expiryDate: formattedExpiryDate,
    });

    setIsItemDialogOpen(true);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSaveItem = async () => {
    // Validate form
    if (
      !formData.name ||
      !formData.categoryId || // Changed from 'category' to 'categoryId'
      !formData.quantity ||
      !formData.unit ||
      !formData.status
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const dataToSend = {
      ...formData,
      category: formData.categoryId,
    };

    if (isEditing && selectedItem) {
      // Update existing item
      await inventory.updateInventory(selectedItem.id, dataToSend);
      const { inventories } = await inventory.getAllInventories();
      setInventoryItems(inventories);
      toast({
        title: "Item Updated",
        description: `${formData.name} has been updated successfully`,
      });
    } else {
      // Add new item
      await inventory.createInventory(dataToSend);
      const { inventories } = await inventory.getAllInventories();
      setInventoryItems(inventories);
      toast({
        title: "Item Added",
        description: `${formData.name} has been added to inventory`,
      });
    }

    setIsItemDialogOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { inventories } = await inventory.getAllInventories();
        const { categories } = await category.getAllCategories();
        const { units } = await unit.getInventoryUnits();
        setInventoryItems(inventories);
        setCategories(categories);
        setUnits(units);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    fetchData();
  }, []);

  // Calculate inventory stats
  const totalItems = inventoryItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const lowStockItems = inventoryItems.filter(
    (item) => item.status === "LOW_STOCK"
  ).length;
  const outOfStockItems = inventoryItems.filter(
    (item) => item.status === "OUT_OF_STOCK"
  ).length;
  const inStockItems = inventoryItems.filter(
    (item) => item.status === "IN_STOCK"
  ).length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Inventory Management
        </h1>
        <Button onClick={handleAddItem}>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
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
        categories={categories}
        units={units}
        onFormChange={handleFormChange}
        onSave={handleSaveItem}
      />
    </div>
  );
}
