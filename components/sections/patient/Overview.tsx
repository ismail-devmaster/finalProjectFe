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
import { ReactNode } from "react";
type PersonalInfoType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  patientId: string;
  medicalHistory: string;
};

function IconCard(
  { title, icon, content }: {
    title: string;
    icon: ReactNode;
    content: ReactNode;
  },
) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="space-y-2">{content}</CardContent>
    </Card>
  );
}
interface OverviewProps {
  mockData: any;
  isNewPatient: boolean;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

const Overview: React.FC<OverviewProps> = (
  { mockData, isNewPatient, isDialogOpen, setIsDialogOpen },
) => {
  const sections = [
    {
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
                {String(Object.values(mockData.profile)[i + 2])}
              </p>
            </div>
          ))}
        </>
      ),
    },
    {
      title: "Appointments",
      icon: <Calendar />,
      content: isNewPatient
        ? (
          <p className="text-sm text-muted-foreground text-center">
            No upcoming appointments
          </p>
        )
        : (
          mockData.appointments.upcoming.map((apt: string, i: number) => (
            <p key={i} className="text-xs">{apt}</p>
          ))
        ),
    },
    {
      title: "Health Records",
      icon: <FileText />,
      content: isNewPatient
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
                <div key={i} className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">{label}</Label>
                  {i < 3
                    ? <Input className="col-span-3" />
                    : <Textarea className="col-span-3" />}
                </div>
              ))}
              <Button type="submit" onClick={() => setIsDialogOpen(false)}>
                Submit
              </Button>
            </DialogContent>
          </Dialog>
        )
        : (
          <>
            <p className="text-sm font-medium">Recent Procedures</p>
            {mockData.records.procedures.map((p: string, i: number) => (
              <p key={i} className="text-xs">{p}</p>
            ))}
            <p className="text-sm font-medium">Allergies</p>
            <p className="text-xs text-red-500">{mockData.records.allergies}</p>
          </>
        ),
    },
    {
      title: "Payments",
      icon: <CreditCard />,
      content: isNewPatient
        ? (
          <p className="text-sm text-muted-foreground">
            No recent transactions
          </p>
        )
        : (
          <>
            {mockData.payments.transactions.map((t: string, i: number) => (
              <p key={i} className="text-xs">{t}</p>
            ))}
            <p
              className={`text-lg font-bold ${mockData.payments.balanceColor}`}
            >
              {mockData.payments.balance}
            </p>
          </>
        ),
    },
    {
      title: "Queue Status",
      icon: <HourglassIcon />,
      content: isNewPatient
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
        ),
    },
  ];

  return (
    <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

      {sections.map(({ title, icon, content }, i) => (
        <IconCard key={i} title={title} icon={icon} content={content} />
      ))}
    </CardContent>

  );
};
export default Overview;
