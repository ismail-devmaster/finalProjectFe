"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";

interface Patient {
  id: number;
  user: {
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

  const filteredPatients = patients.filter((patient) =>
    patient.user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Patients</CardTitle>
          <CardDescription>Manage patient records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="flex space-x-2">
              <Input
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name"
              />
              <Search className="mr-2 h-4 w-4" />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <TableRow
                    key={patient.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <TableCell>
                      {patient.user.firstName} {patient.user.lastName}
                    </TableCell>
                    <TableCell>
                      {format(new Date(patient.user.dateOfBirth), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>{patient.user.email}</TableCell>
                    <TableCell>{patient.user.phone}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No patients found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={!!selectedPatient}
        onOpenChange={() => setSelectedPatient(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Patient Information</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold">Name:</div>
                <div className="col-span-3">
                  {selectedPatient.user.firstName}{" "}
                  {selectedPatient.user.lastName}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold">Date of Birth:</div>
                <div className="col-span-3">
                  {format(
                    new Date(selectedPatient.user.dateOfBirth),
                    "dd/MM/yyyy"
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold">Phone:</div>
                <div className="col-span-3">{selectedPatient.user.phone}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold">Email:</div>
                <div className="col-span-3">{selectedPatient.user.email}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold">Sex:</div>
                <div className="col-span-3">
                  {selectedPatient.user.sex.gender || "Not specified"}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold">Medical History:</div>
                <div className="col-span-3">
                  {selectedPatient.medicalHistory ||
                    "No medical history available"}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
