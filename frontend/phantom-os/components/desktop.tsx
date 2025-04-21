"use client"

import type React from "react"

import { useState } from "react"
import Taskbar from "@/components/taskbar"
import DesktopIcons from "@/components/desktop-icons"
import WindowManager from "@/components/window-manager"
import StartMenu from "@/components/start-menu"
import type { AppWindow } from "@/types/app-window"
import type { DesktopIcon } from "@/types/desktop-icon"
import { useTheme } from "next-themes"

interface DesktopProps {
  user: { username: string }
  onLogout: () => void
}

export default function Desktop({ user, onLogout }: DesktopProps) {
  const [showStartMenu, setShowStartMenu] = useState(false)
  const [windows, setWindows] = useState<AppWindow[]>([])
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null)
  // Update the wallpaper state to include a default that matches one of our new options
  const [wallpaper, setWallpaper] = useState("/wallpapers/dark-mountains.jpg")
  const { theme, setTheme } = useTheme()

  // Desktop icons
  const desktopIcons: DesktopIcon[] = [
    { id: "notepad", name: "Notepad", icon: "FileText", appId: "notepad" },
    { id: "terminal", name: "Terminal", icon: "Terminal", appId: "terminal" },
    { id: "paint", name: "Paint", icon: "Paintbrush", appId: "paint" },
    { id: "media-player", name: "Media Player", icon: "Music", appId: "media-player" },
    { id: "settings", name: "Settings", icon: "Settings", appId: "settings" },
    { id: "file-explorer", name: "Files", icon: "Folder", appId: "file-explorer" },
  ]

  const toggleStartMenu = () => {
    setShowStartMenu((prev) => !prev)
  }

  const closeStartMenu = () => {
    setShowStartMenu(false)
  }

  const launchApp = (appId: string) => {
    // Check if app is already open
    const existingWindow = windows.find((w) => w.appId === appId)

    if (existingWindow) {
      // Bring to front
      setActiveWindowId(existingWindow.id)
    } else {
      // Create new window
      const newWindow: AppWindow = {
        id: `window-${Date.now()}`,
        appId,
        title: getAppTitle(appId),
        position: { x: 100 + windows.length * 30, y: 100 + windows.length * 30 },
        size: getDefaultSize(appId),
        isMinimized: false,
        isMaximized: false,
        zIndex: windows.length + 1,
      }

      setWindows((prev) => [...prev, newWindow])
      setActiveWindowId(newWindow.id)
    }

    closeStartMenu()
  }

  const getAppTitle = (appId: string): string => {
    switch (appId) {
      case "notepad":
        return "Notepad"
      case "terminal":
        return "Terminal"
      case "paint":
        return "Paint"
      case "media-player":
        return "Media Player"
      case "settings":
        return "Settings"
      case "file-explorer":
        return "File Explorer"
      default:
        return "Application"
    }
  }

  const getDefaultSize = (appId: string): { width: number; height: number } => {
    switch (appId) {
      case "notepad":
        return { width: 600, height: 400 }
      case "terminal":
        return { width: 700, height: 500 }
      case "paint":
        return { width: 800, height: 600 }
      case "media-player":
        return { width: 500, height: 400 }
      case "settings":
        return { width: 700, height: 500 }
      case "file-explorer":
        return { width: 800, height: 500 }
      default:
        return { width: 600, height: 400 }
    }
  }

  const closeWindow = (windowId: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId))

    if (activeWindowId === windowId) {
      const remainingWindows = windows.filter((w) => w.id !== windowId)
      if (remainingWindows.length > 0) {
        // Set the highest z-index window as active
        const highestZWindow = remainingWindows.reduce((prev, current) =>
          prev.zIndex > current.zIndex ? prev : current,
        )
        setActiveWindowId(highestZWindow.id)
      } else {
        setActiveWindowId(null)
      }
    }
  }

  const minimizeWindow = (windowId: string) => {
    setWindows((prev) => prev.map((w) => (w.id === windowId ? { ...w, isMinimized: true } : w)))

    // Set next highest z-index window as active
    if (activeWindowId === windowId) {
      const visibleWindows = windows.filter((w) => !w.isMinimized && w.id !== windowId)
      if (visibleWindows.length > 0) {
        const highestZWindow = visibleWindows.reduce((prev, current) => (prev.zIndex > current.zIndex ? prev : current))
        setActiveWindowId(highestZWindow.id)
      } else {
        setActiveWindowId(null)
      }
    }
  }

  const maximizeWindow = (windowId: string) => {
    setWindows((prev) => prev.map((w) => (w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w)))
  }

  const restoreWindow = (windowId: string) => {
    setWindows((prev) => prev.map((w) => (w.id === windowId ? { ...w, isMinimized: false } : w)))
    setActiveWindowId(windowId)

    // Update z-index to bring window to front
    setWindows((prev) => {
      const maxZ = Math.max(...prev.map((w) => w.zIndex))
      return prev.map((w) => (w.id === windowId ? { ...w, zIndex: maxZ + 1 } : w))
    })
  }

  const activateWindow = (windowId: string) => {
    if (activeWindowId === windowId) return

    setActiveWindowId(windowId)

    // Update z-index to bring window to front
    setWindows((prev) => {
      const maxZ = Math.max(...prev.map((w) => w.zIndex))
      return prev.map((w) => (w.id === windowId ? { ...w, zIndex: maxZ + 1 } : w))
    })
  }

  const updateWindowPosition = (windowId: string, position: { x: number; y: number }) => {
    setWindows((prev) => prev.map((w) => (w.id === windowId ? { ...w, position } : w)))
  }

  const updateWindowSize = (windowId: string, size: { width: number; height: number }) => {
    setWindows((prev) => prev.map((w) => (w.id === windowId ? { ...w, size } : w)))
  }

  const changeWallpaper = (newWallpaper: string) => {
    setWallpaper(newWallpaper)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Close start menu when clicking on desktop
  const handleDesktopClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("desktop-background")) {
      closeStartMenu()
    }
  }

  return (
    <div className="h-full w-full relative overflow-hidden" onClick={handleDesktopClick}>
      {/* Wallpaper */}
      <div
        className="desktop-background absolute inset-0 bg-cover bg-center transition-all duration-300"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />

      {/* Desktop Icons */}
      <DesktopIcons icons={desktopIcons} onLaunchApp={launchApp} />

      {/* Window Manager */}
      <WindowManager
        windows={windows}
        activeWindowId={activeWindowId}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={maximizeWindow}
        onActivate={activateWindow}
        onUpdatePosition={updateWindowPosition}
        onUpdateSize={updateWindowSize}
        changeWallpaper={changeWallpaper}
        toggleTheme={toggleTheme}
        currentTheme={theme || "dark"}
      />

      {/* Start Menu */}
      {showStartMenu && (
        <StartMenu username={user.username} onLaunchApp={launchApp} onLogout={onLogout} onClose={closeStartMenu} />
      )}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        onToggleStartMenu={toggleStartMenu}
        showStartMenu={showStartMenu}
        onRestoreWindow={restoreWindow}
        onActivateWindow={activateWindow}
      />
    </div>
  )
}
