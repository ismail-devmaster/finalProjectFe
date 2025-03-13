"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  CreditCard,
  FileText,
  HourglassIcon,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const mockData = {
  profile: {
    name: "John Doe",
    dob: "05/15/1985",
    phone: "+1 (555) 123-4567",
    email: "john.doe@example.com",
    address: "123 Main St, Anytown, USA",
  },
  appointments: {
    upcoming: [
      "Cleaning: June 15, 2023 at 10:00 AM",
      "Check-up: August 22, 2023 at 2:30 PM",
    ],
    past: [
      "Check-up: March 3, 2023 at 2:30 PM",
      "Filling: January 12, 2023 at 11:00 AM",
    ],
  },
  records: {
    procedures: [
      "Filling (Tooth #18): January 12, 2023",
      "Root Canal (Tooth #30): November 5, 2022",
    ],
    allergies: "Penicillin, Latex",
  },
  payments: {
    transactions: [
      "$150 - Check-up (March 3, 2023)",
      "$300 - Filling (January 12, 2023)",
    ],
    balance: "$75",
    balanceColor: "text-red-500",
  },
  queue: {
    waitTime: "15 min",
    appointment: "10:00 AM",
    estimatedStart: "10:05 AM",
  },
};

export default function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNewPatient] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center dark:text-white">
        Quick Actions Overview
      </h1>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Quick Actions Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[{
            title: "Profile",
            icon: <User />,
            content: (
              <>
                <p className="text-sm font-medium">{mockData.profile.name}</p>
                <p className="text-xs text-muted-foreground">
                  DOB: {mockData.profile.dob}
                </p>
                {[Phone, Mail, MapPin].map((Icon, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <p className="text-xs">
                      {Object.values(mockData.profile)[i + 2]}
                    </p>
                  </div>
                ))}
              </>
            ),
          }, {
            title: "Appointments",
            icon: <Calendar />,
            content: (
              isNewPatient
                ? (
                  <p className="text-sm text-muted-foreground text-center">
                    No upcoming appointments
                  </p>
                )
                : (
                  mockData.appointments.upcoming.map((apt, i) => (
                    <p key={i} className="text-xs">{apt}</p>
                  ))
                )
            ),
          }, {
            title: "Health Records",
            icon: <FileText />,
            content: (
              isNewPatient
                ? (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Complete health questionnaire
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Health Questionnaire</DialogTitle>
                        <DialogDescription>
                          Please fill out your health information.
                        </DialogDescription>
                      </DialogHeader>
                      {["Height", "Weight", "Allergies", "Medications"].map((
                        label,
                        i,
                      ) => (
                        <div
                          key={i}
                          className="grid grid-cols-4 items-center gap-4"
                        >
                          <Label className="text-right">{label}</Label>
                          {i < 3
                            ? <Input className="col-span-3" />
                            : <Textarea className="col-span-3" />}
                        </div>
                      ))}
                      <Button
                        type="submit"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Submit
                      </Button>
                    </DialogContent>
                  </Dialog>
                )
                : (
                  <>
                    <p className="text-sm font-medium">Recent Procedures</p>
                    {mockData.records.procedures.map((p, i) => (
                      <p key={i} className="text-xs">{p}</p>
                    ))}
                    <p className="text-sm font-medium">Allergies</p>
                    <p className="text-xs text-red-500">
                      {mockData.records.allergies}
                    </p>
                  </>
                )
            ),
          }, {
            title: "Payments",
            icon: <CreditCard />,
            content: (
              isNewPatient
                ? (
                  <p className="text-sm text-muted-foreground">
                    No recent transactions
                  </p>
                )
                : (
                  <>
                    {mockData.payments.transactions.map((t, i) => (
                      <p key={i} className="text-xs">{t}</p>
                    ))}
                    <p
                      className={`text-lg font-bold ${mockData.payments.balanceColor}`}
                    >
                      {mockData.payments.balance}
                    </p>
                  </>
                )
            ),
          }, {
            title: "Queue Status",
            icon: <HourglassIcon />,
            content: (
              isNewPatient
                ? (
                  <p className="text-sm text-muted-foreground text-center">
                    No current appointment
                  </p>
                )
                : (
                  <>
                    <p className="text-2xl font-bold text-green-600">
                      {mockData.queue.waitTime}
                    </p>
                    <p className="text-xs">
                      Your appointment: {mockData.queue.appointment}
                    </p>
                    <p className="text-xs">
                      Estimated start: {mockData.queue.estimatedStart}
                    </p>
                  </>
                )
            ),
          }].map(({ title, icon, content }, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
              </CardHeader>
              <CardContent className="space-y-2">{content}</CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
