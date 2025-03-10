"use client";
import Link from "next/link";
import { AlertCircle, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLogin } from "@/hooks/pages/useLogin";
import EmailInput from "@/components/sections/login/EmailInput";
import PasswordInput from "@/components/sections/login/PasswordInput";
import GoogleSignInButton from "@/components/sections/login/GoogleSignInButton";

export default function Login() {
  const {
    email,
    password,
    isLoading,
    showPassword,
    errors,
    generalError,
    setField,
    toggleShowPassword,
    handleSubmit,
    handleGoogleSignIn,
  } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Log in to your account</p>
        </div>
        {generalError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{generalError}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <EmailInput email={email} setField={setField} error={errors.email} />
          <PasswordInput
            password={password}
            setField={setField}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
            error={errors.password}
          />
          <div className="flex items-center justify-between">
            <Link
              href="/auth/forgot-password"
              className="font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}{" "}
            <LogIn className="ml-2 h-4 w-4" />
          </Button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6">
            <GoogleSignInButton handleGoogleSignIn={handleGoogleSignIn} />
          </div>
        </div>
      </Card>
    </div>
  );
}
