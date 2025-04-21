"use client"

import { useEffect, useState } from "react"
import { GhostIcon } from "lucide-react"

export default function BootScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-black text-white">
      <GhostIcon className="h-24 w-24 mb-8 animate-pulse" />
      <h1 className="text-4xl font-bold mb-8">Phantom OS</h1>

      <div className="w-64 h-2 bg-gray-800 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-sm text-gray-400">
        {progress < 30 && "Initializing system..."}
        {progress >= 30 && progress < 60 && "Loading core components..."}
        {progress >= 60 && progress < 90 && "Preparing desktop environment..."}
        {progress >= 90 && "Starting Phantom OS..."}
      </div>
    </div>
  )
}
