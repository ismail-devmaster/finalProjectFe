"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { UserTable } from "./user-table";
import { UserFilter } from "./user-filter";
import { BulkActions } from "./bulk-actions";
import { RoleSpecificTable } from "./role-specific-table";
import { UserProfileDialog } from "./user-profile-dialog";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";
import { UserDialog } from "./user-dialog";
import type { User } from "@/types/user";

// Mock data - in a real app, this would come from an API
const users: User[] = [
  {
    id: "USR-1001",
    name: "Olivia Johnson",
    email: "olivia.johnson@example.com",
    avatar: "/placeholder.svg",
    role: "patient",
    status: "active",
    appointments: 5,
    lastAppointment: "2023-06-15T10:00:00",
  },
  {
    id: "USR-1002",
    name: "Dr. Emma Wilson",
    email: "emma.wilson@example.com",
    avatar: "/placeholder.svg",
    role: "doctor",
    status: "active",
    appointments: 120,
    lastAppointment: "2023-06-20T14:30:00",
  },
  {
    id: "USR-1003",
    name: "James Smith",
    email: "james.smith@example.com",
    avatar: "/placeholder.svg",
    role: "patient",
    status: "inactive",
    appointments: 2,
    lastAppointment: "2023-05-10T09:15:00",
  },
  {
    id: "USR-1004",
    name: "Sarah Thompson",
    email: "sarah.thompson@example.com",
    avatar: "/placeholder.svg",
    role: "receptionist",
    status: "active",
    appointments: 0,
    lastAppointment: null,
  },
  {
    id: "USR-1005",
    name: "Dr. Michael Brown",
    email: "michael.brown@example.com",
    avatar: "/placeholder.svg",
    role: "doctor",
    status: "active",
    appointments: 95,
    lastAppointment: "2023-06-19T16:00:00",
  },
  {
    id: "USR-1006",
    name: "Sophia Martinez",
    email: "sophia.martinez@example.com",
    avatar: "/placeholder.svg",
    role: "patient",
    status: "active",
    appointments: 8,
    lastAppointment: "2023-06-18T11:30:00",
  },
  {
    id: "USR-1007",
    name: "William Johnson",
    email: "william.johnson@example.com",
    avatar: "/placeholder.svg",
    role: "patient",
    status: "active",
    appointments: 3,
    lastAppointment: "2023-06-05T15:45:00",
  },
];

export function UserManagement() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // User dialog states
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const toggleAllUsers = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id));
    }
  };

  const handleViewProfile = (user: User) => {
    setViewingUser(user);
    setIsViewDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId);
    setIsConfirmDeleteOpen(true);
  };

  const confirmDeleteUser = () => {
    // In a real app, you would call an API to delete the user
    // For now, we'll just close the dialog
    setIsConfirmDeleteOpen(false);
    setUserToDelete(null);

    // Show a toast notification
    toast({
      title: "User deleted",
      description: "The user has been successfully deleted.",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      <Tabs defaultValue="all-users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all-users">All Users</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="receptionist">Receptionist</TabsTrigger>
        </TabsList>
        <TabsContent value="all-users" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Users</CardTitle>
              <CardDescription>
                Manage users, their roles, and permissions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <UserFilter
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    roleFilter={roleFilter}
                    setRoleFilter={setRoleFilter}
                  />
                  <BulkActions selectedCount={selectedUsers.length} />
                </div>
                <UserTable
                  users={filteredUsers}
                  selectedUsers={selectedUsers}
                  toggleUserSelection={toggleUserSelection}
                  toggleAllUsers={toggleAllUsers}
                  onViewProfile={handleViewProfile}
                  onEditUser={handleEditUser}
                  onDeleteUser={handleDeleteUser}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patients</CardTitle>
              <CardDescription>
                Manage patient profiles and medical records.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RoleSpecificTable
                users={users}
                role="patient"
                onViewProfile={handleViewProfile}
                onEditUser={handleEditUser}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="doctors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Doctors</CardTitle>
              <CardDescription>
                Manage doctor profiles, specialties, and schedules.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RoleSpecificTable
                users={users}
                role="doctor"
                onViewProfile={handleViewProfile}
                onEditUser={handleEditUser}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="receptionist" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Receptionist</CardTitle>
              <CardDescription>
                Manage receptionist profiles and permissions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RoleSpecificTable
                users={users}
                role="receptionist"
                onViewProfile={handleViewProfile}
                onEditUser={handleEditUser}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <UserDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingUser(null);
        }}
        editingUser={editingUser}
      />

      <UserProfileDialog
        user={viewingUser}
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        onEditUser={handleEditUser}
      />

      <DeleteConfirmationDialog
        open={isConfirmDeleteOpen}
        onOpenChange={setIsConfirmDeleteOpen}
        onConfirm={confirmDeleteUser}
      />
    </div>
  );
}
