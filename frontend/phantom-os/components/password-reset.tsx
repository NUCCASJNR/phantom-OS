"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GhostIcon, ArrowLeft, Loader2, CheckCircle } from "lucide-react"

interface PasswordResetProps {
  onBack: () => void
  onResetComplete: () => void
}

export default function PasswordReset({ onBack, onResetComplete }: PasswordResetProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email) {
      setError("Email is required")
      return
    }

    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
      // In a real app, you would call your API to send a reset link
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message
      setSuccess(true)

      // Redirect after showing success message
      setTimeout(() => {
        onResetComplete()
      }, 3000)
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md px-4 relative z-10">
        <Button variant="ghost" className="absolute top-4 left-4 text-white" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-md"></div>
              <GhostIcon className="h-16 w-16 text-white relative" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Phantom OS</h1>
          <p className="text-slate-400">Reset your password</p>
        </div>

        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">Forgot Password</CardTitle>
            <CardDescription className="text-slate-400">
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {success ? (
                <div className="flex flex-col items-center justify-center py-4">
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                  <p className="text-white text-center">Password reset link sent! Check your email for instructions.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  {error && (
                    <div className="text-red-400 text-sm bg-red-400/10 p-2 rounded border border-red-400/20">
                      {error}
                    </div>
                  )}
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                disabled={isLoading || success}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending Reset Link...
                  </>
                ) : success ? (
                  "Email Sent"
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-4 text-center text-slate-500 text-sm">
          <p>
            Remember your password?{" "}
            <Button variant="link" className="text-purple-400 p-0" onClick={onBack}>
              Back to login
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}
