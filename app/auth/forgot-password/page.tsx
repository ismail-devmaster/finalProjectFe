"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SuccessNotification } from "@/components/ui/success-notification";
import { ErrorNotification } from "@/components/ui/error-notification";
import EmailInput from "@/components/sections/forgetPassword/EmailInput";
import HeaderSection from "@/components/sections/forgetPassword/HeaderSection";
import BackToLogin from "@/components/sections/forgetPassword/BackToLogin";
import { useForgotPassword } from "@/hooks/pages/useForgotPassword";

export default function ForgotPassword() {
  const {
    email,
    setEmail,
    loading,
    notification,
    handleSubmit,
    dismissNotification,
  } = useForgotPassword();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8 space-y-6">
        <HeaderSection />
        <form onSubmit={handleSubmit} className="space-y-4">
          <EmailInput email={email} setEmail={setEmail} />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Instructions"}
          </Button>
        </form>
        <BackToLogin />
      </Card>
      {notification?.type === "success" && (
        <SuccessNotification
          message={notification.message}
          onDismiss={dismissNotification}
        />
      )}
      {notification?.type === "error" && (
        <ErrorNotification
          message={notification.message}
          onDismiss={dismissNotification}
        />
      )}
    </div>
  );
}
