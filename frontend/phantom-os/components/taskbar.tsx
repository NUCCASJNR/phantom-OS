"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import type { AppWindow } from "@/types/app-window"
import { GhostIcon, MonitorIcon, FileText, Terminal, Paintbrush, Music, Settings, Folder } from "lucide-react"

interface TaskbarProps {
  windows: AppWindow[]
  activeWindowId: string | null
  showStartMenu: boolean
  onToggleStartMenu: () => void
  onRestoreWindow: (windowId: string) => void
  onActivateWindow: (windowId: string) => void
}

export default function Taskbar({
  windows,
  activeWindowId,
  showStartMenu,
  onToggleStartMenu,
  onRestoreWindow,
  onActivateWindow,
}: TaskbarProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getAppIcon = (appId: string) => {
    switch (appId) {
      case "notepad":
        return <FileText className="h-5 w-5" />
      case "terminal":
        return <Terminal className="h-5 w-5" />
      case "paint":
        return <Paintbrush className="h-5 w-5" />
      case "media-player":
        return <Music className="h-5 w-5" />
      case "settings":
        return <Settings className="h-5 w-5" />
      case "file-explorer":
        return <Folder className="h-5 w-5" />
      default:
        return <MonitorIcon className="h-5 w-5" />
    }
  }

  const handleTaskbarItemClick = (window: AppWindow) => {
    if (window.isMinimized) {
      onRestoreWindow(window.id)
    } else if (activeWindowId === window.id) {
      // Minimize if already active
      // This would be handled by the parent component
    } else {
      onActivateWindow(window.id)
    }
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-slate-900/90 backdrop-blur-md border-t border-slate-700 flex items-center px-2 z-50">
      {/* Start Button */}
      <Button
        variant="ghost"
        size="icon"
        className={`h-10 w-10 rounded-full mr-2 ${showStartMenu ? "bg-slate-700" : ""}`}
        onClick={onToggleStartMenu}
      >
        <GhostIcon className="h-6 w-6 text-white" />
      </Button>

      {/* Divider */}
      <div className="h-8 w-px bg-slate-700 mx-2" />

      {/* Open Windows */}
      <div className="flex-1 flex items-center space-x-1 overflow-x-auto">
        {windows.map((window) => (
          <Button
            key={window.id}
            variant="ghost"
            className={`h-9 px-3 flex items-center gap-2 rounded-md text-sm ${
              activeWindowId === window.id && !window.isMinimized
                ? "bg-slate-700 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
            onClick={() => handleTaskbarItemClick(window)}
          >
            {getAppIcon(window.appId)}
            <span className="truncate max-w-[100px]">{window.title}</span>
          </Button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center space-x-4 ml-2 text-white">
        <div className="text-sm">{currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
      </div>
    </div>
  )
}
