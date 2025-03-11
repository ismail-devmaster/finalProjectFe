import { useRouter, useSearchParams } from "next/navigation";
import { useCompleteProfileStore } from "@/hooks/store/useCompleteProfileStore";
import { useEffect } from "react";
import { toast } from "sonner";
import { auth } from "@/app/api";
//type Role = "ADMIN" | "DOCTOR" | "RECEPTIONIST" | "PATIENT";

export function useCompleteProfile() {
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
      router.push("/auth/login");
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
        dateOfBirth,
      );
      toast.success("Profile completed successfully");
      let redirectPath = "/patient";
      if (res.user.role === "ADMIN") redirectPath = "/admin";
      else if (res.user.role === "DOCTOR") redirectPath = "/staff/doctor";
      else if (res.user.role === "RECEPTIONIST") {
        redirectPath = "/staff/receptionist";
      }
      router.push(redirectPath);
    } catch (error: any) {
      toast.error(error.error || "Failed to complete profile");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tempToken,
    dateOfBirth,
    phone,
    sexId,
    isLoading,
    errors,
    setField,
    handleSubmit,
  };
}
