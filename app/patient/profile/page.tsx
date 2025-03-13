"use client";

import type React from "react";
import NotificationsSettings from "@/components/sections/patient/profile/NotificationSettings";
import ProfileEdit from "@/components/sections/patient/profile/ProfileEdit";
import ProfileView from "@/components/sections/patient/profile/ProfileView";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Edit2, User } from "lucide-react";
import usePatients from "@/hooks/pages/usePatients";
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
type insuranceInfoType = {
  provider: string;
  policyNumber: string;
  groupNumber: string;
  coveragePeriod: string;
};
type TabType = {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};
const MOCK_DATA: {
  personalInfo: PersonalInfoType;
  insuranceInfo: insuranceInfoType;
} = {
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "+1 (555) 123-4567",
    dob: "1988-01-15",
    address: "123 Main St, Anytown, USA 12345",
    patientId: "123456",
    medicalHistory:
      "Allergies: Penicillin, Peanuts\nChronic Conditions: Hypertension (2015), Type 2 Diabetes (2018)\nPast Surgeries: Appendectomy (2010)",
  },
  insuranceInfo: {
    provider: "HealthGuard Insurance",
    policyNumber: "HGI-987654321",
    groupNumber: "HG-GROUP-001",
    coveragePeriod: "Jan 1, 2023 - Dec 31, 2023",
  },
};
const tabs: TabType[] = [
  { value: "view", label: "View Profile", icon: User },
  { value: "edit", label: "Edit Profile", icon: Edit2 },
  { value: "notifications", label: "Notifications", icon: Bell },
];

export default function MyProfilePage() {
  const { isLoading, patients, searchTerm, setSearchTerm } = usePatients();
  const [userInfo, setUserInfo] = useState<PersonalInfoType>(
    MOCK_DATA.personalInfo,
  );
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  useEffect((): void => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { id, value } = e.target;
    setUserInfo((prevInfo: PersonalInfoType) => ({ ...prevInfo, [id]: value }));
  };

  const handleSaveChanges = (): void => {
    console.log("Saving changes:", userInfo);
  };

  const toggleDarkMode = (): void =>
    setIsDarkMode((prev: boolean): boolean => !prev);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 transition-colors duration-200 dark:bg-gray-900">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center dark:text-white">
        My profile
      </h1>

      <Tabs defaultValue="view" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-12 bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg">
          {tabs.map(({ value, label, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="rounded-full py-3 transition-all duration-300 ease-in-out"
            >
              <Icon className="w-5 h-5 mr-2" /> {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="view">
          <ProfileView
            userInfo={userInfo}
            insuranceInfo={MOCK_DATA.insuranceInfo}
          />
        </TabsContent>

        <TabsContent value="edit">
          <ProfileEdit
            userInfo={userInfo}
            handleInputChange={handleInputChange}
            handleSaveChanges={handleSaveChanges}
          />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationsSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
