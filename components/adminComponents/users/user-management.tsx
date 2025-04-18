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

import { useEffect } from "react";
import { action, admin } from "@/app/api";

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [actions, setActions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await admin.getAllUsers();
        setUsers(data.users);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setIsLoading(false);
        console.error("Error fetching users:", err);
      }
    };
    const fetchActions = async () => {
      try {
        const data = await action.getAllActions();
        setActions(data.actions);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setIsLoading(false);
        console.error("Error fetching users:", err);
      }
    };
    fetchActions();
    fetchUsers();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // User dialog states
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole =
      roleFilter === "all" ||
      (roleFilter === "PATIENT" && user.role === "PATIENT") ||
      (roleFilter === "DOCTOR" && user.role === "DOCTOR") ||
      (roleFilter === "RECEPTIONIST" && user.role === "RECEPTIONIST");

    return matchesSearch && matchesRole;
  });

  const handleViewProfile = (user: User) => {
    console.log(user);
    setViewingUser(user);
    setIsViewDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const handleDeleteUser = (userId: number) => {
    setUserToDelete(userId);
    setIsConfirmDeleteOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;

    setIsConfirmDeleteOpen(false);
    await admin.deleteUser(userToDelete);
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
                  {/* <BulkActions selectedCount={selectedUsers.length} /> */}
                </div>
                <UserTable
                  users={filteredUsers}
                  onViewProfile={handleViewProfile}
                  onEditUser={handleEditUser}
                  onDeleteUser={handleDeleteUser}
                  actions={actions}
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
