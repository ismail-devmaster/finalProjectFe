"use client";

import { Search, Filter, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface InventoryTableProps {
  items: any[];
  categories: any[];
  searchTerm: string;
  categoryFilter: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onCategoryFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onViewDetails: (item: any) => void;
  onEditItem: (item: any) => void;
}

export function InventoryTable({
  items,
  categories,
  searchTerm,
  categoryFilter,
  statusFilter,
  onSearchChange,
  onCategoryFilterChange,
  onStatusFilterChange,
  onViewDetails,
  onEditItem,
}: InventoryTableProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Inventory Items</CardTitle>
        <CardDescription>Manage your dental clinic inventory.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search inventory..."
                  className="pl-8 w-[250px] sm:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex items-center gap-2">
                <Select
                  value={categoryFilter}
                  onValueChange={onCategoryFilterChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Category" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={statusFilter}
                  onValueChange={onStatusFilterChange}
                >
                  <SelectTrigger className="w-[150px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="IN_STOCK">In Stock</SelectItem>
                    <SelectItem value="LOW_STOCK">Low Stock</SelectItem>
                    <SelectItem value="OUT_OF_STOCK">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No inventory items found.
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="font-medium">{item.name}</div>
                      </TableCell>

                      <TableCell>{item.category.name}</TableCell>

                      <TableCell>
                        {item.quantity} {item.unit}
                      </TableCell>

                      <TableCell>
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
                      </TableCell>

                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => onViewDetails(item)}
                            >
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEditItem(item)}>
                              Edit Item
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
