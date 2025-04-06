"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Search,
  User,
  Calendar,
  Mail,
  Phone,
  ClipboardList,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ActionHistoryDialog } from "@/components/sections/doctor/parts/union/action-history-dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Patient {
  id: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    sex: {
      gender: string;
    };
  };
  medicalHistory?: string;
}

interface PatientsProps {
  patients: Patient[];
}

export default function Patients({ patients }: PatientsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showActionHistory, setShowActionHistory] = useState(false);
  const [actionHistoryPatient, setActionHistoryPatient] =
    useState<Patient | null>(null);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNameClick = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const handleActionsClick = (e: React.MouseEvent, patient: Patient) => {
    e.stopPropagation();
    setActionHistoryPatient(patient);
    setShowActionHistory(true);
  };

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-600 to-violet-600 bg-clip-text text-transparent">
            Patient Directory
          </h1>
          <p className="text-muted-foreground mt-2">
            View and manage your patient records
          </p>
        </div>

        <Card className="shadow-md border-t-4 border-t-sky-500">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-sky-500" />
              <div>
                <CardTitle>Patients</CardTitle>
                <CardDescription>
                  Search and manage patient records
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-6">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by patient name"
                  className="pl-10 bg-muted/40"
                />
              </div>
              <Badge variant="outline" className="h-9 px-4 text-sm">
                {filteredPatients.length} patients found
              </Badge>
            </div>

            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-medium">Name</TableHead>
                    <TableHead className="font-medium">Date of Birth</TableHead>
                    <TableHead className="font-medium">Email</TableHead>
                    <TableHead className="font-medium">Phone</TableHead>
                    <TableHead className="font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <TableRow key={patient.id} className="hover:bg-sky-50">
                        <TableCell>
                          <span
                            className="cursor-pointer font-medium text-sky-700 hover:text-sky-900 hover:underline flex items-center gap-1"
                            onClick={() => handleNameClick(patient)}
                          >
                            <User className="h-3.5 w-3.5" />
                            {patient.user.firstName} {patient.user.lastName}
                          </span>
                        </TableCell>
                        <TableCell className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          {format(
                            new Date(patient.user.dateOfBirth),
                            "dd/MM/yyyy"
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {patient.user.email}
                        </TableCell>
                        <TableCell>{patient.user.phone}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => handleActionsClick(e, patient)}
                            className="flex items-center gap-1 hover:bg-sky-50 hover:text-sky-700"
                          >
                            <ClipboardList className="h-3.5 w-3.5" />
                            Treatment History
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-8 text-muted-foreground"
                      >
                        No patients found matching your search criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog
        open={!!selectedPatient}
        onOpenChange={(open) => !open && setSelectedPatient(null)}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Patient Information
            </DialogTitle>
            <DialogDescription>
              Detailed information about the selected patient
            </DialogDescription>
          </DialogHeader>
          {selectedPatient && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-3">
                <div className="bg-sky-100 text-sky-700 p-3 rounded-full">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedPatient.user.firstName}{" "}
                    {selectedPatient.user.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Patient ID: {selectedPatient.id}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Date of Birth</p>
                    <p className="text-muted-foreground">
                      {format(
                        new Date(selectedPatient.user.dateOfBirth),
                        "dd MMMM yyyy"
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">
                      {selectedPatient.user.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">
                      {selectedPatient.user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Gender</p>
                    <p className="text-muted-foreground">
                      {selectedPatient.user.sex.gender || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Medical History</h4>
                <p className="text-muted-foreground">
                  {selectedPatient.medicalHistory ||
                    "No medical history available"}
                </p>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={(e) => {
                    setSelectedPatient(null);
                    handleActionsClick(e as React.MouseEvent, selectedPatient);
                  }}
                  className="flex items-center gap-2"
                >
                  <ClipboardList className="h-4 w-4" />
                  View Treatment History
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ActionHistoryDialog
        open={showActionHistory}
        onOpenChangeAction={(open) => {
          setShowActionHistory(open);
          if (!open) setActionHistoryPatient(null);
        }}
        patient={actionHistoryPatient}
      />
    </>
  );
}
