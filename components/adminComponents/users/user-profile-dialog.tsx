"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { User } from "@/types/user"

interface UserProfileDialogProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEditUser: (user: User) => void
}

export function UserProfileDialog({ user, open, onOpenChange, onEditUser }: UserProfileDialogProps) {
  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>User details and information.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium">Role</h4>
              <p className="text-sm">{user.role}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Appointments</h4>
              <p className="text-sm">{user.appointments}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Last Appointment</h4>
              <p className="text-sm">
                {user.lastAppointment
                  ? new Date(user.lastAppointment).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Phone</h4>
              <p className="text-sm">+1 (555) 123-4567</p>
            </div>
            {user.role === "patient" && (
              <div className="col-span-2">
                <h4 className="text-sm font-medium">Medical History</h4>
                <p className="text-sm">No significant medical history reported.</p>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            onClick={() => {
              onOpenChange(false)
              onEditUser(user)
            }}
          >
            Edit User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

