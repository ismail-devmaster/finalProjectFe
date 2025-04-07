"use client"
import { MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { User, UserRole } from "@/types/user"

interface UserTableProps {
  users: User[]
  actions: any[]
  selectedUsers: number[]
  toggleUserSelection: (userId: number) => void
  toggleAllUsers: () => void
  onViewProfile: (user: User) => void
  onEditUser: (user: User) => void
  onDeleteUser: (userId: number) => void
}

export function UserTable({
  users,
  actions,
  selectedUsers,
  toggleUserSelection,
  toggleAllUsers,
  onViewProfile,
  onEditUser,
  onDeleteUser,
}: UserTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={users.length > 0 && selectedUsers.length === users.length}
                onCheckedChange={toggleAllUsers}
              />
            </TableHead>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Appointments</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => toggleUserSelection(user.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || ""} alt={user.firstName} />
                      <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                    <div className="font-medium">{user.firstName} {user.lastName}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      user.role === "DOCTOR"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        : user.role === "RECEPTIONIST"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                          : user.role === "PATIENT" || user.role === "USER"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : ""
                    }
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.isVerified ? "default" : "outline"}>
                    {user.isVerified ? "Verified" : "Unverified"}
                  </Badge>
                </TableCell>
                <TableCell>{user.phone || "N/A"}</TableCell>
<TableCell>
  {actions.filter((a: any) => a.patient?.user?.id === user.id)[0]?.appointments?.length || 0}
</TableCell>
<TableCell>
  {actions.filter((a: any) => a.patient?.user?.id === user.id)[0]?.startDate
    ? new Date(actions.filter((a: any) => a.patient?.user?.id === user.id)[0].startDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "N/A"}
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
                      <DropdownMenuItem onClick={() => onViewProfile(user)}>View Profile</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEditUser(user)}>Edit User</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onDeleteUser(user.id)} className="text-destructive">
                        Delete User
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
  )
}
