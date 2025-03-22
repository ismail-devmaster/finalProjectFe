"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import type { Task, TaskFormData } from "@/types/task";
import { TaskStats } from "./union/task-stats";
import { MyTasksTable } from "./union/my-tasks-table";
import { CompletedTasksTable } from "./union/completed-tasks-table";
import { TaskDetailsDialog } from "./union/task-details-dialog";
import { TaskFormDialog } from "./union/task-form-dialog";

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
}
interface Tasks {
  id: string;
  title: string;
  description: string;
  assignee: Person;
  assignor: Person;
  priority: "high" | "medium" | "low";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  dueDate: string;
  createdAt: string;
  completedAt?: string;
}
interface TasksProps {
  tasks: Tasks[];
  doctorId: { id: number };
}
export default function Tasks({ tasks, doctorId }: TasksProps) {
  // Replace mock data with state initialized to an empty array
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);
  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskFormData, setTaskFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    assignee: "",
    assignor: "",
    priority: "",
    dueDate: "",
  });
  const { toast } = useToast();

  // Fetch tasks from the API on component mount

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignee.firstName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  const handleEditTask = (task: Task) => {
    setEditingTask(task);

    // Format the due date for the input field
    let formattedDueDate = "";
    if (task.dueDate) {
      const date = new Date(task.dueDate);
      formattedDueDate = date.toISOString().split(".")[0].slice(0, -3);
    }

    setTaskFormData({
      title: task.title,
      description: task.description,
      assignee:
        task.assignee.firstName === "Sarah Thompson"
          ? "sarah"
          : task.assignee.firstName === "Dr. Emma Wilson"
          ? "emma"
          : "michael",
      assignor:
        task.assignor.firstName === "Sarah Thompson"
          ? "sarah"
          : task.assignor.firstName === "Dr. Emma Wilson"
          ? "emma"
          : "michael",
      priority: task.priority,
      dueDate: formattedDueDate,
    });

    setIsEditTaskDialogOpen(true);
  };

  const handleDeleteTask = (task: Task) => {
    // In a real app, this would delete the task from the database
    // For now, we'll just remove it from the local state
  };
  const handleMarkComplete = (task: Task) => {
    // In a real app, this would update the task in the database
    const updatedTask = {
      ...task,
      status: "COMPLETED",
      completedAt: new Date().toISOString(),
    };

    // Show success toast
    toast({
      title: "Task Completed",
      description: `Task "${task.title}" has been marked as completedf`,
    });

    // If the task details dialog is open, close it
    if (isDialogOpen && selectedTask?.id === task.id) {
      setIsDialogOpen(false);
    }
  };

  const handleViewDetails = (task: Task) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  const handleTaskFormChange = (field: string, value: string) => {
    setTaskFormData({
      ...taskFormData,
      [field]: value,
    });
  };

  const handleCreateTask = () => {
    setTaskFormData({
      title: "",
      description: "",
      assignee: "",
      assignor: "",
      priority: "",
      dueDate: "",
    });
    setIsNewTaskDialogOpen(true);
  };

  const handleSaveTask = () => {
    // Validate form
    if (
      !taskFormData.title ||
      !taskFormData.assignee ||
      !taskFormData.priority ||
      !taskFormData.dueDate
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (isEditTaskDialogOpen && editingTask) {
      // Update existing task
      toast({
        title: "Task Updated",
        description: `Task "${taskFormData.title}" has been updated successfully`,
      });
      setIsEditTaskDialogOpen(false);
    } else {
      // Create new task
      toast({
        title: "Task Created",
        description: "New task has been created successfully",
      });
      setIsNewTaskDialogOpen(false);
    }

    // Reset form data
    setTaskFormData({
      title: "",
      description: "",
      assignee: "",
      assignor: "",
      priority: "",
      dueDate: "",
    });
    setEditingTask(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Task Management</h1>
        <Button onClick={handleCreateTask}>
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      <TaskStats tasks={tasks} />

      <Tabs defaultValue="my-tasks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="my-tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>
              <CardDescription>Tasks assigned to you.</CardDescription>
            </CardHeader>
            <CardContent>
              <MyTasksTable
                tasks={tasks}
                myId={doctorId!}
                handleMarkComplete={handleMarkComplete}
                handleViewDetails={handleViewDetails}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Tasks</CardTitle>
              <CardDescription>Tasks that have been completed.</CardDescription>
            </CardHeader>
            <CardContent>
              <CompletedTasksTable
                tasks={tasks}
                handleViewDetails={handleViewDetails}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Task Details Dialog */}
      <TaskDetailsDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        task={selectedTask}
        handleMarkComplete={handleMarkComplete}
      />

      {/* New Task Dialog */}
      <TaskFormDialog
        isOpen={isNewTaskDialogOpen}
        setIsOpen={setIsNewTaskDialogOpen}
        title="Create New Task"
        description="Add a new task to the system."
        formData={taskFormData}
        handleFormChange={handleTaskFormChange}
        handleSave={handleSaveTask}
      />

      {/* Edit Task Dialog */}
      <TaskFormDialog
        isOpen={isEditTaskDialogOpen}
        setIsOpen={setIsEditTaskDialogOpen}
        title="Edit Task"
        description="Update the details of this task."
        formData={taskFormData}
        handleFormChange={handleTaskFormChange}
        handleSave={handleSaveTask}
      />
    </div>
  );
}
