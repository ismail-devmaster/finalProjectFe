"use client";

import { useRouter } from "next/navigation";
import { useResetPasswordStore } from "@/hooks/store/useResetPasswordStore";
import { auth } from "@/app/api";
import { toast } from "sonner";

export function useResetPassword(token: string) {
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
      await auth.resetPassword(token, newPassword);
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
    const passedChecks =
      checks.filter((regex) => regex.test(newPassword)).length;
    if (passedChecks <= 2) return "weak";
    if (passedChecks <= 4) return "medium";
    return "strong";
  };

  return {
    newPassword,
    confirmPassword,
    isLoading,
    errors,
    generalError,
    showPassword,
    setField,
    toggleShowPassword,
    handleSubmit,
    getPasswordStrength,
  };
}
