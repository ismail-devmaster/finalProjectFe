"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function BookingSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log({ name, email, phone, service, date, time, message });
    toast({
      title: "Appointment Requested",
      description:
        "We've received your booking request and will contact you soon to confirm.",
    });
    // Reset form
    setName("");
    setEmail("");
    setPhone("");
    setService("");
    setDate("");
    setTime("");
    setMessage("");
  };

  return (
    <section
      id="booking"
      className="py-20 bg-gradient-to-b from-teal-50 to-cyan-100"
    >
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl font-bold text-center text-teal-900 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Book Your Appointment
        </motion.h2>
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-teal-900">
                  Appointment Request Process
                </CardTitle>
                <CardDescription>
                  Here's what to expect when you request an appointment:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>
                    Fill out the appointment request form with your details and
                    preferred date/time.
                  </li>
                  <li>
                    Our team will review your request and check availability.
                  </li>
                  <li>
                    We'll contact you within 24 hours to confirm your
                    appointment or suggest alternative times.
                  </li>
                  <li>
                    Once confirmed, you'll receive an email with appointment
                    details and any necessary pre-visit instructions.
                  </li>
                  <li>
                    A reminder will be sent 24 hours before your scheduled
                    appointment.
                  </li>
                </ol>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white"
              />
              <Input
                type="tel"
                placeholder="Your Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="bg-white"
              />
              <Select value={service} onValueChange={setService} required>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cleaning">Advanced Cleaning</SelectItem>
                  <SelectItem value="laser">Laser Dentistry</SelectItem>
                  <SelectItem value="cosmetic">Cosmetic Procedure</SelectItem>
                  <SelectItem value="checkup">Regular Check-up</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-4">
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="bg-white"
                />
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="bg-white"
                />
              </div>
              <Textarea
                placeholder="Additional Message or Special Requirements"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-white"
              />
              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              >
                Request Appointment
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
