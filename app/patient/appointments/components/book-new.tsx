"use client";

import { CardFooter } from "@/components/ui/card";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Clock, DollarSign, User, Calendar } from "lucide-react";
import { formatDate, formatTime } from "@/lib/utils";
import { CreateActionModal } from "../components/create-action-modal";
import { BookAppointmentModal } from "../components/book-appointment-modal";
import { action } from "@/app/api/action";
import { doctor } from "@/app/api/doctor";
import { patient } from "@/app/api/patient";

interface Doctor {
  userId: number;
  user: {
    firstName: string;
    lastName: string;
  };
}

interface AppointmentType {
  id: number;
  type: string;
}

interface Action {
  id: number;
  appointmentType: AppointmentType;
  description: string;
  totalPayment: number;
  startDate: string;
  patientId: number;
}

interface BookNewProps {
  patientId: number | undefined;
}

export function BookNew({ patientId }: BookNewProps) {
  const [actions, setActions] = useState<Action[]>([]);
  const [isCreateActionModalOpen, setIsCreateActionModalOpen] =
    useState<boolean>(false);
  const [isBookAppointmentModalOpen, setIsBookAppointmentModalOpen] =
    useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const actionsData = await action.getActionsByPatientId(patientId!);
        setActions(actionsData.actions);
        const doctorsData = await doctor.getAllDoctors();
        setDoctors(doctorsData.doctors);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchData();
  }, []);

  const handleCreateAction = () => {
    setIsCreateActionModalOpen(true);
  };

  const handleActionCreated = (newAction: Action) => {
    setActions([newAction, ...actions]);
    setIsCreateActionModalOpen(false);
  };

  const handleBookAppointment = (action: Action) => {
    setSelectedAction(action);
    setIsBookAppointmentModalOpen(true);
  };

  const handleAppointmentBooked = () => {
    setIsBookAppointmentModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create an Action</CardTitle>
          <CardDescription>
            Start a new action or view previous actions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={handleCreateAction}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Action
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => (
          <Card key={action.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{action.appointmentType.type}</CardTitle>
              <CardDescription>{action.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>
                    {formatDate(action.startDate)} -{" "}
                    {formatTime(action.startDate)}
                  </span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Total Payment: ${action.totalPayment}</span>
                </div>
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Patient ID: {action.patientId}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleBookAppointment(action)}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book New Appointment
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <CreateActionModal
        isOpen={isCreateActionModalOpen}
        onClose={() => setIsCreateActionModalOpen(false)}
        patientId={patientId}
        onActionCreated={handleActionCreated}
      />

      {selectedAction && (
        <BookAppointmentModal
          isOpen={isBookAppointmentModalOpen}
          onClose={() => setIsBookAppointmentModalOpen(false)}
          patientId={patientId}
          onAppointmentBooked={handleAppointmentBooked}
          action={selectedAction}
          doctors={doctors}
        />
      )}
    </div>
  );
}
