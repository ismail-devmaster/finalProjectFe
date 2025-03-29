"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { TaskFormData } from "@/types/task";
import { IUser } from "@/types/user";

interface TaskFormDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
  description: string;
  formData: TaskFormData;
  staff: IUser[];
  handleFormChange: (field: string, value: string | number | number[]) => void;
  handleSave: () => void;
}

export function TaskFormDialog({
  isOpen,
  setIsOpen,
  title,
  description,
  formData,
  staff,
  handleFormChange,
  handleSave,
}: TaskFormDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              className="col-span-3"
              placeholder="Enter task title"
              value={formData.title}
              onChange={(e) => handleFormChange("title", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Description
            </Label>
            <Textarea
              id="description"
              className="col-span-3"
              placeholder="Enter task description"
              value={formData.description}
              onChange={(e) => handleFormChange("description", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="assignee" className="text-right">
              Assignee
            </Label>
            {/* Assignee Select */}
            <div className="col-span-3 space-y-2">
              <div className="border rounded-md p-2 max-h-60 overflow-y-auto">
                {staff.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded"
                  >
                    <input
                      type="checkbox"
                      id={`user-${user.id}`}
                      checked={formData.assignees?.includes(user.id) || false}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        const currentAssignees = formData.assignees || [];
                        const newAssignees = isChecked
                          ? [...currentAssignees, user.id]
                          : currentAssignees.filter((id) => id !== user.id);
                        handleFormChange("assignees", newAssignees);
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`user-${user.id}`}
                      className="text-sm font-medium text-gray-700"
                    >
                      {user.role === "DOCTOR"
                        ? `Dr. ${user.firstName} ${user.lastName}`
                        : `${user.firstName} ${user.lastName}`}
                    </label>
                  </div>
                ))}
              </div>
              {(formData.assignees?.length || 0) > 0 && (
                <div className="text-xs text-gray-500">
                  Selected:{" "}
                  {(formData.assignees || [])
                    .map((id) => {
                      const user = staff.find(u => u.id === id);
                      return user 
                        ? `${user.role === "DOCTOR" ? "Dr. " : ""}${user.firstName} ${user.lastName}`
                        : '';
                    })
                    .join(", ")}
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <Select
              value={formData.priority}
              onValueChange={(value) => handleFormChange("priority", value)}
            >
              <SelectTrigger id="priority" className="col-span-3">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dueDate" className="text-right">
              Due Date
            </Label>
            <Input
              id="dueDate"
              type="datetime-local"
              className="col-span-3"
              value={formData.dueDate}
              onChange={(e) => handleFormChange("dueDate", e.target.value)}
              min="2025-03-29T16:06"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {title.includes("Create") ? "Create Task" : "Update Task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
