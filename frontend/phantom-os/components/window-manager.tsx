"use client"
import type { AppWindow } from "@/types/app-window"
import AppWindowComponent from "@/components/app-window"
import NotepadApp from "@/components/apps/notepad-app"
import TerminalApp from "@/components/apps/terminal-app"
import PaintApp from "@/components/apps/paint-app"
import MediaPlayerApp from "@/components/apps/media-player-app"
import SettingsApp from "@/components/apps/settings-app"
import FileExplorerApp from "@/components/apps/file-explorer-app"

interface WindowManagerProps {
  windows: AppWindow[]
  activeWindowId: string | null
  onClose: (windowId: string) => void
  onMinimize: (windowId: string) => void
  onMaximize: (windowId: string) => void
  onActivate: (windowId: string) => void
  onUpdatePosition: (windowId: string, position: { x: number; y: number }) => void
  onUpdateSize: (windowId: string, size: { width: number; height: number }) => void
  changeWallpaper: (wallpaper: string) => void
  toggleTheme: () => void
  currentTheme: string
}

export default function WindowManager({
  windows,
  activeWindowId,
  onClose,
  onMinimize,
  onMaximize,
  onActivate,
  onUpdatePosition,
  onUpdateSize,
  changeWallpaper,
  toggleTheme,
  currentTheme,
}: WindowManagerProps) {
  const renderAppContent = (window: AppWindow) => {
    switch (window.appId) {
      case "notepad":
        return <NotepadApp />
      case "terminal":
        return <TerminalApp />
      case "paint":
        return <PaintApp />
      case "media-player":
        return <MediaPlayerApp />
      case "settings":
        return <SettingsApp changeWallpaper={changeWallpaper} toggleTheme={toggleTheme} currentTheme={currentTheme} />
      case "file-explorer":
        return <FileExplorerApp />
      default:
        return <div className="p-4">App content not available</div>
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      {windows.map((window) => (
        <AppWindowComponent
          key={window.id}
          window={window}
          isActive={activeWindowId === window.id}
          onClose={onClose}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
          onActivate={onActivate}
          onUpdatePosition={onUpdatePosition}
          onUpdateSize={onUpdateSize}
        >
          {renderAppContent(window)}
        </AppWindowComponent>
      ))}
    </div>
  )
}
