"use client"

import { Button } from "@/components/ui/button"
import { FileText, Terminal, Paintbrush, Music, Settings, Folder, LogOut, User, Power } from "lucide-react"

interface StartMenuProps {
  username: string
  onLaunchApp: (appId: string) => void
  onLogout: () => void
  onClose: () => void
}

export default function StartMenu({ username, onLaunchApp, onLogout, onClose }: StartMenuProps) {
  const handleAppClick = (appId: string) => {
    onLaunchApp(appId)
  }

  return (
    <div
      className="absolute bottom-12 left-0 w-64 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-t-lg shadow-xl z-50 overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* User Profile */}
      <div className="p-4 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-b border-slate-700 flex items-center">
        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center mr-3">
          <User className="h-6 w-6 text-white" />
        </div>
        <div>
          <div className="text-white font-medium">{username}</div>
          <div className="text-slate-400 text-xs">User Account</div>
        </div>
      </div>

      {/* Apps List */}
      <div className="py-2">
        <div className="px-3 py-1 text-xs text-slate-500 uppercase">Applications</div>

        <Button
          variant="ghost"
          className="w-full justify-start px-4 py-2 text-white hover:bg-slate-800"
          onClick={() => handleAppClick("notepad")}
        >
          <FileText className="h-5 w-5 mr-3 text-green-400" />
          Notepad
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start px-4 py-2 text-white hover:bg-slate-800"
          onClick={() => handleAppClick("terminal")}
        >
          <Terminal className="h-5 w-5 mr-3 text-yellow-400" />
          Terminal
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start px-4 py-2 text-white hover:bg-slate-800"
          onClick={() => handleAppClick("paint")}
        >
          <Paintbrush className="h-5 w-5 mr-3 text-blue-400" />
          Paint
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start px-4 py-2 text-white hover:bg-slate-800"
          onClick={() => handleAppClick("media-player")}
        >
          <Music className="h-5 w-5 mr-3 text-purple-400" />
          Media Player
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start px-4 py-2 text-white hover:bg-slate-800"
          onClick={() => handleAppClick("file-explorer")}
        >
          <Folder className="h-5 w-5 mr-3 text-orange-400" />
          File Explorer
        </Button>
      </div>

      {/* System */}
      <div className="border-t border-slate-700 py-2">
        <div className="px-3 py-1 text-xs text-slate-500 uppercase">System</div>

        <Button
          variant="ghost"
          className="w-full justify-start px-4 py-2 text-white hover:bg-slate-800"
          onClick={() => handleAppClick("settings")}
        >
          <Settings className="h-5 w-5 mr-3 text-slate-400" />
          Settings
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start px-4 py-2 text-white hover:bg-slate-800"
          onClick={onLogout}
        >
          <LogOut className="h-5 w-5 mr-3 text-red-400" />
          Log Out
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start px-4 py-2 text-white hover:bg-slate-800"
          onClick={onLogout}
        >
          <Power className="h-5 w-5 mr-3 text-red-400" />
          Shut Down
        </Button>
      </div>
    </div>
  )
}
