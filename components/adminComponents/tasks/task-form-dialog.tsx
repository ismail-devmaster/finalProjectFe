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
  handleFormChange: (field: string, value: string) => void;
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
            <Select
              value={formData.assignee}
              onValueChange={(value) => handleFormChange("assignee", value)}
            >
              <SelectTrigger id="assignee" className="col-span-3">
                <SelectValue placeholder="Select assignee" />
              </SelectTrigger>
              {/* Assignee Select */}
              <SelectContent>
                {staff.map((user) => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    {user.role === "DOCTOR"
                      ? `Dr. ${user.firstName} ${user.lastName}`
                      : `${user.firstName} ${user.lastName}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="assignor" className="text-right">
              Assignor
            </Label>
            <Select
              value={formData.assignor}
              onValueChange={(value) => handleFormChange("assignor", value)}
            >
              <SelectTrigger id="assignor" className="col-span-3">
                <SelectValue placeholder="Select assignor" />
              </SelectTrigger>
              {/* Assignor Select */}
              <SelectContent>
                {staff.map((user) => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    {user.role === "DOCTOR"
                      ? `Dr. ${user.firstName} ${user.lastName}`
                      : `${user.firstName} ${user.lastName}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
