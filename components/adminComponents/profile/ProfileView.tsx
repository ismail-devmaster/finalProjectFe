"use client";

import type { User } from "@/types/user";

import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar, Mail, Phone, User as UserIcon } from "lucide-react";

const ProfileView = ({ userInfo }: { userInfo: User }) => (
  <PersonalInfoCard userInfo={userInfo} />
);
export default ProfileView;
const PersonalInfoCard = ({ userInfo }: { userInfo: User }) => (
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

const UserProfile = ({ userInfo }: { userInfo: User }) => (
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

const UserDetails = ({ userInfo }: { userInfo: User }) => {
  const details = [
    {
      icon: <UserIcon className="h-6 w-6 text-blue-500" />,
      text: `${
        userInfo.dateOfBirth
          ? new Date().getFullYear() -
            new Date(userInfo.dateOfBirth).getFullYear()
          : "Unknown"
      } years old`,
    },
    {
      icon: <Phone className="h-6 w-6 text-green-500" />,
      text: userInfo.phone || "Phone not set",
    },
    {
      icon: <Mail className="h-6 w-6 text-purple-500" />,
      text: userInfo.email,
    },
    {
      icon: <Calendar className="h-6 w-6 text-red-500" />,
      text: userInfo.dateOfBirth
        ? `Born on ${new Date(userInfo.dateOfBirth).toLocaleDateString()}`
        : "Birthdate not set",
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

const InfoCard = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center space-x-3 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
    {icon}
    <span className="text-lg dark:text-white">{text}</span>
  </div>
);

const RoleStatusCard = ({ userInfo }: { userInfo: User }) => (
  <Card className="mt-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border-none shadow-xl">
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
        Account Information
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard
          icon={<UserIcon className="h-6 w-6 text-blue-500" />}
          text={`Role: ${userInfo.role}`}
        />
        <InfoCard
          icon={<Mail className="h-6 w-6 text-purple-500" />}
          text={`Status: ${userInfo.isVerified ? "Verified" : "Not Verified"}`}
        />
        <InfoCard
          icon={<Calendar className="h-6 w-6 text-red-500" />}
          text={
            userInfo.createdAt
              ? `Member since ${new Date(
                  userInfo.createdAt
                ).toLocaleDateString()}`
              : "Unknown join date"
          }
        />
        <InfoCard
          icon={<Calendar className="h-6 w-6 text-green-500" />}
          text={
            userInfo.updatedAt
              ? `Last updated ${new Date(
                  userInfo.updatedAt
                ).toLocaleDateString()}`
              : "Never updated"
          }
        />
      </div>
    </CardContent>
  </Card>
);
