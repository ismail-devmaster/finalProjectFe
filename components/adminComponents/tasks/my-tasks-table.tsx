"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
              <TableCell colSpan={8} className="h-24 text-center">
                No tasks found.
              </TableCell>
            </TableRow>
          ) : (
            myTasks.map((task) => (
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
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {task.assignees.slice(0, 3).map((assignee) => (
                        <Avatar
                          key={assignee.id}
                          className="h-8 w-8 border-2 border-background"
                        >
                          <AvatarImage
                            src={assignee.avatar}
                            alt={assignee.firstName}
                          />
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
                      <AvatarImage
                        src={task.assignor.avatar}
                        alt={task.assignor.firstName}
                      />
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
