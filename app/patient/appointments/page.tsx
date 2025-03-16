"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookNew } from "@/components/sections/patient/appointments/book-new";
import { Waiting } from "@/components/sections/patient/appointments/waiting";
import { Upcoming } from "@/components/sections/patient/appointments/upcoming";
import { History } from "@/components/sections/patient/appointments/history";
import { CalendarClock, CalendarPlus, Clock, HistoryIcon } from "lucide-react";
import { useAppointments } from "@/hooks/pages/useAppointments";

export interface UseAppointmentsReturn {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  patientId?: number;
}
export default function Home() {
  const { activeTab, setActiveTab, patientId } = useAppointments();

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Header />
      <div className="container mx-auto py-6 space-y-6">
        <Description />
        <AppointmentTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          patientId={patientId}
        />
      </div>
    </div>
  );
}

function Header() {
  return (
    <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center dark:text-white">
      Appointments
    </h1>
  );
}

function Description() {
  return (
    <div className="flex flex-col space-y-2">
      <p className="text-muted-foreground text-center">
        Manage your appointments, view history, and book new appointments.
      </p>
    </div>
  );
}

function AppointmentTabs(
  { activeTab, setActiveTab, patientId }: UseAppointmentsReturn,
) {
  return (
    <Tabs
      defaultValue="upcoming"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsListComponent />
      <TabsContent value="book-new">
        <BookNew patientId={patientId} />
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
  );
}

function TabsListComponent() {
  return (
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
  );
}
