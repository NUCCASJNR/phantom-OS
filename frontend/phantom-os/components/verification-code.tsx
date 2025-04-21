"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GhostIcon, ArrowLeft, Loader2, CheckCircle } from "lucide-react"

interface VerificationCodeProps {
  email: string
  onBack: () => void
  onVerificationComplete: () => void
}

export default function VerificationCode({ email, onBack, onVerificationComplete }: VerificationCodeProps) {
  const [code, setCode] = useState<string[]>(Array(6).fill(""))
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Timer for resend code
  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft])

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleInputChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value

    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace" && !code[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("")
      setCode(digits)

      // Focus the last input
      if (inputRefs.current[5]) {
        inputRefs.current[5].focus()
      }
    }
  }

  const handleResendCode = () => {
    // Simulate resending code
    setTimeLeft(60)
    // In a real app, you would call your API to resend the code
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const verificationCode = code.join("")

    if (verificationCode.length !== 6) {
      setError("Please enter all 6 digits of the verification code")
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
      // In a real app, you would validate the code with your backend
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message before redirecting
      setSuccess(true)

      // Redirect after showing success message
      setTimeout(() => {
        onVerificationComplete()
      }, 2000)
    } catch (err) {
      setError("Invalid verification code. Please try again.")
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
          <p className="text-slate-400">Verify your account</p>
        </div>

        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">Enter Verification Code</CardTitle>
            <CardDescription className="text-slate-400">We've sent a 6-digit code to {email}</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {success ? (
                <div className="flex flex-col items-center justify-center py-4">
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                  <p className="text-white text-center">Verification successful!</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-center gap-2">
                    {code.map((digit, index) => (
                      <Input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        className="w-12 h-12 text-center text-xl bg-slate-700 border-slate-600 text-white"
                      />
                    ))}
                  </div>
                  {error && (
                    <div className="text-red-400 text-sm bg-red-400/10 p-2 rounded border border-red-400/20">
                      {error}
                    </div>
                  )}
                  <div className="text-center text-sm text-slate-400">
                    Didn't receive a code?{" "}
                    {timeLeft > 0 ? (
                      <span>Resend code in {timeLeft}s</span>
                    ) : (
                      <Button variant="link" className="p-0 text-purple-400" onClick={handleResendCode}>
                        Resend code
                      </Button>
                    )}
                  </div>
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
                    Verifying...
                  </>
                ) : success ? (
                  "Verified"
                ) : (
                  "Verify Code"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
