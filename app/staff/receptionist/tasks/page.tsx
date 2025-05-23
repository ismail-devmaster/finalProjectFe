"use client";

import { useCallback, useEffect, useState } from "react";
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
import { TaskStats } from "@/components/receptionistComponents/tasks/task-stats";
import { MyTasksTable } from "@/components/adminComponents/tasks/my-tasks-table";
import { CompletedTasksTable } from "@/components/adminComponents/tasks/completed-tasks-table";
import { TaskDetailsDialog } from "@/components/adminComponents/tasks/task-details-dialog";
import { TaskFormDialog } from "@/components/receptionistComponents/tasks/task-form-dialog";

// Import the API function from your api.ts file
import { allTasks, auth, user } from "@/app/api";
import { IUser } from "@/types/user";

export default function TaskManagement() {
  // Replace mock data with state initialized to an empty array
  const [myId, setMyId] = useState<{ id: number } | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [myTasks, setMyTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [staff, setStaff] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);
  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskFormData, setTaskFormData] = useState<TaskFormData>({
    id: "",
    title: "",
    description: "",
    assignee: "",
    assignor: "",
    priority: "",
    dueDate: "",
  });
  const { toast } = useToast();

  const fetchMyId = useCallback(async () => {
    try {
      const { user } = await auth.getUserId();
      if (user) setMyId(user);
    } catch (error) {
      console.error("Error fetching user ID: ", error);
    }
  }, []);

  const fetchAllTasks = useCallback(async () => {
    try {
      const { tasks } = await allTasks.getAllTasks();
      setTasks(tasks);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, []);

  const fetchMyTasks = useCallback(async () => {
    try {
      const { tasks } = await allTasks.getMyTasks();
      setMyTasks(tasks);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, []);

  const fetchMyCompletedTasks = useCallback(async () => {
    try {
      const { tasks } = await allTasks.getCompletedTasks();
      setCompletedTasks(tasks);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, []);

  const fetchStaff = useCallback(async () => {
    try {
      const  staff  = await user.getAllReceptionistsAndDoctors()
      setStaff(staff);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, []);

  // 2. Modify useEffect to use the extracted functions
  useEffect(() => {
    fetchMyId();
    fetchStaff();
    fetchMyTasks();
    fetchMyCompletedTasks();
    fetchAllTasks();
  }, [
    fetchAllTasks,
    fetchMyCompletedTasks,
    fetchMyId,
    fetchMyTasks,
    fetchStaff,
  ]);
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.dueDate.toLowerCase().includes(searchTerm.toLowerCase());
    // task.assignee.firstName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;

    // New time filter logic
    const matchesTime = (() => {
      if (timeFilter === "all") return true;
      if (!task.dueDate) return false;

      const taskDate = new Date(task.dueDate);
      const now = new Date();
      const timeDiff = now.getTime() - taskDate.getTime();

      if (timeFilter === "week") return timeDiff <= 7 * 24 * 60 * 60 * 1000;
      if (timeFilter === "month") return timeDiff <= 30 * 24 * 60 * 60 * 1000;
      return true;
    })();

    return matchesSearch && matchesPriority && matchesStatus && matchesTime;
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
      id: task.id,
      title: task.title,
      description: task.description,
      assignor: task.assignor.firstName,
      priority: task.priority.toLowerCase(),
      dueDate: formattedDueDate,
    });

    setIsEditTaskDialogOpen(true);
  };
  const handleMarkComplete = async (task: Task, status: string) => {
    try {
      await allTasks.updateTask(task.id, {
        status: status,
        completedAt: new Date().toISOString(),
      });
      await Promise.all([
        fetchAllTasks(),
        fetchMyTasks(),
        fetchMyCompletedTasks(),
      ]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark task as complete",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTask = async (task: Task) => {
    try {
      await allTasks.deleteTask(task.id);
      await Promise.all([
        fetchAllTasks(),
        fetchMyTasks(),
        fetchMyCompletedTasks(),
      ]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
    }
  };

  const handleBulkDeleteTasks = async (tasksToDelete: Task[]) => {
    try {
      await Promise.all(
        tasksToDelete.map((task) => allTasks.deleteTask(task.id))
      );
      await Promise.all([
        fetchAllTasks(),
        fetchMyTasks(),
        fetchMyCompletedTasks(),
      ]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete tasks",
        variant: "destructive",
      });
    }
  };
  const handleViewDetails = (task: Task) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  const handleTaskFormChange = (
    field: string,
    value: string | number | number[]
  ) => {
    if (field === "assignees" && Array.isArray(value)) {
      setTaskFormData({
        ...taskFormData,
        assignees: value as number[],
        assignee: value[0]?.toString() || "",
      });
    } else {
      setTaskFormData({
        ...taskFormData,
        [field]: value,
      });
    }
  };

  const handleCreateTask = () => {
    setTaskFormData({
      id: "",
      title: "",
      description: "",
      assignee: "",
      assignor: "",
      priority: "",
      dueDate: "",
    });
    setIsNewTaskDialogOpen(true);
  };

  const handleSaveTask = async () => {
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
    try {
      if (isEditTaskDialogOpen && editingTask) {
        // Update existing task
        toast({
          title: "Task Updated",
          description: `Task "${taskFormData.title}" has been updated successfully`,
        });
        const updatedTask = {
          title: taskFormData.title,
          description: taskFormData.description,
          assigneeIds: taskFormData.assignees,
          assignorId: myId?.id,
          priority: taskFormData.priority.toUpperCase(),
          dueDate: taskFormData.dueDate,
        };
        await allTasks.updateTask(taskFormData.id, updatedTask);
        await Promise.all([
          fetchAllTasks(),
          fetchMyTasks(),
          fetchMyCompletedTasks(),
        ]);
        setIsEditTaskDialogOpen(false);
      } else {
        // Create new task
        toast({
          title: "Task Created",
          description: "New task has been created successfully",
        });
        const newTask = {
          title: taskFormData.title,
          description: taskFormData.description,
          assigneeIds: taskFormData.assignees,
          assignorId: myId?.id,
          priority: taskFormData.priority.toUpperCase(),
          status: "PENDING",
          dueDate: taskFormData.dueDate,
        };
        await allTasks.createTask(newTask);
        await Promise.all([
          fetchAllTasks(),
          fetchMyTasks(),
          fetchMyCompletedTasks(),
        ]);
        setIsNewTaskDialogOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save task",
        variant: "destructive",
      });
    }

    // Reset form data
    setTaskFormData({
      id: "",
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

      <TaskStats tasks={myTasks} completedTasks={completedTasks!} />

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
                tasks={myTasks}
                handleEditTask={handleEditTask}
                handleMarkComplete={handleMarkComplete}
                handleViewDetails={handleViewDetails}
                handleDeleteTask={handleDeleteTask}
                handleBulkDeleteTasks={handleBulkDeleteTasks}
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
                tasks={completedTasks}
                handleViewDetails={handleViewDetails}
                handleDeleteTask={handleDeleteTask}
                handleBulkDeleteTasks={handleBulkDeleteTasks}
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
        staff={staff}
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
        staff={staff}
        handleFormChange={handleTaskFormChange}
        handleSave={handleSaveTask}
      />
    </div>
  );
}
