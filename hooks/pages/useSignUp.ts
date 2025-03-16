import { useRouter } from "next/navigation";
import { useSignUpStore } from "@/hooks/store/useSignUpStore";
import { toast } from "sonner";
import { auth } from "@/app/api";
/**
 * Custom hook to determine password strength
 * @param password The password string to evaluate
 * @returns A string indicating password strength: "weak", "medium", or "strong"
 */
interface UseSignUpSubmitProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sexId: string;
  medicalHistory: string;
  phone: string;
  validateForm: () => boolean;
  setIsLoading: (value: boolean) => void;
  router: any;
}
function usePasswordStrength(password: string): string {
  if (!password) return "";

  const checks = [/.{8,}/, /[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/];
  const passedChecks = checks.filter((regex) => regex.test(password)).length;

  if (passedChecks <= 2) return "weak";
  if (passedChecks <= 4) return "medium";
  return "strong";
}

function useSignUpSubmit({
  email,
  password,
  firstName,
  lastName,
  dateOfBirth,
  sexId,
  medicalHistory,
  phone,
  validateForm,
  setIsLoading,
  router,
}: UseSignUpSubmitProps) {
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
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
    } catch (error: unknown) {
      // Type assertion for the error object
      const errorObj = error as { error?: string };
      toast.error(errorObj.error || "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit };
}
export function useSignUp() {
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

  const passwordStrength = usePasswordStrength(password);

  const { handleSubmit } = useSignUpSubmit({
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    sexId,
    medicalHistory,
    phone,
    validateForm,
    setIsLoading,
    router,
  });

  return {
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
    setIsLoading,
    validateForm,
    passwordStrength,
    handleSubmit,
  };
}
