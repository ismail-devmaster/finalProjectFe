"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TimePicker } from "@/components/ui/time-picker";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";

// Define types
interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialty: {
    id: string;
    name: string;
  };
  avatar: string;
}

interface VisitReason {
  id: string;
  type: string;
  specialtyId: string; // To link reasons with doctor specialties
}

// Mock data
const mockDoctors: Doctor[] = [
  {
    id: "d1",
    firstName: "John",
    lastName: "Smith",
    specialty: {
      id: "s1",
      name: "Cardiology",
    },
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "d2",
    firstName: "Sarah",
    lastName: "Johnson",
    specialty: {
      id: "s2",
      name: "Dermatology",
    },
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "d3",
    firstName: "Michael",
    lastName: "Chen",
    specialty: {
      id: "s3",
      name: "Neurology",
    },
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "d4",
    firstName: "Emily",
    lastName: "Wilson",
    specialty: {
      id: "s4",
      name: "Pediatrics",
    },
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "d5",
    firstName: "David",
    lastName: "Garcia",
    specialty: {
      id: "s5",
      name: "Orthopedics",
    },
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const mockReasons: VisitReason[] = [
  { id: "r1", type: "Heart Checkup", specialtyId: "s1" },
  { id: "r2", type: "Chest Pain", specialtyId: "s1" },
  { id: "r3", type: "Skin Rash", specialtyId: "s2" },
  { id: "r4", type: "Acne Treatment", specialtyId: "s2" },
  { id: "r5", type: "Headache Consultation", specialtyId: "s3" },
  { id: "r6", type: "Neurological Assessment", specialtyId: "s3" },
  { id: "r7", type: "Child Wellness Visit", specialtyId: "s4" },
  { id: "r8", type: "Vaccination", specialtyId: "s4" },
  { id: "r9", type: "Joint Pain", specialtyId: "s5" },
  { id: "r10", type: "Fracture Follow-up", specialtyId: "s5" },
];

export default function BookNew() {
  // Create all state variables internally
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [additionalNotes, setAdditionalNotes] = useState<string>("");

  const router = useRouter();

  // Handler functions
  const handleSelectDate = (newDate: Date) => {
    setDate(newDate);
  };

  const handleConfirmAppointment = () => {
    // Mock implementation - in a real app, this would save the appointment
    console.log("Appointment confirmed:", {
      date,
      time: selectedTime,
      doctorId: selectedDoctor,
      reasonId: selectedReason,
      notes: additionalNotes,
    });
  };

  const handleCancelBooking = () => {
    // Mock implementation - in a real app, this would cancel and redirect
    if (confirm("Are you sure you want to cancel this booking?")) {
      // Reset form or redirect
      setDate(new Date());
      setSelectedTime(null);
      setSelectedDoctor(null);
      setSelectedReason(null);
      setAdditionalNotes("");

      // router.push("/appointments")
    }
  };

  // Auto-select doctor based on reason
  useEffect(() => {
    if (selectedReason) {
      const reason = mockReasons.find((r) => r.id === selectedReason);
      if (reason) {
        const matchingDoctor = mockDoctors.find(
          (d) => d.specialty.id === reason.specialtyId
        );
        if (matchingDoctor) {
          setSelectedDoctor(matchingDoctor.id);
        }
      }
    }
  }, [selectedReason]);

  // Find the currently selected doctor
  const currentDoctor = selectedDoctor
    ? mockDoctors.find((doctor) => doctor.id === selectedDoctor)
    : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-2xl">Select Date and Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="border rounded-lg p-4 shadow-sm">
                <div className="text-center mb-4">
                  <h3 className="font-medium">
                    {date
                      ? date.toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })
                      : "Select a date"}
                  </h3>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  <div className="text-sm font-medium">Su</div>
                  <div className="text-sm font-medium">Mo</div>
                  <div className="text-sm font-medium">Tu</div>
                  <div className="text-sm font-medium">We</div>
                  <div className="text-sm font-medium">Th</div>
                  <div className="text-sm font-medium">Fr</div>
                  <div className="text-sm font-medium">Sa</div>
                </div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate: Date | undefined) => {
                    if (newDate) {
                      handleSelectDate(newDate);
                    }
                  }}
                  fromDate={new Date()}
                  className="rounded-md"
                  classNames={{
                    day_today: "bg-muted font-bold",
                    day_selected:
                      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-muted rounded-md",
                  }}
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <Label htmlFor="time-picker">Select Time</Label>
                <TimePicker
                  value={selectedTime || ""}
                  onChange={setSelectedTime}
                  className="w-full"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Choose any time that works for you.</p>
                <p className="mt-2">
                  Our doctors are available from 8:00 AM to 6:00 PM.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Appointment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Visit</Label>
            <Select
              value={selectedReason || ""}
              onValueChange={setSelectedReason}
            >
              <SelectTrigger id="reason">
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                {mockReasons.map((reason) => (
                  <SelectItem key={reason.id} value={reason.id}>
                    {reason.type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Doctor</Label>
              <div className="flex items-center text-xs text-muted-foreground">
                <Info className="h-3 w-3 mr-1" />
                <span>Automatically assigned based on reason</span>
              </div>
            </div>

            {currentDoctor ? (
              <div className="flex items-center p-3 border rounded-md">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage
                    src={currentDoctor.avatar}
                    alt={`${currentDoctor.firstName} ${currentDoctor.lastName}`}
                  />
                  <AvatarFallback>{`${currentDoctor.firstName[0]}${currentDoctor.lastName[0]}`}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{`Dr. ${currentDoctor.firstName} ${currentDoctor.lastName}`}</div>
                  <div className="text-sm text-muted-foreground">
                    {currentDoctor.specialty.name}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground p-3 border rounded-md border-dashed">
                Please select a reason for visit to be assigned a doctor
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional-notes">Additional Notes</Label>
            <Textarea
              id="additional-notes"
              placeholder="Any additional information for your visit"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="min-h-[100px] resize-none border-gray-200 dark:border-gray-700"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            className="border-gray-200 dark:border-gray-700"
            onClick={handleCancelBooking}
          >
            Cancel
          </Button>
          <Button onClick={handleConfirmAppointment}>
            Confirm Appointment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
