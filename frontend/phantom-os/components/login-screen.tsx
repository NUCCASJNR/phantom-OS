"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GhostIcon, ArrowLeft, Loader2 } from "lucide-react"
import PasswordReset from "@/components/password-reset"

interface LoginScreenProps {
  onLogin: (username: string, password: string) => void
  onBack?: () => void
}

export default function LoginScreen({ onLogin, onBack }: LoginScreenProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPasswordReset, setShowPasswordReset] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!username || !password) {
      setError("Username and password are required")
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
      // In a real app, you would validate credentials with your backend
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Login successful
      onLogin(username, password)
    } catch (err) {
      setError("Invalid username or password")
    } finally {
      setIsLoading(false)
    }
  }

  if (showPasswordReset) {
    return (
      <PasswordReset onBack={() => setShowPasswordReset(false)} onResetComplete={() => setShowPasswordReset(false)} />
    )
  }

  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md px-4 relative z-10">
        {onBack && (
          <Button variant="ghost" className="absolute top-4 left-4 text-white" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-md"></div>
              <GhostIcon className="h-16 w-16 text-white relative" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Phantom OS</h1>
          <p className="text-slate-400">Your desktop experience in the browser</p>
        </div>

        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">Sign In</CardTitle>
            <CardDescription className="text-slate-400">Enter your credentials to access your desktop</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">
                  Username
                </Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Enter your password"
                  required
                />
              </div>
              {error && (
                <div className="text-red-400 text-sm bg-red-400/10 p-2 rounded border border-red-400/20">{error}</div>
              )}
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
              <div className="text-center w-full">
                <Button
                  variant="link"
                  className="text-slate-400 hover:text-white"
                  onClick={() => setShowPasswordReset(true)}
                >
                  Forgot password?
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-4 text-center text-slate-500 text-sm">
          <p>Don&apos;t have an account? Contact your system administrator</p>
        </div>
      </div>
    </div>
  )
}
