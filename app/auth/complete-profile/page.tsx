"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Phone, Calendar } from "lucide-react";
import { auth } from "@/app/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useCompleteProfileStore } from "./useCompleteProfileStore";
import { useEffect } from "react";
import type React from "react";

export default function CompleteProfile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    dateOfBirth,
    phone,
    sexId = "male",
    isLoading,
    errors,
    setField,
    setIsLoading,
    validateForm,
  } = useCompleteProfileStore();

  const tempToken = searchParams.get("tempToken");

  useEffect(() => {
    if (!tempToken) {
      toast.error("Invalid or missing temporary token");
      router.push("/auth/login"); // Redirect to login page if no tempToken is present
    }
  }, [tempToken, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempToken) {
      toast.error("Invalid or missing temporary token");
      return;
    }
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    setIsLoading(true);

    try {
      const res = await auth.completeProfile(
        tempToken,
        phone,
        sexId === "male" ? 1 : 2,
        dateOfBirth
      );
      toast.success("Profile completed successfully");
      let redirectPath = "/patient"; // Default path
      if (res.user.role === "ADMIN") {
        redirectPath = "/admin";
      } else if (res.user.role === "DOCTOR") {
        redirectPath = "/staff/doctor";
      } else if (res.user.role === "RECEPTIONIST") {
        redirectPath = "/staff/receptionist";
      }
      router.push(redirectPath);
    } catch (error: any) {
      toast.error(error.error || "Failed to complete profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (!tempToken) {
    return null; // Or you could return a loading spinner here
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Complete Your Profile</h1>
          <p className="text-muted-foreground mt-2">
            Please provide the following information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="date"
                placeholder="Date of Birth"
                value={dateOfBirth}
                onChange={(e) => setField("dateOfBirth", e.target.value)}
                className={`pl-10 ${
                  errors.dateOfBirth ? "border-red-500" : ""
                }`}
                required
              />
            </div>
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="tel"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setField("phone", e.target.value)}
                className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Select
              value={sexId}
              onValueChange={(value: string) => setField("sexId", value)}
            >
              <SelectTrigger className={errors.sexId ? "border-red-500" : ""}>
                <SelectValue placeholder="Select Sex" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
            {errors.sexId && (
              <p className="text-red-500 text-sm">{errors.sexId}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || Object.keys(errors).length > 0}
          >
            {isLoading ? "Completing..." : "Complete Profile"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
