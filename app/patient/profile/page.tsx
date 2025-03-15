"use client";

import type React from "react";
import NotificationsSettings from "@/components/sections/patient/profile/NotificationSettings";
import ProfileEdit from "@/components/sections/patient/profile/ProfileEdit";
import ProfileView from "@/components/sections/patient/profile/ProfileView";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Edit2, User } from "lucide-react";
import { patient } from "@/app/api";

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

const tabs: TabType[] = [
  { value: "view", label: "View Profile", icon: User },
  { value: "edit", label: "Edit Profile", icon: Edit2 },
  { value: "notifications", label: "Notifications", icon: Bell },
];

export default function MyProfilePage() {
  const [userInfo, setUserInfo] = useState<PersonalInfoType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await patient.getPatientData();
        if (response?.patientData) {
          const { user, medicalHistory } = response.patientData;
          setUserInfo({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            dob: new Date(user.dateOfBirth).toISOString().split("T")[0],
            address: "", // Placeholder until actual data is available
            patientId: user.id.toString(),
            medicalHistory: medicalHistory || "No medical history available.",
          });
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPatientData();
  }, []);

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 transition-colors duration-200 dark:bg-gray-900">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center dark:text-white">
        My Profile
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
          {userInfo
            ? (
              <ProfileView
                userInfo={userInfo}
                insuranceInfo={{
                  provider: "Not Provided",
                  policyNumber: "Not Provided",
                  groupNumber: "Not Provided",
                  coveragePeriod: "Not Provided",
                }}
              />
            )
            : <div className="text-center">No patient data available.</div>}
        </TabsContent>

        <TabsContent value="edit">
          {userInfo && (
            <ProfileEdit
              userInfo={userInfo}
              handleInputChange={(e) => {
                const { id, value } = e.target;
                setUserInfo((prev) => prev ? { ...prev, [id]: value } : prev);
              }}
              handleSaveChanges={() =>
                console.log("Saving changes:", userInfo)}
            />
          )}
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationsSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
