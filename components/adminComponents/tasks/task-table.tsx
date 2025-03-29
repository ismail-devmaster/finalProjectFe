"use client"

import { MoreHorizontal, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Task } from "@/types/task"
import { useState } from "react"

interface TaskTableProps {
  tasks: Task[]
  handleMarkComplete: (task: Task) => void
  handleViewDetails: (task: Task) => void
  handleEditTask: (task: Task) => void
  handleDeleteTask: (task: Task) => void
  handleBulkDeleteTasks?: (tasks: Task[]) => void
}

export function TaskTable({
  tasks,
  handleMarkComplete,
  handleViewDetails,
  handleEditTask,
  handleDeleteTask,
  handleBulkDeleteTasks,
}: TaskTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([])
  const [confirmBulkDeleteOpen, setConfirmBulkDeleteOpen] = useState(false)

  const openDeleteDialog = (task: Task) => {
    setTaskToDelete(task)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (taskToDelete) {
      handleDeleteTask(taskToDelete)
      setDeleteDialogOpen(false)
      setTaskToDelete(null)
    }
  }

  const handleSelectTask = (task: Task, checked: boolean) => {
    if (checked) {
      setSelectedTasks((prev) => [...prev, task])
    } else {
      setSelectedTasks((prev) => prev.filter((t) => t.id !== task.id))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTasks([...tasks])
    } else {
      setSelectedTasks([])
    }
  }

  const handleBulkDelete = () => {
    if (handleBulkDeleteTasks && selectedTasks.length > 0) {
      handleBulkDeleteTasks(selectedTasks)
      setSelectedTasks([])
      setConfirmBulkDeleteOpen(false)
    }
  }

  return (
    <>
      {selectedTasks.length > 0 && (
        <div className="flex items-center justify-between mb-4 p-2 bg-muted rounded-md">
          <div className="text-sm font-medium">
            {selectedTasks.length} task{selectedTasks.length > 1 ? "s" : ""} selected
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
                  checked={tasks.length > 0 && selectedTasks.length === tasks.length}
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
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No tasks found.
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task) => (
                <TableRow key={task.id} className={selectedTasks.some((t) => t.id === task.id) ? "bg-muted/50" : ""}>
                  <TableCell>
                    <Checkbox
                      checked={selectedTasks.some((t) => t.id === task.id)}
                      onCheckedChange={(checked) => handleSelectTask(task, !!checked)}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={task.status === "COMPLETED"}
                      onCheckedChange={() => {
                        if (task.status !== "COMPLETED") {
                          handleMarkComplete(task)
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{task.title}</div>
                    <div className="text-xs text-muted-foreground">{task.id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {task.assignees.slice(0, 3).map((assignee) => (
                          <Avatar key={assignee.id} className="h-8 w-8 border-2 border-background">
                            {assignee.avatar && <AvatarImage src={assignee.avatar} alt={assignee.firstName} />}
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
                            .map((a) => `${a.firstName} ${a.lastName.substring(0, 1)}.`)
                            .join(", ")}
                        </span>
                        {task.assignees.length > 2 && (
                          <span className="text-xs text-muted-foreground">+{task.assignees.length - 2} more</span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        {task.assignor.avatar && (
                          <AvatarImage src={task.assignor.avatar} alt={task.assignor.firstName} />
                        )}
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
                        task.priority === "HIGH" ? "destructive" : task.priority === "MEDIUM" ? "secondary" : "outline"
                      }
                    >
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1).toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(task.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
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
                        : task.status.charAt(0).toUpperCase() + task.status.slice(1).toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewDetails(task)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditTask(task)}>Edit Task</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {task.status !== "COMPLETED" && (
                          <DropdownMenuItem onClick={() => handleMarkComplete(task)}>
                            Mark as Completed
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => openDeleteDialog(task)} className="text-destructive">
                          Delete
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

      {/* Single task delete confirmation */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this task?
              {taskToDelete && <span className="mt-2 block font-medium">"{taskToDelete.title}"</span>}
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex items-center gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk delete confirmation */}
      <Dialog open={confirmBulkDeleteOpen} onOpenChange={setConfirmBulkDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Bulk Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedTasks.length} selected task{selectedTasks.length > 1 ? "s" : ""}?
              <div className="mt-2 max-h-[200px] overflow-y-auto">
                <ul className="list-disc pl-5 space-y-1">
                  {selectedTasks.map((task) => (
                    <li key={task.id} className="text-sm">
                      {task.title}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-2 text-destructive font-medium">This action cannot be undone.</p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmBulkDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleBulkDelete}>
              Delete {selectedTasks.length} Task{selectedTasks.length > 1 ? "s" : ""}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

