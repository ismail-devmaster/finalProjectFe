"use client";

import type React from "react";
import ProfileEdit from "@/components/adminComponents/profile/ProfileEdit";
import ProfileView from "@/components/adminComponents/profile/ProfileView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit2, User } from "lucide-react";
import useAdminDataProfile from "@/hooks/pages/useAdminProfile";

type TabType = {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const tabs: TabType[] = [
  { value: "view", label: "View Profile", icon: User },
  { value: "edit", label: "Edit Profile", icon: Edit2 },
];

export function DashboardOverview() {
  const { userInfo, setUserInfo, isLoading } = useAdminDataProfile();
  console.log(userInfo);

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
          {userInfo ? (
            <ProfileView userInfo={userInfo} />
          ) : (
            <div className="text-center">No patient data available.</div>
          )}
        </TabsContent>

        <TabsContent value="edit">
          {userInfo && (
            <ProfileEdit
              userInfo={userInfo}
              handleInputChange={(e) => {
                const { id, value } = e.target;
                setUserInfo((prev) => (prev ? { ...prev, [id]: value } : prev));
              }}
              handleSaveChanges={() => console.log("Saving changes:", userInfo)}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
