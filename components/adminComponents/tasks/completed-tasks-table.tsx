"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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

interface CompletedTasksTableProps {
  tasks: Task[];
  handleViewDetails: (task: Task) => void;
  handleDeleteTask: (task: Task) => void;
}

export function CompletedTasksTable({
  tasks,
  handleViewDetails,
  handleDeleteTask,
}: CompletedTasksTableProps) {
  const completedTasks = tasks;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Assignees</TableHead>
            <TableHead>Completed Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {completedTasks.map((task) => (
            <TableRow key={task.id}>
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
                                  {task.assignees.slice(1).map((assignee) => (
                                    <div key={assignee.id}>
                                      {assignee.firstName} {assignee.lastName}
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
