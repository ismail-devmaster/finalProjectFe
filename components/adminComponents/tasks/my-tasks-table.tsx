"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Task } from "@/types/task";

interface MyTasksTableProps {
  tasks: Task[];
  handleEditTask: (task: Task) => void;
  handleMarkComplete: (task: Task) => void;
  handleViewDetails: (task: Task) => void;
}

export function MyTasksTable({
  tasks,
  handleEditTask,
  handleMarkComplete,
  handleViewDetails,
}: MyTasksTableProps) {
  const myTasks = tasks;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {myTasks.map((task) => (
            <TableRow key={task.id}>
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
                    task.priority.slice(1)}
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
                      task.status.slice(1)}
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
                    <DropdownMenuItem onClick={() => handleViewDetails(task)}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditTask(task)}>
                      Edit Task
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}