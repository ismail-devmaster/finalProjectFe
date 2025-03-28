export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface Task {
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

export interface TaskFormData {
  id: string;
  title: string;
  description: string;
  assignee: string;
  assignor: string;
  priority: string;
  dueDate: string;
}
