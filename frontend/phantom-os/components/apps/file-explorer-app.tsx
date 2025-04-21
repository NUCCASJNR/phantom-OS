"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Folder, File, FileText, ImageIcon, Music, Video, ChevronRight, RefreshCw, ArrowUp } from "lucide-react"

interface FileItem {
  id: string
  name: string
  type: "file" | "folder" | "image" | "audio" | "video" | "document"
  size?: string
  modified?: string
  parent: string | null
}

export default function FileExplorerApp() {
  const [currentPath, setCurrentPath] = useState("/home/user")
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  // Mock file system data
  const files: FileItem[] = [
    { id: "1", name: "Documents", type: "folder", parent: null },
    { id: "2", name: "Pictures", type: "folder", parent: null },
    { id: "3", name: "Music", type: "folder", parent: null },
    { id: "4", name: "Videos", type: "folder", parent: null },
    { id: "5", name: "Downloads", type: "folder", parent: null },
    { id: "6", name: "notes.txt", type: "document", size: "4 KB", modified: "2023-04-15", parent: null },
    { id: "7", name: "profile.jpg", type: "image", size: "1.2 MB", modified: "2023-03-22", parent: null },
    { id: "8", name: "Project Ideas", type: "folder", parent: "1" },
    { id: "9", name: "Resume.pdf", type: "document", size: "256 KB", modified: "2023-04-10", parent: "1" },
    { id: "10", name: "Vacation", type: "folder", parent: "2" },
    { id: "11", name: "beach.jpg", type: "image", size: "3.5 MB", modified: "2023-02-15", parent: "10" },
    { id: "12", name: "mountains.jpg", type: "image", size: "2.8 MB", modified: "2023-02-15", parent: "10" },
    { id: "13", name: "favorite_song.mp3", type: "audio", size: "8.2 MB", modified: "2023-01-05", parent: "3" },
    { id: "14", name: "lecture.mp4", type: "video", size: "45.7 MB", modified: "2023-03-30", parent: "4" },
  ]

  // Get current directory files
  const currentFiles = files.filter((file) => file.parent === null)

  const getFileIcon = (type: string) => {
    switch (type) {
      case "folder":
        return <Folder className="h-5 w-5 text-yellow-400" />
      case "document":
        return <FileText className="h-5 w-5 text-blue-400" />
      case "image":
        return <ImageIcon className="h-5 w-5 text-green-400" />
      case "audio":
        return <Music className="h-5 w-5 text-purple-400" />
      case "video":
        return <Video className="h-5 w-5 text-red-400" />
      default:
        return <File className="h-5 w-5 text-gray-400" />
    }
  }

  const handleFileClick = (fileId: string) => {
    setSelectedFile(fileId === selectedFile ? null : fileId)
  }

  const handleFileDoubleClick = (file: FileItem) => {
    if (file.type === "folder") {
      setCurrentPath(`${currentPath}/${file.name}`)
    } else {
      // Open file in appropriate app (not implemented)
      console.log(`Opening file: ${file.name}`)
    }
  }

  const navigateUp = () => {
    const pathParts = currentPath.split("/")
    if (pathParts.length > 3) {
      // Don't go above /home/user
      pathParts.pop()
      setCurrentPath(pathParts.join("/"))
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="bg-slate-900 p-2 flex items-center space-x-2 border-b border-slate-700">
        <Button variant="ghost" size="sm" className="text-white" onClick={navigateUp}>
          <ArrowUp className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-white">
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Input value={currentPath} readOnly className="h-8 bg-slate-800 border-slate-700 text-white" />
      </div>

      {/* File Explorer Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 bg-slate-900 border-r border-slate-700 p-2 overflow-auto">
          <div className="mb-2 text-xs font-medium text-slate-400 uppercase">Quick Access</div>

          <div className="space-y-1">
            <div className="flex items-center px-2 py-1 rounded hover:bg-slate-800 cursor-pointer">
              <ChevronRight className="h-4 w-4 text-slate-400 mr-1" />
              <Folder className="h-4 w-4 text-yellow-400 mr-2" />
              <span className="text-white text-sm">Documents</span>
            </div>
            <div className="flex items-center px-2 py-1 rounded hover:bg-slate-800 cursor-pointer">
              <ChevronRight className="h-4 w-4 text-slate-400 mr-1" />
              <Folder className="h-4 w-4 text-yellow-400 mr-2" />
              <span className="text-white text-sm">Pictures</span>
            </div>
            <div className="flex items-center px-2 py-1 rounded hover:bg-slate-800 cursor-pointer">
              <ChevronRight className="h-4 w-4 text-slate-400 mr-1" />
              <Folder className="h-4 w-4 text-yellow-400 mr-2" />
              <span className="text-white text-sm">Music</span>
            </div>
            <div className="flex items-center px-2 py-1 rounded hover:bg-slate-800 cursor-pointer">
              <ChevronRight className="h-4 w-4 text-slate-400 mr-1" />
              <Folder className="h-4 w-4 text-yellow-400 mr-2" />
              <span className="text-white text-sm">Videos</span>
            </div>
            <div className="flex items-center px-2 py-1 rounded hover:bg-slate-800 cursor-pointer">
              <ChevronRight className="h-4 w-4 text-slate-400 mr-1" />
              <Folder className="h-4 w-4 text-yellow-400 mr-2" />
              <span className="text-white text-sm">Downloads</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-slate-800 overflow-auto p-2">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2">
            {currentFiles.map((file) => (
              <div
                key={file.id}
                className={`flex flex-col items-center p-2 rounded cursor-pointer ${
                  selectedFile === file.id ? "bg-slate-700" : "hover:bg-slate-700/50"
                }`}
                onClick={() => handleFileClick(file.id)}
                onDoubleClick={() => handleFileDoubleClick(file)}
              >
                <div className="w-16 h-16 flex items-center justify-center">{getFileIcon(file.type)}</div>
                <div className="mt-1 text-center text-white text-sm truncate w-full">{file.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-slate-900 border-t border-slate-700 p-2 text-xs text-slate-400 flex justify-between">
        <div>{currentFiles.length} items</div>
        <div>{selectedFile ? "1 item selected" : ""}</div>
      </div>
    </div>
  )
}
