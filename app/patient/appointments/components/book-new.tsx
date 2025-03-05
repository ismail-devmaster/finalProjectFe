"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

export function BookNew() {
  const [actions, setActions] = useState([]);
  const [isCreateActionModalOpen, setIsCreateActionModalOpen] = useState(false);
  const [isBookAppointmentModalOpen, setIsBookAppointmentModalOpen] =
    useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [patientId, setPatientId] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const patientIdData = await patient.getPatientId();
        setPatientId(patientIdData.patientId);
        const actionsData = await action.getActionsByPatientId(
          patientIdData.patientId
        );
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

  const handleActionCreated = (newAction) => {
    setActions([newAction, ...actions]);
    setIsCreateActionModalOpen(false);
  };

  const handleBookAppointment = (action) => {
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

      <BookAppointmentModal
        isOpen={isBookAppointmentModalOpen}
        onClose={() => setIsBookAppointmentModalOpen(false)}
        patientId={patientId}
        onAppointmentBooked={handleAppointmentBooked}
        action={selectedAction}
        doctors={doctors}
      />
    </div>
  );
}
