"use client"
import { useRouter } from "next/navigation"
import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FormState {
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  message: string
}

export function BookingSection() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(form)
    // Create query parameters from form data
    const queryParams = new URLSearchParams(form as any).toString()

    // Here you would typically send the form data to your backend
    alert("Appointment Requested! We'll contact you soon to confirm.")

    setForm({
      name: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      time: "",
      message: "",
    })

    router.push(`/auth/login?${queryParams}`)
  }

  return (
    <section
      id="booking"
      className="py-20 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Book Your Appointment</h2>
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <Card className="bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-900">Appointment Request Process</CardTitle>
                <CardDescription>Here's what to expect when you request an appointment:</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  {[
                    "Fill out the form with your details.",
                    "Our team will check availability.",
                    "We'll contact you within 24 hours.",
                    "You'll receive an email confirmation.",
                    "A reminder will be sent 24 hours before.",
                  ].map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
          <div className="lg:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-4">
              {["name", "email", "phone"].map((field) => (
                <Input
                  key={field}
                  name={field}
                  placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  value={form[field as keyof FormState]}
                  onChange={handleChange}
                  required
                  className="bg-white dark:bg-gray-800"
                />
              ))}
              <Select value={form.service} onValueChange={(val) => setForm({ ...form, service: val })} required>
                <SelectTrigger className="bg-white dark:bg-gray-800">
                  <SelectValue placeholder="Select Service" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "General Check-up",
                    "Teeth Cleaning",
                    "Cosmetic Dentistry",
                    "Orthodontics",
                    "Dental Implants",
                    "Root Canal",
                    "Pediatric Dentistry",
                  ].map((s) => (
                    <SelectItem key={s} value={s.toLowerCase().replace(/\s+/g, "-")}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-4">
                <Input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="bg-white dark:bg-gray-800"
                />
                <Input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="bg-white dark:bg-gray-800"
                />
              </div>
              <Textarea
                name="message"
                placeholder="Additional Message or Special Requirements"
                value={form.message}
                onChange={handleChange}
                className="bg-white dark:bg-gray-800"
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Request Appointment
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

