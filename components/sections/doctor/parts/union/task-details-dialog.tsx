"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Task } from "@/types/task"

interface TaskDetailsDialogProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  task: Task | null
  handleMarkComplete: (task: Task) => void
}

export function TaskDetailsDialog({ isOpen, setIsOpen, task, handleMarkComplete }: TaskDetailsDialogProps) {
  if (!task) return null

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
          <DialogDescription>Detailed information about this task.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">{task.title}</h3>
            <Badge
              variant={
                task.status === "COMPLETED" ? "outline" : task.status === "IN_PROGRESS" ? "secondary" : "default"
              }
            >
              {task.status === "IN_PROGRESS"
                ? "In Progress"
                : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{task.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium">Assignee</h4>
              <div className="flex items-center gap-2 mt-1">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={task.assignee.avatar} alt={task.assignee.firstName} />
                  <AvatarFallback>{task.assignee.firstName.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="text-sm">{task.assignee.firstName}</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium">Assignor</h4>
              <div className="flex items-center gap-2 mt-1">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={task.assignor.avatar} alt={task.assignor.firstName} />
                  <AvatarFallback>{task.assignor.firstName.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="text-sm">{task.assignor.firstName}</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium">Priority</h4>
              <Badge
                className="mt-1"
                variant={
                  task.priority === "high" ? "destructive" : task.priority === "medium" ? "secondary" : "outline"
                }
              >
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Badge>
            </div>
            <div>
              <h4 className="text-sm font-medium">Created Date</h4>
              <p className="text-sm">
                {new Date(task.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Due Date</h4>
              <p className="text-sm">
                {new Date(task.dueDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
            </div>
            {task.status === "COMPLETED" && task.completedAt && (
              <div className="col-span-2">
                <h4 className="text-sm font-medium">Completed Date</h4>
                <p className="text-sm">
                  {new Date(task.completedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          {task.status !== "COMPLETED" && (
            <Button
              onClick={() => {
                handleMarkComplete(task)
                setIsOpen(false)
              }}
            >
              Mark as Completed
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

