"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Search, Trash2 } from "lucide-react";
import { admin } from "@/app/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "PATIENT" | "RECEPTIONIST" | "DOCTOR";
};

type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default function AdminPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<User["role"] | "ALL">("ALL");
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    description: "",
    onConfirm: () => {},
  });

  useEffect(() => {
    const verifyAdminAndFetchUsers = async () => {
      try {
        await admin.verify();
        const fetchedUsers = await admin.getAllUsers();
        setUsers(fetchedUsers.users);
        setFilteredUsers(fetchedUsers.users);
        setIsLoading(false);
      } catch (error) {
        console.error("Error verifying admin or fetching users:", error);
        router.push("/auth/login");
      }
    };

    verifyAdminAndFetchUsers();
  }, [router]);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchesSearch =
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });
    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter]);

  const updateUserRole = async (userId: string, newRole: User["role"]) => {
    setConfirmDialog({
      isOpen: true,
      title: "Confirm Role Change",
      description:
        `Are you sure you want to change this user's role to ${newRole}?`,
      onConfirm: async () => {
        try {
          await admin.updateRole(userId, newRole);
          setUsers(
            users.map((user) =>
              user.id === userId ? { ...user, role: newRole } : user
            ),
          );
        } catch (error) {
          console.error("Error updating user role:", error);
        }
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const deleteUser = async (userId: string) => {
    setConfirmDialog({
      isOpen: true,
      title: "Confirm User Deletion",
      description: "Are you sure you want to delete this user?",
      onConfirm: async () => {
        try {
          await admin.deleteUser(userId);
          setUsers(users.filter((user) => user.id !== userId));
        } catch (error) {
          console.error("Error deleting user:", error);
        }
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="mb-4 flex space-x-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <Select
          value={roleFilter}
          onValueChange={(value: User["role"] | "ALL") => setRoleFilter(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Roles</SelectItem>
            <SelectItem value="PATIENT">Patient</SelectItem>
            <SelectItem value="RECEPTIONIST">Receptionist</SelectItem>
            <SelectItem value="DOCTOR">Doctor</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    defaultValue={user.role}
                    onValueChange={(value: User["role"]) =>
                      updateUserRole(user.id, value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PATIENT">Patient</SelectItem>
                      <SelectItem value="RECEPTIONIST">Receptionist</SelectItem>
                      <SelectItem value="DOCTOR">Doctor</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteUser(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        description={confirmDialog.description}
      />
    </div>
  );
}
