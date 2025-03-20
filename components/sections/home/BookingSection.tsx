"use client";
import { useRouter } from "next/navigation";
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

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message: string;
}

export function BookingSection() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    // ✅ إنشاء بارامترات من بيانات النموذج
    const queryParams = new URLSearchParams(form as any).toString();

    toast({
      title: "Appointment Requested",
      description:
        "We've received your booking request and will contact you soon to confirm.",
    });
    setForm({
      name: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      time: "",
      message: "",
    });
    router.push(`/auth/login?${queryParams}`);
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
                  {[
                    "Fill out the form with your details.",
                    "Our team will check availability.",
                    "We'll contact you within 24 hours.",
                    "You'll receive an email confirmation.",
                    "A reminder will be sent 24 hours before.",
                  ].map((step, i) => <li key={i}>{step}</li>)}
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
              {["name", "email", "phone"].map((field) => (
                <Input
                  key={field}
                  name={field}
                  placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)
                    }`}
                  value={form[field as keyof FormState]}
                  onChange={handleChange}
                  required
                  className="bg-white"
                />
              ))}
              <Select
                value={form.service}
                onValueChange={(val) => setForm({ ...form, service: val })}
                required
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select Service" />
                </SelectTrigger>
                <SelectContent>
                  {["cleaning", "laser", "cosmetic", "checkup"].map((s) => (
                    <SelectItem key={s} value={s}>
                      {s.replace(/\b\w/g, (l) => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-4">
                {["date", "time"].map((field) => (
                  <Input
                    key={field}
                    type={field}
                    name={field}
                    value={form[field as keyof FormState]}
                    onChange={handleChange}
                    required
                    className="bg-white"
                  />
                ))}
              </div>
              <Textarea
                name="message"
                placeholder="Additional Message or Special Requirements"
                value={form.message}
                onChange={handleChange}
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
