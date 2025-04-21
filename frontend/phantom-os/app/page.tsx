"use client"

import { useState } from "react"
import LoginScreen from "@/components/login-screen"
import BootScreen from "@/components/boot-screen"
import Desktop from "@/components/desktop"
import HomePage from "@/components/home-page"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<"home" | "login" | "boot" | "desktop">("home")
  const [user, setUser] = useState<{ username: string } | null>(null)

  console.log("Current screen:", currentScreen)

  const handleLogin = (username: string, password: string) => {
    console.log("Login handler called with username:", username)
    // In a real app, you would validate credentials with your backend
    setUser({ username })
    setCurrentScreen("boot")

    // Simulate boot process
    setTimeout(() => {
      setCurrentScreen("desktop")
    }, 3000)
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentScreen("home")
  }

  return (
    <main className={`h-screen w-screen ${currentScreen === "home" ? "overflow-auto" : "overflow-hidden"}`}>
      {currentScreen === "home" && <HomePage onLogin={handleLogin} />}
      {currentScreen === "login" && <LoginScreen onLogin={handleLogin} />}
      {currentScreen === "boot" && <BootScreen />}
      {currentScreen === "desktop" && user && <Desktop user={user} onLogout={handleLogout} />}
    </main>
  )
}
