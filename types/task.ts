import { IUser } from "./user";

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: Person;
  assignees: [Person];
  assignor: Person;
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  dueDate: string;
  createdAt: string;
  completedAt?: string;
}

export interface TaskFormData {
  id: string;
  title: string;
  description: string;
  assignee?: string; // Keep for backward compatibility
  assignees?: number[]; // Array of user IDs
  assignor: string;
  priority: string;
  dueDate: string;
}
