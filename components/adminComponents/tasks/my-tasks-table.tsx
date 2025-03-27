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
import type { Task } from "@/types/task";

interface MyTasksTableProps {
  tasks: Task[];
  handleMarkComplete: (task: Task) => void;
  handleViewDetails: (task: Task) => void;
}

export function MyTasksTable({
  tasks,
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
                    task.priority === "high"
                      ? "destructive"
                      : task.priority === "medium"
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleViewDetails(task)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
