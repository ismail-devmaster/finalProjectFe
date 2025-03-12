"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { auth } from "@/app/api";
import { useSignUpStore } from "@/hooks/store/useSignUpStore";
import type React from "react";

export function useSignUp() {
  const router = useRouter();
  const {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    phone,
    sexId,
    medicalHistory,
    isLoading,
    setIsLoading,
    validateForm,
  } = useSignUpStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    setIsLoading(true);

    try {
      await auth.signup(
        email,
        password,
        firstName,
        lastName,
        dateOfBirth,
        sexId === "male" ? "1" : "2",
        medicalHistory,
        phone,
      );
      toast.success("Please check your email for verification");
      router.push("/auth/login");
    } catch (error: any) {
      toast.error(error.error || "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  }; return { handleSubmit, isLoading };
}
