"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail, ArrowLeft } from "lucide-react"
import { auth } from "@/app/api/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { SuccessNotification } from "@/components/ui/success-notification"
import { ErrorNotification } from "@/components/ui/error-notification"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await auth.forgotPassword(email)
      setNotification({
        type: "success",
        message: "Password reset instructions sent to your email",
      })
    } catch (error: any) {
      setNotification({
        type: "error",
        message: error.message || "Failed to process request. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-muted-foreground mt-2">Enter your email to receive reset instructions</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Instructions"}
          </Button>
        </form>

        <div className="text-center">
          <Link href="/auth/login" className="text-sm text-primary hover:underline inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to login
          </Link>
        </div>
      </Card>

      {notification && notification.type === "success" && (
        <SuccessNotification message={notification.message} onDismiss={() => setNotification(null)} />
      )}

      {notification && notification.type === "error" && (
        <ErrorNotification message={notification.message} onDismiss={() => setNotification(null)} />
      )}
    </div>
  )
}

