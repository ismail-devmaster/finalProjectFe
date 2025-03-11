import { useState } from "react";
import { auth } from "@/app/api";

export function useForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<
    { type: "success" | "error"; message: string } | null
  >(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await auth.forgotPassword(email);
      setNotification({
        type: "success",
        message: "Password reset instructions sent to your email",
      });
    } catch (error: any) {
      setNotification({
        type: "error",
        message: error.message ||
          "Failed to process request. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    loading,
    notification,
    handleSubmit,
    dismissNotification: () => setNotification(null),
  };
}
