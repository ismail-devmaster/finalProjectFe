import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useLoginStore } from "@/hooks/store/useLoginStore";
import { auth } from "@/app/api";
import { toast } from "sonner";

export function useLogin() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    email,
    password,
    isLoading,
    showPassword,
    errors,
    generalError,
    setField,
    toggleShowPassword,
    setIsLoading,
    setGeneralError,
    validateForm,
    resetErrors,
  } = useLoginStore();

  // Extract email from query parameters on mount
  useEffect(() => {
    const emailFromParams = searchParams.get("email");
    if (emailFromParams) {
      setField("email", emailFromParams);
    }
  }, [searchParams, setField]);

  // Ensure the function is memoized and does not re-execute unnecessarily
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      resetErrors();

      if (!validateForm()) return;

      setIsLoading(true);
      try {
        const response = await auth.login(email, password);
        let redirectPath = "/patient";
        if (response.user.role === "ADMIN") {
          redirectPath = "/admin";
        } else if (response.user.role === "DOCTOR") {
          redirectPath = "/staff/doctor";
        } else if (response.user.role === "RECEPTIONIST") {
          redirectPath = "/staff/receptionist";
        }

        const queryString = searchParams.toString();
        if (queryString) {
          redirectPath += `?${queryString}`;
        }

        toast.success("Logged in successfully");
        router.push(redirectPath);
      } catch (error: any) {
        const message = error.response?.data?.error || "Login failed";
        setGeneralError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [
      email,
      password,
      resetErrors,
      validateForm,
      setIsLoading,
      setGeneralError,
      router,
      searchParams,
    ],
  );

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await auth.googleLogin();
    } catch (error: any) {
      const message = error.response?.data?.error || "Google Sign-In failed";
      setGeneralError(message);
      setIsLoading(false);
    }
  };

  return {
    email,
    password,
    isLoading,
    showPassword,
    errors,
    generalError,
    setField,
    toggleShowPassword,
    handleSubmit, // This is only called on explicit user action
    handleGoogleSignIn,
  };
}
