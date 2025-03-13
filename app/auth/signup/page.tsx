"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmailInput } from "@/components/sections/signup/EmailInput";
import { PasswordInput } from "@/components/sections/signup/PasswordInput";
import { NameInputs } from "@/components/sections/signup/NameInputs";
import { DateOfBirthInput } from "@/components/sections/signup/DateOfBirthInput";
import { PhoneInput } from "@/components/sections/signup/PhoneInput";
import { SexSelect } from "@/components/sections/signup/SexSelect";
import { MedicalHistoryInput } from "@/components/sections/signup/MedicalHistoryInput";
import { usePasswordStrength } from "@/hooks/pages/usePasswordStrength";
import { useSignUpSubmit } from "@/hooks/pages/useSignUpSubmit";
import { useSignUpStore } from "@/hooks/store/useSignUpStore";
import { useSignUp } from "@/hooks/pages/useSignUp"
import type React from "react";
export default function SignUp() {

  const {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    phone,
    sexId,
    medicalHistory,
    showPassword,
    isLoading,
    errors,
    setField,
    toggleShowPassword,
    passwordStrength,
    handleSubmit,
  } = useSignUp();

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
