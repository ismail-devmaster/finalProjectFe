"use client";
import { useRouter } from "next/navigation";
import type React from "react";

import { Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import { auth } from "@/app/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useResetPasswordStore } from "./useResetPasswordStore";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ResetPassword({
  params,
}: {
  params: { token: string };
}) {
  const router = useRouter();
  const {
    newPassword,
    confirmPassword,
    isLoading,
    errors,
    generalError,
    showPassword,
    setField,
    setIsLoading,
    setGeneralError,
    validateForm,
    resetErrors,
    toggleShowPassword,
  } = useResetPasswordStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetErrors();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);

    try {
      await auth.resetPassword(params.token, newPassword);
      toast.success("Password reset successfully");
      router.push("/auth/login");
    } catch (error: any) {
      setGeneralError(error.error || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    if (!newPassword) return "";
    const checks = [/.{8,}/, /[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/];
    const passedChecks = checks.filter((regex) =>
      regex.test(newPassword)
    ).length;
    if (passedChecks <= 2) return "weak";
    if (passedChecks <= 4) return "medium";
    return "strong";
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Reset Your Password</h1>
          <p className="text-muted-foreground mt-2">Enter your new password</p>
        </div>

        {generalError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{generalError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setField("newPassword", e.target.value)}
                className={`pl-10 pr-10 ${errors.newPassword ? "border-red-500" : ""
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
            {newPassword && (
              <div className="space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    {["weak", "medium", "strong"].map((strength, index) => (
                      <div
                        key={strength}
                        className={`h-full transition-all duration-300 ${passwordStrength === "weak"
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
                    className={`text-sm font-medium ${passwordStrength === "weak"
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
                      {regex.test(newPassword) ? (
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
                          regex.test(newPassword)
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
            {errors.newPassword && (
              <p className="text-red-500 text-sm">{errors.newPassword}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setField("confirmPassword", e.target.value)}
                className={`pl-10 ${errors.confirmPassword ? "border-red-500" : ""
                  }`}
                required
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={
              isLoading || !!errors.newPassword || !!errors.confirmPassword
            }
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
