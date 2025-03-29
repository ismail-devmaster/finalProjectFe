"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";
import type { Task } from "@/types/task";
import { useState } from "react";

interface CompletedTasksTableProps {
  tasks: Task[];
  handleViewDetails: (task: Task) => void;
  handleDeleteTask: (task: Task) => void;
  handleBulkDeleteTasks?: (tasks: Task[]) => void;
}

export function CompletedTasksTable({
  tasks,
  handleViewDetails,
  handleDeleteTask,
  handleBulkDeleteTasks,
}: CompletedTasksTableProps) {
  const completedTasks = tasks;
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
      setSelectedTasks([...completedTasks]);
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
                    completedTasks.length > 0 &&
                    selectedTasks.length === completedTasks.length
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Assignees</TableHead>
              <TableHead>Completed Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {completedTasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No completed tasks found.
                </TableCell>
              </TableRow>
            ) : (
              completedTasks.map((task) => (
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
                    <div className="font-medium">{task.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {task.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {task.assignees.length > 0 && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {task.assignees[0].firstName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="font-medium">
                        {task.assignees.length > 0 ? (
                          <>
                            {task.assignees[0].firstName}{" "}
                            {task.assignees[0].lastName}
                            {task.assignees.length > 1 && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="ml-1 text-xs text-muted-foreground">
                                      +{task.assignees.length - 1} more
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <div className="space-y-1">
                                      {task.assignees
                                        .slice(1)
                                        .map((assignee) => (
                                          <div key={assignee.id}>
                                            {assignee.firstName}{" "}
                                            {assignee.lastName}
                                          </div>
                                        ))}
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </>
                        ) : (
                          "Unassigned"
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {task.completedAt
                      ? new Date(task.completedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(task)}
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleDeleteTask(task)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
