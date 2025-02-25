import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface BookNewProps {
  date: Date;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  selectedDoctor: string | null;
  setSelectedDoctor: (doctorId: string | null) => void;
  additionalNotes: string;
  setAdditionalNotes: (notes: string) => void;
  handleConfirmAppointment: () => void;
  handleCancelBooking: () => void;
  timeSlots: string[];
  handleSelectDate: (date: Date) => void;
  doctors: { user: { id: number; firstName: string; lastName: string } }[];
}

export default function BookNew({
  date,
  selectedTime,
  setSelectedTime,
  selectedDoctor,
  setSelectedDoctor,
  additionalNotes,
  setAdditionalNotes,
  handleConfirmAppointment,
  handleCancelBooking,
  timeSlots,
  handleSelectDate,
  doctors,
}: BookNewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Select Date and Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date: Date | undefined) =>
                date && handleSelectDate(date)
              }
              fromDate={new Date()}
              className="rounded-md border"
            />
            <div className="grid grid-cols-2 gap-3">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className="w-full py-6"
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="doctor">Select Doctor</Label>
            <Select
              value={selectedDoctor || ""}
              onValueChange={setSelectedDoctor}
            >
              <SelectTrigger id="doctor">
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem
                    key={doctor.user.id}
                    value={doctor.user.id.toString()}
                  >
                    {`${doctor.user.firstName} ${doctor.user.lastName}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="additional-notes">Additional Notes</Label>
            <Textarea
              id="additional-notes"
              placeholder="Any additional information for your visit"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </div>
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handleCancelBooking}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmAppointment}
              className="bg-black text-white hover:bg-black/90"
            >
              Confirm Appointment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
