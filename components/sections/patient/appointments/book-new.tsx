"use client";

import { useState, useEffect } from "react";
import { doctor, appointmentType } from "@/app/api";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { TimePicker } from "@/components/ui/time-picker";

interface Doctor {
  userId: string;
  user: {
    firstName: string;
    lastName: string;
  };
  specialty: string;
  avatar: string;
}

interface VisitReason {
  id: string;
  type: string;
  requiredSpecialty: string;
}

export default function BookNew() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [additionalNotes, setAdditionalNotes] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [reasons, setReasons] = useState<VisitReason[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorsRes, reasonsRes] = await Promise.all([
          doctor.getAllDoctors(),
          appointmentType.getAllAppointmentTypes(),
        ]);
        setDoctors(doctorsRes.doctors);
        setReasons(reasonsRes.appointmentTypes);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const calendarDays = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="calendar-day" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = date.toDateString() === new Date().toDateString();
      const isPast = date < new Date();
      const isSelected = selectedDate?.toDateString() === date.toDateString();

      calendarDays.push(
        <div
          key={date.toISOString()}
          className={cn(
            "flex items-center justify-center rounded-md",
            "text-center cursor-pointer p-2 transition-colors",
            isToday && "bg-muted font-bold",
            isPast && "text-muted-foreground cursor-not-allowed",
            isSelected &&
              "bg-primary text-primary-foreground hover:bg-primary/90",
            !isPast && !isSelected && "hover:bg-muted"
          )}
          onClick={() => !isPast && setSelectedDate(date)}
        >
          {day}
        </div>
      );
    }
    return calendarDays;
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  useEffect(() => {
    if (selectedReason) {
      const reason = reasons.find((r) => r.id === selectedReason);
      if (reason) {
        // Find first doctor with matching specialty
        const matchingDoctor = doctors.find(
          (d) =>
            d.specialty.toLowerCase() === reason.requiredSpecialty.toLowerCase()
        );

        if (matchingDoctor) {
          setSelectedDoctor(matchingDoctor.userId);
        } else {
          setSelectedDoctor(null);
        }
      }
    }
  }, [selectedReason, reasons, doctors]);

  const convertTo24HourFormat = (timeStr: string | null) => {
    if (!timeStr) return null;
    
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':');
    
    let hourNum = parseInt(hours);
    if (period === 'PM' && hourNum < 12) {
      hourNum += 12;
    } else if (period === 'AM' && hourNum === 12) {
      hourNum = 0;
    }
    
    return `${hourNum.toString().padStart(2, '0')}:${minutes}`;
  };

  const handleConfirmAppointment = () => {
    console.log("Appointment confirmed:", {
      date: selectedDate.toISOString().split('T')[0],
      time: convertTo24HourFormat(selectedTime),
      doctorId: selectedDoctor,
      reasonId: selectedReason,
      notes: additionalNotes,
    });
  };

  const handleCancelBooking = () => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      setSelectedDate(new Date());
      setSelectedTime(null);
      setSelectedDoctor(null);
      setSelectedReason(null);
      setAdditionalNotes("");
    }
  };

  const currentDoctor = selectedDoctor
    ? doctors.find((doctor) => doctor.userId === selectedDoctor)
    : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-2xl">Select Date and Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="border rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">
                    {months[currentMonth]} {currentYear}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handlePrevMonth}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleNextMonth}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-xs font-medium text-muted-foreground"
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>
                <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <Label>Select Time</Label>
                <TimePicker
                  value={selectedTime || ""}
                  onChange={setSelectedTime}
                  className="w-full"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Choose any time that works for you.</p>
                <p className="mt-2">
                  Our doctors are available from 8:00 AM to 6:00 PM.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Appointment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Visit</Label>
            <Select
              value={selectedReason || ""}
              onValueChange={setSelectedReason}
            >
              <SelectTrigger id="reason">
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                {reasons.map((reason) => (
                  <SelectItem key={reason.id} value={reason.id}>
                    {reason.type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Doctor</Label>
              <div className="flex items-center text-xs text-muted-foreground">
                <Info className="h-3 w-3 mr-1" />
                <span>Automatically assigned based on reason</span>
              </div>
            </div>

            {currentDoctor ? (
              <div className="flex items-center p-3 border rounded-md">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage
                    src={currentDoctor.avatar}
                    alt={`${currentDoctor.user.firstName.charAt(
                      0
                    )}${currentDoctor.user.lastName.charAt(0)}`}
                  />
                  <AvatarFallback>
                    {`${currentDoctor.user.firstName.charAt(
                      0
                    )}${currentDoctor.user.lastName.charAt(0)}`}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <div className="font-medium">{`Dr. ${currentDoctor.user.firstName} ${currentDoctor.user.lastName}`}</div>
                  <div className="text-sm text-muted-foreground">
                    {currentDoctor.specialty}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground p-3 border rounded-md border-dashed">
                Please select a reason for visit to be assigned a doctor
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional-notes">Additional Notes</Label>
            <Textarea
              id="additional-notes"
              placeholder="Any additional information for your visit"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleCancelBooking}>
            Cancel
          </Button>
          <Button onClick={handleConfirmAppointment}>
            Confirm Appointment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
