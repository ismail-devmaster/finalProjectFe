"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Task } from "@/types/task";
import { useState } from "react";

interface MyTasksTableProps {
  tasks: Task[];
  handleEditTask: (task: Task) => void;
  handleMarkComplete: (task: Task) => void;
  handleViewDetails: (task: Task) => void;
  handleDeleteTask: (task: Task) => void;
  handleBulkDeleteTasks?: (tasks: Task[]) => void;
}

export function MyTasksTable({
  tasks,
  handleEditTask,
  handleMarkComplete,
  handleViewDetails,
  handleDeleteTask,
  handleBulkDeleteTasks,
}: MyTasksTableProps) {
  const myTasks = tasks;
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [confirmBulkDeleteOpen, setConfirmBulkDeleteOpen] = useState(false);

  const handleSelectTask = (task: Task, checked: boolean) => {
    if (checked) {
      setSelectedTasks((prev) => [...prev, task]);
    } else {
      setSelectedTasks((prev) => prev.filter((t) => t.id !== task.id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTasks([...myTasks]);
    } else {
      setSelectedTasks([]);
    }
  };

  const handleBulkDelete = () => {
    if (handleBulkDeleteTasks && selectedTasks.length > 0) {
      handleBulkDeleteTasks(selectedTasks);
      setSelectedTasks([]);
      setConfirmBulkDeleteOpen(false);
    }
  };

  return (
    <div>
      {selectedTasks.length > 0 && (
        <div className="flex items-center justify-between mb-4 p-2 bg-muted rounded-md">
          <div className="text-sm font-medium">
            {selectedTasks.length} task{selectedTasks.length > 1 ? "s" : ""}{" "}
            selected
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setConfirmBulkDeleteOpen(true)}
            className="flex items-center gap-1"
          >
            <Trash2 className="h-4 w-4" />
            Delete Selected
          </Button>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={
                    myTasks.length > 0 &&
                    selectedTasks.length === myTasks.length
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Assignees</TableHead>
              <TableHead>Assignor</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myTasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No tasks found.
                </TableCell>
              </TableRow>
            ) : (
              myTasks.map((task) => (
                <TableRow
                  key={task.id}
                  className={
                    selectedTasks.some((t) => t.id === task.id)
                      ? "bg-muted/50"
                      : ""
                  }
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedTasks.some((t) => t.id === task.id)}
                      onCheckedChange={(checked) =>
                        handleSelectTask(task, !!checked)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={task.status === "COMPLETED"}
                      onCheckedChange={() => handleMarkComplete(task)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{task.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {task.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {task.assignees.slice(0, 3).map((assignee) => (
                          <Avatar
                            key={assignee.id}
                            className="h-8 w-8 border-2 border-background"
                          >
                            <AvatarFallback>
                              {assignee.firstName.charAt(0)}
                              {assignee.lastName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm">
                          {task.assignees
                            .slice(0, 2)
                            .map(
                              (a) =>
                                `${a.firstName} ${a.lastName.substring(0, 1)}.`
                            )
                            .join(", ")}
                        </span>
                        {task.assignees.length > 2 && (
                          <span className="text-xs text-muted-foreground">
                            +{task.assignees.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {task.assignor.firstName.charAt(0)}
                          {task.assignor.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium">
                        {task.assignor.firstName} {task.assignor.lastName}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        task.priority === "HIGH"
                          ? "destructive"
                          : task.priority === "MEDIUM"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {task.priority.charAt(0).toUpperCase() +
                        task.priority.slice(1).toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(task.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        task.status === "COMPLETED"
                          ? "outline"
                          : task.status === "IN_PROGRESS"
                          ? "secondary"
                          : "default"
                      }
                    >
                      {task.status === "IN_PROGRESS"
                        ? "In Progress"
                        : task.status.charAt(0).toUpperCase() +
                          task.status.slice(1).toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
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
                          onClick={() => handleViewDetails(task)}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditTask(task)}>
                          Edit Task
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteTask(task)}
                          className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Task
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

      <Dialog
        open={confirmBulkDeleteOpen}
        onOpenChange={setConfirmBulkDeleteOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Bulk Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedTasks.length} selected
              task{selectedTasks.length > 1 ? "s" : ""}?
              <div className="mt-2 max-h-[200px] overflow-y-auto">
                <ul className="list-disc pl-5 space-y-1">
                  {selectedTasks.map((task) => (
                    <li key={task.id} className="text-sm">
                      {task.title}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-2 text-destructive font-medium">
                This action cannot be undone.
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmBulkDeleteOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleBulkDelete}>
              Delete {selectedTasks.length} Task
              {selectedTasks.length > 1 ? "s" : ""}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
