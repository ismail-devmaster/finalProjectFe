"use client";
import { Loader2 } from "lucide-react";
import useAdminUsers from "@/hooks/pages/useAdminUsers";
import SearchAndFilter from "@/components/sections/admin/SearchAndFilter";
import UserTable from "@/components/sections/admin/UserTable";
import ConfirmDialog from "@/components/sections/admin/ConfirmDialog";

export default function AdminPage() {
  const {
    isLoading,
    users,
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    updateUserRole,
    confirmDialog,
    setConfirmDialog,
  } = useAdminUsers();
  if (isLoading) {
    return <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <SearchAndFilter
        {...{ searchTerm, setSearchTerm, roleFilter, setRoleFilter }}
      />
      <UserTable
        users={users}
        updateUserRole={updateUserRole}
        deleteUser={() => { }}
      />
      <ConfirmDialog
        {...confirmDialog}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
      />
    </div>
  );
}
