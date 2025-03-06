"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { io } from "socket.io-client";

interface Patient {
  firstName: String;
  lastName: String;
}
interface Queue {
  id: number;
  patient: Patient;
  estimatedTimeToDoctor: number;
}

const MY_POSITION = 3; // Your position in the queue

export default function AheadInQueuePage() {
  const [patientsAhead, setPatientsAhead] = useState<Queue[]>([]);
  const [totalWaitTime, setTotalWaitTime] = useState(0);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    newSocket.on("initialTimes", (initialTimes: Queue[]) => {
      setPatientsAhead(initialTimes);
    });

    newSocket.on("timeUpdate", (updatedTimes: Queue[]) => {
      setPatientsAhead(updatedTimes);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Patients Ahead of You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <p className="text-lg">
                Your position: <span className="font-bold">{MY_POSITION}</span>
              </p>
              <p className="text-lg">
                Patients ahead of you:{" "}
                <span className="font-bold">{patientsAhead.length}</span>
              </p>
              <p className="text-lg">
                Total estimated wait time:{" "}
                <span className="font-bold">{totalWaitTime} minutes</span>
              </p>
            </div>

            {patientsAhead.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">Position</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Wait Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientsAhead.map((patient, index) => (
                      <tr key={patient.id}>
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{`${patient.patient.firstName} ${patient.patient.lastName}`}</td>
                        <td className="px-4 py-2">{`${patient.estimatedTimeToDoctor} minutes`}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No patients ahead of you!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
