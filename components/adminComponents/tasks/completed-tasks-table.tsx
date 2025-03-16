"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Task } from "@/types/task";

interface CompletedTasksTableProps {
  tasks: Task[];
  handleViewDetails: (task: Task) => void;
}

export function CompletedTasksTable({
  tasks,
  handleViewDetails,
}: CompletedTasksTableProps) {
  const completedTasks = tasks.filter((task) => task.status === "COMPLETED");

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Assignee</TableHead>
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
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={task.assignee.avatar}
                      alt={task.assignee.firstName}
                    />
                    <AvatarFallback>
                      {task.assignee.firstName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="font-medium">
                    {task.assignee.firstName} {task.assignee.lastName}
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
