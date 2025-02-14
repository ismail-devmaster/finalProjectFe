"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  User,
  Phone,
  Calendar,
} from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useSignUpStore } from "./useSignUpStore";
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
    sexId="male",
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
        sexId === "male" ? "1": "2",
        medicalHistory,
        phone
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
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setField("email", e.target.value)}
                className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                required
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setField("password", e.target.value)}
                className={`pl-10 pr-10 ${
                  errors.password ? "border-red-500" : ""
                }`}
                required
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
            {password && (
              <div className="space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    {["weak", "medium", "strong"].map((strength, index) => (
                      <div
                        key={strength}
                        className={`h-full transition-all duration-300 ${
                          passwordStrength === "weak"
                            ? "w-1/3 bg-red-500"
                            : passwordStrength === "medium"
                            ? "w-2/3 bg-yellow-500"
                            : passwordStrength === "strong"
                            ? "w-full bg-green-500"
                            : "w-0"
                        }`}
                      />
                    ))}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      passwordStrength === "weak"
                        ? "text-red-500"
                        : passwordStrength === "medium"
                        ? "text-yellow-500"
                        : passwordStrength === "strong"
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  >
                    {passwordStrength || "Enter password"}
                  </span>
                </div>
                <ul className="text-sm space-y-1">
                  {[
                    { regex: /.{8,}/, text: "At least 8 characters" },
                    { regex: /[A-Z]/, text: "One uppercase letter" },
                    { regex: /[a-z]/, text: "One lowercase letter" },
                    { regex: /[0-9]/, text: "One number" },
                    { regex: /[^A-Za-z0-9]/, text: "One special character" },
                  ].map(({ regex, text }, index) => (
                    <li key={index} className="flex items-center">
                      {regex.test(password) ? (
                        <svg
                          className="w-4 h-4 mr-2 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 mr-2 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                      <span
                        className={
                          regex.test(password)
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setField("firstName", e.target.value)}
                  className={`pl-10 ${
                    errors.firstName ? "border-red-500" : ""
                  }`}
                  required
                />
              </div>
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setField("lastName", e.target.value)}
                  className={`pl-10 ${errors.lastName ? "border-red-500" : ""}`}
                  required
                />
              </div>
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>
          </div>

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
            <Select value={sexId} onValueChange={(value: string) => setField("sexId", value)}>
              <SelectTrigger className={errors.sexId ? "border-red-500" : ""}>
                <SelectValue placeholder="Select Sex" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
            {errors.sexId && <p className="text-red-500 text-sm">{errors.sexId}</p>}
          </div>

          <div className="space-y-2">
            <Textarea
              placeholder="Medical History"
              value={medicalHistory}
              onChange={(e) => setField("medicalHistory", e.target.value)}
              className={errors.medicalHistory ? "border-red-500" : ""}
            />
            {errors.medicalHistory && (
              <p className="text-red-500 text-sm">{errors.medicalHistory}</p>
            )}
          </div>

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
