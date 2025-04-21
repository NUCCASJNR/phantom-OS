"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Moon, Sun } from "lucide-react"

interface SettingsAppProps {
  changeWallpaper: (wallpaper: string) => void
  toggleTheme: () => void
  currentTheme: string
}

export default function SettingsApp({ changeWallpaper, toggleTheme, currentTheme }: SettingsAppProps) {
  const [selectedWallpaper, setSelectedWallpaper] = useState("/placeholder.svg?height=1080&width=1920")

  const wallpapers = [
    "/wallpapers/dark-mountains.jpg",
    "/wallpapers/abstract-purple.png",
    "/wallpapers/cyber-city.png",
    "/wallpapers/geometric.png",
    "/wallpapers/mountain-lake.png",
    "/wallpapers/night-sky.png",
    "/wallpapers/space-nebula.png",
  ]

  const handleWallpaperChange = (wallpaper: string) => {
    setSelectedWallpaper(wallpaper)
  }

  const applyWallpaper = () => {
    changeWallpaper(selectedWallpaper)
  }

  return (
    <div className="h-full bg-slate-800 text-white p-6 overflow-auto">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      <Tabs defaultValue="appearance">
        <TabsList className="mb-6 bg-slate-900">
          <TabsTrigger value="appearance" className="data-[state=active]:bg-slate-700">
            Appearance
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-slate-700">
            System
          </TabsTrigger>
          <TabsTrigger value="about" className="data-[state=active]:bg-slate-700">
            About
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Theme</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {currentTheme === "dark" ? (
                  <Moon className="h-5 w-5 text-blue-400" />
                ) : (
                  <Sun className="h-5 w-5 text-yellow-400" />
                )}
                <span>Dark Mode</span>
              </div>
              <Switch checked={currentTheme === "dark"} onCheckedChange={toggleTheme} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Wallpaper</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {wallpapers.map((wallpaper, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    selectedWallpaper === wallpaper
                      ? "border-blue-500 scale-105"
                      : "border-transparent hover:border-slate-500"
                  }`}
                  onClick={() => handleWallpaperChange(wallpaper)}
                >
                  <div className="aspect-video w-full bg-slate-700">
                    <img
                      src={wallpaper || "/placeholder.svg"}
                      alt={`Wallpaper ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {selectedWallpaper === wallpaper && (
                    <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Button
              onClick={applyWallpaper}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              Apply Wallpaper
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">System Preferences</h3>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="animations">Enable Animations</Label>
                <Switch id="animations" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="sounds">System Sounds</Label>
                <Switch id="sounds" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Notifications</Label>
                <Switch id="notifications" defaultChecked />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="about" className="space-y-4">
          <h3 className="text-lg font-medium">About Phantom OS</h3>
          <div className="bg-slate-900 p-4 rounded-lg">
            <p className="mb-2">
              <strong>Version:</strong> 1.0.0
            </p>
            <p className="mb-2">
              <strong>Build:</strong> 2023.04.21
            </p>
            <p className="mb-2">
              <strong>Framework:</strong> Next.js
            </p>
            <p>
              <strong>License:</strong> MIT
            </p>
          </div>

          <div className="mt-4">
            <p className="text-slate-400">
              Phantom OS is a simulated operating system built inside the browser. It recreates the feel of a desktop
              OS, allowing users to interact with a desktop interface, launch apps in windows, manage files, and
              customize settings.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
