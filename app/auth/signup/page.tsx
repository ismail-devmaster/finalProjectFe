"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSignUpStore } from "./useSignUpStore";
import { EmailInput } from "@/components/sections/signup/EmailInput";
import { PasswordInput } from "@/components/sections/signup/PasswordInput";
import { NameInputs } from "@/components/sections/signup/NameInputs";
import { DateOfBirthInput } from "@/components/sections/signup/DateOfBirthInput";
import { PhoneInput } from "@/components/sections/signup/PhoneInput";
import { SexSelect } from "@/components/sections/signup/SexSelect";
import { MedicalHistoryInput } from "@/components/sections/signup/MedicalHistoryInput";
import { toast } from "sonner";
import { auth } from "@/app/api";
import type React from "react";


export default function SignUp() {
  const router = useRouter();
  const {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    phone,
    sexId = "male",
    medicalHistory,
    showPassword,
    isLoading,
    errors,
    setField,
    toggleShowPassword,
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
  };
  const getPasswordStrength = () => {
    if (!password) return "";
    const checks = [/.{8,}/, /[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/];
    const passedChecks = checks.filter((regex) => regex.test(password)).length;
    if (passedChecks <= 2) return "weak";
    if (passedChecks <= 4) return "medium";
    return "strong";
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground mt-2">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <EmailInput
            email={email}
            error={errors.email}
            onChange={(value) => setField("email", value)}
          />

          <PasswordInput
            password={password}
            showPassword={showPassword}
            error={errors.password}
            onChange={(value) => setField("password", value)}
            toggleShowPassword={toggleShowPassword}
            passwordStrength={passwordStrength}
          />

          <NameInputs
            firstName={firstName}
            lastName={lastName}
            errors={errors}
            onChange={(field, value) => setField(field, value)}
          />

          <DateOfBirthInput
            dateOfBirth={dateOfBirth}
            error={errors.dateOfBirth}
            onChange={(value) => setField("dateOfBirth", value)}
          />

          <PhoneInput
            phone={phone}
            error={errors.phone}
            onChange={(value) => setField("phone", value)}
          />

          <SexSelect
            sexId={sexId}
            error={errors.sexId}
            onChange={(value) => setField("sexId", value)}
          />

          <MedicalHistoryInput
            medicalHistory={medicalHistory}
            error={errors.medicalHistory}
            onChange={(value) => setField("medicalHistory", value)}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || Object.keys(errors).length > 0}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
            <ArrowRight className="ml-2 h-4 w-5" />
          </Button>
        </form>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            Log in
          </Link>
        </div>
      </Card>
    </div>
  );
}
