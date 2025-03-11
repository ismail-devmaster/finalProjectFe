export default function useAdminUsers() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<User["role"] | "ALL">("ALL");
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    description: "",
    onConfirm: () => {},
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await admin.verify();
        const { users } = await admin.getAllUsers();
        setUsers(users);
        setFilteredUsers(users);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        router.push("/auth/login");
      }
    };

    fetchUsers();
  }, [router]);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        `${user.firstName}${user.lastName}${user.email}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) &&
        (roleFilter === "ALL" || user.role === roleFilter)
      ),
    );
  }, [users, searchTerm, roleFilter]);

  const updateUserRole = (userId: string, newRole: User["role"]) => {
    setConfirmDialog({
      isOpen: true,
      title: "Confirm Role Change",
      description: `Change role to ${newRole}?`,
      onConfirm: async () => {
        await admin.updateRole(userId, newRole);
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user
          ),
        );
        setConfirmDialog({
          isOpen: false,
          title: "",
          description: "",
          onConfirm: () => {},
        });
      },
    });
  };

  return {
    isLoading,
    users: filteredUsers,
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    updateUserRole,
    confirmDialog,
    setConfirmDialog,
  };
}
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { admin } from "@/app/api";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "PATIENT" | "RECEPTIONIST" | "DOCTOR";
};
