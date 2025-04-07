"use client";

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

import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar, Mail, Phone, User } from "lucide-react";

const ProfileView = (
  { userInfo }: {
    userInfo: PersonalInfoType;
  },
) => (
  <>
    <PersonalInfoCard userInfo={userInfo} />
    <MedicalHistoryCard medicalHistory={userInfo.medicalHistory} />
  </>
);
export default ProfileView;
const PersonalInfoCard = ({ userInfo }: { userInfo: PersonalInfoType }) => (
  <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border-none shadow-xl">
    <CardHeader>
      <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">
        Personal Information
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-8">
      <UserProfile userInfo={userInfo} />
      <UserDetails userInfo={userInfo} />
    </CardContent>
  </Card>
);

const UserProfile = ({ userInfo }: { userInfo: PersonalInfoType }) => (
  <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
    <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-700 shadow-lg">
      <AvatarImage
        src="/placeholder.svg?height=128&width=128"
        alt="Profile Picture"
      />
      <AvatarFallback className="text-3xl">
        {userInfo.firstName[0]}
        {userInfo.lastName[0]}
      </AvatarFallback>
    </Avatar>
    <div className="text-center md:text-left">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
        {userInfo.firstName} {userInfo.lastName}
      </h2>
    </div>
  </div>
);

const UserDetails = ({ userInfo }: { userInfo: PersonalInfoType }) => {
  const details = [
    {
      icon: <User className="h-6 w-6 text-blue-500" />,
      text: `${new Date().getFullYear() - new Date(userInfo.dob).getFullYear()
        } years old`,
    },
    {
      icon: <Phone className="h-6 w-6 text-green-500" />,
      text: userInfo.phone,
    },
    {
      icon: <Mail className="h-6 w-6 text-purple-500" />,
      text: userInfo.email,
    },
    {
      icon: <Calendar className="h-6 w-6 text-red-500" />,
      text: `Born on ${new Date(userInfo.dob).toLocaleDateString()}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {details.map((detail, index) => (
        <InfoCard key={index} icon={detail.icon} text={detail.text} />
      ))}
    </div>
  );
};

const InfoCard = (
  { icon, text }: {
    icon: React.ReactNode;
    text: string;
  },
) => (
  <div className="flex items-center space-x-3 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
    {icon}
    <span className="text-lg dark:text-white">{text}</span>
  </div>
);

const MedicalHistoryCard = ({ medicalHistory }: { medicalHistory: string }) => (
  <Card className="mt-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border-none shadow-xl">
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
        Medical History Summary
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="medical-history">
          <AccordionTrigger className="text-lg font-semibold dark:text-white">
            Medical History
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {medicalHistory}
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardContent>
  </Card>
);
