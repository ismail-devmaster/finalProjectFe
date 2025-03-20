"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { User } from "@/types/user"

interface RoleSpecificTableProps {
  users: User[]
  role: "patient" | "doctor" | "receptionist"
  onViewProfile: (user: User) => void
  onEditUser: (user: User) => void
}

export function RoleSpecificTable({ users, role, onViewProfile, onEditUser }: RoleSpecificTableProps) {
  const filteredUsers = users.filter((user) => user.role === role)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            {role === "patient" && (
              <>
                <TableHead>Appointments</TableHead>
                <TableHead>Last Visit</TableHead>
              </>
            )}
            {role === "doctor" && (
              <>
                <TableHead>Specialty</TableHead>
                <TableHead>Patients</TableHead>
              </>
            )}
            {role === "receptionist" && <TableHead>Phone</TableHead>}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="font-medium">{user.name}</div>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              {role === "patient" && (
                <>
                  <TableCell>{user.appointments}</TableCell>
                  <TableCell>
                    {user.lastAppointment
                      ? new Date(user.lastAppointment).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      : "N/A"}
                  </TableCell>
                </>
              )}
              {role === "doctor" && (
                <>
                  <TableCell>General Dentistry</TableCell>
                  <TableCell>{user.appointments}</TableCell>
                </>
              )}
              {role === "receptionist" && <TableCell>+1 (555) 123-4567</TableCell>}
              <TableCell>
                <Button variant="ghost" size="sm" onClick={() => onViewProfile(user)}>
                  View
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onEditUser(user)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

