import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useResetPassword } from "@/hooks/pages/useResetPassword";
import { PasswordInput } from "@/components/sections/auth/resetPassword/PasswordInput";
import { ConfirmPasswordInput } from "@/components/sections/auth/resetPassword/ConfirmPasswordInput";
import { PasswordStrengthMeter } from "@/components/sections/auth/resetPassword/PasswordStrengthMeter";
import { PasswordRequirementList } from "@/components/sections/auth/resetPassword/PasswordRequirementList";

export default function ResetPassword(
  { params }: { params: { token: string } },
) {
  const {
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
  } = useResetPassword(params.token);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Reset Your Password</h1>
        {generalError && (
          <Alert variant="destructive">
            <AlertDescription>{generalError}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <PasswordInput
            {...{
              value: newPassword,
              error: errors.newPassword,
              onChange: (e) => setField("newPassword", e.target.value),
              showPassword,
              toggleShowPassword,
            }}
          />
          <PasswordStrengthMeter strength={getPasswordStrength()} />
          <PasswordRequirementList password={newPassword} />
          <ConfirmPasswordInput
            {...{
              value: confirmPassword,
              error: errors.confirmPassword,
              onChange: (e) => setField("confirmPassword", e.target.value),
            }}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
