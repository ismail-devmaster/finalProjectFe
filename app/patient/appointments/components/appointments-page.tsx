"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookNew } from "../components/book-new";
import { Waiting } from "../components/waiting";
import { Upcoming } from "../components/upcoming";
import { History } from "../components/history";
import { CalendarPlus, Clock, CalendarClock, HistoryIcon } from "lucide-react";
import { patient } from "@/app/api/patient";

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [patientId, setPatientId] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const patientIdData = await patient.getPatientId();
        setPatientId(patientIdData.patientId);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        {/* <h1 className="text-3xl font-bold tracking-tight">Appointments</h1> */}
        <p className="text-muted-foreground text-center">
          Manage your appointments, view history, and book new appointments.
        </p>
      </div>

      <Tabs
        defaultValue="upcoming"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="book-new" className="flex items-center gap-2">
            <CalendarPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Book New</span>
          </TabsTrigger>
          <TabsTrigger value="waiting" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Waiting</span>
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4" />
            <span className="hidden sm:inline">Upcoming</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <HistoryIcon className="h-4 w-4" />
            <span className="hidden sm:inline">History</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="book-new">
          <BookNew />
        </TabsContent>
        <TabsContent value="waiting">
          <Waiting />
        </TabsContent>
        <TabsContent value="upcoming">
          <Upcoming />
        </TabsContent>
        <TabsContent value="history">
          <History patientId={patientId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
