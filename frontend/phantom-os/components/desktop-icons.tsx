"use client"

import { useState } from "react"
import type { DesktopIcon } from "@/types/desktop-icon"
import { FileText, Terminal, Paintbrush, Music, Settings, Folder } from "lucide-react"
import type React from "react"

interface DesktopIconsProps {
  icons: DesktopIcon[]
  onLaunchApp: (appId: string) => void
}

export default function DesktopIcons({ icons, onLaunchApp }: DesktopIconsProps) {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)

  const getIconComponent = (iconName: string): JSX.Element => {
    switch (iconName) {
      case "FileText":
        return <FileText className="h-10 w-10 text-white drop-shadow-md" />
      case "Terminal":
        return <Terminal className="h-10 w-10 text-white drop-shadow-md" />
      case "Paintbrush":
        return <Paintbrush className="h-10 w-10 text-white drop-shadow-md" />
      case "Music":
        return <Music className="h-10 w-10 text-white drop-shadow-md" />
      case "Settings":
        return <Settings className="h-10 w-10 text-white drop-shadow-md" />
      case "Folder":
        return <Folder className="h-10 w-10 text-white drop-shadow-md" />
      default:
        return <FileText className="h-10 w-10 text-white drop-shadow-md" />
    }
  }

  const handleIconClick = (e: React.MouseEvent, iconId: string) => {
    e.stopPropagation() // Prevent event bubbling
    setSelectedIcon(iconId)
  }

  const handleIconDoubleClick = (e: React.MouseEvent, appId: string) => {
    e.stopPropagation() // Prevent event bubbling
    onLaunchApp(appId)
  }

  return (
    <div className="absolute top-0 left-0 p-4 grid grid-cols-1 gap-6 z-10">
      {icons.map((icon) => (
        <div
          key={icon.id}
          className={`flex flex-col items-center w-20 cursor-pointer group ${
            selectedIcon === icon.id ? "bg-white/20 rounded" : ""
          }`}
          onClick={(e) => handleIconClick(e, icon.id)}
          onDoubleClick={(e) => handleIconDoubleClick(e, icon.appId)}
        >
          <div className="p-2 rounded-lg group-hover:bg-white/10 transition-colors">{getIconComponent(icon.icon)}</div>
          <div className="mt-1 text-center text-white text-sm font-medium px-1 py-0.5 rounded bg-black/30 w-full">
            {icon.name}
          </div>
        </div>
      ))}
    </div>
  )
}
