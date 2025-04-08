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
              <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
              <AvatarFallback>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">{user.firstName} {user.lastName}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground">
                {user.isVerified ? "Verified" : "Not Verified"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium">Role</h4>
              <p className="text-sm">{user.role}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Age</h4>
              <p className="text-sm">
                {user.dateOfBirth ? 
                  (() => {
                    const birthDate = new Date(user.dateOfBirth);
                    const today = new Date();
                    let age = today.getFullYear() - birthDate.getFullYear();
                    const monthDiff = today.getMonth() - birthDate.getMonth();
                    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                      age--;
                    }
                    return age;
                  })() 
                : "N/A"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Sex</h4>
              <p className="text-sm">
                {user.sexId === 1
                  ? "Male"
                  : "Female"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Phone</h4>
              <p className="text-sm">{user.phone}</p>
            </div>
            {user.role === "PATIENT" && user.patient && (
              <>
                <div className="col-span-2">
                  <h4 className="text-sm font-medium">Date of Birth</h4>
                  <p className="text-sm">
                    {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }) : "N/A"}
                  </p>
                </div>
                <div className="col-span-2">
                  <h4 className="text-sm font-medium">Medical History</h4>
                  <p className="text-sm">{user.patient.medicalHistory}</p>
                </div>
              </>
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
