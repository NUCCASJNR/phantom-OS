"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import type { AppWindow } from "@/types/app-window"
import { Maximize2, Minimize2, X } from "lucide-react"

interface AppWindowProps {
  window: AppWindow
  isActive: boolean
  children: React.ReactNode
  onClose: (windowId: string) => void
  onMinimize: (windowId: string) => void
  onMaximize: (windowId: string) => void
  onActivate: (windowId: string) => void
  onUpdatePosition: (windowId: string, position: { x: number; y: number }) => void
  onUpdateSize: (windowId: string, size: { width: number; height: number }) => void
}

export default function AppWindowComponent({
  window,
  isActive,
  children,
  onClose,
  onMinimize,
  onMaximize,
  onActivate,
  onUpdatePosition,
  onUpdateSize,
}: AppWindowProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [resizeDirection, setResizeDirection] = useState<string | null>(null)
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 })
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 })
  const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 })

  const windowRef = useRef<HTMLDivElement>(null)

  // Handle window activation on click
  const handleWindowClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isActive) {
      onActivate(window.id)
    }
  }

  // Start dragging the window
  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Only allow dragging from the title bar
    if (!(e.target as HTMLElement).closest(".window-titlebar")) return

    setIsDragging(true)
    setDragOffset({
      x: e.clientX - window.position.x,
      y: e.clientY - window.position.y,
    })

    // Activate window if not already active
    if (!isActive) {
      onActivate(window.id)
    }
  }

  // Start resizing the window
  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.preventDefault()
    e.stopPropagation()

    setIsResizing(true)
    setResizeDirection(direction)
    setInitialSize({
      width: window.size.width,
      height: window.size.height,
    })
    setInitialPosition({
      x: window.position.x,
      y: window.position.y,
    })
    setInitialMousePosition({
      x: e.clientX,
      y: e.clientY,
    })

    // Activate window if not already active
    if (!isActive) {
      onActivate(window.id)
    }
  }

  // Handle mouse movement for dragging and resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x
        const newY = e.clientY - dragOffset.y

        // Ensure window stays within viewport
        const maxX = window.innerWidth - 100
        const maxY = window.innerHeight - 100

        onUpdatePosition(window.id, {
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY)),
        })
      } else if (isResizing && resizeDirection) {
        const deltaX = e.clientX - initialMousePosition.x
        const deltaY = e.clientY - initialMousePosition.y

        let newWidth = initialSize.width
        let newHeight = initialSize.height
        let newX = initialPosition.x
        let newY = initialPosition.y

        // Handle different resize directions
        if (resizeDirection.includes("e")) {
          newWidth = Math.max(200, initialSize.width + deltaX)
        }
        if (resizeDirection.includes("s")) {
          newHeight = Math.max(100, initialSize.height + deltaY)
        }
        if (resizeDirection.includes("w")) {
          newWidth = Math.max(200, initialSize.width - deltaX)
          newX = initialPosition.x + initialSize.width - newWidth
        }
        if (resizeDirection.includes("n")) {
          newHeight = Math.max(100, initialSize.height - deltaY)
          newY = initialPosition.y + initialSize.height - newHeight
        }

        onUpdateSize(window.id, { width: newWidth, height: newHeight })
        if (resizeDirection.includes("w") || resizeDirection.includes("n")) {
          onUpdatePosition(window.id, { x: newX, y: newY })
        }
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
      setResizeDirection(null)
    }

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [
    isDragging,
    isResizing,
    dragOffset,
    resizeDirection,
    initialSize,
    initialPosition,
    initialMousePosition,
    window.id,
    onUpdatePosition,
    onUpdateSize,
  ])

  // Double-click on title bar to maximize/restore
  const handleTitleDoubleClick = () => {
    onMaximize(window.id)
  }

  if (window.isMinimized) {
    return null
  }

  const windowStyle = window.isMaximized
    ? {
        top: 0,
        left: 0,
        width: "100%",
        height: "calc(100% - 48px)", // Account for taskbar
        transform: "none",
        borderRadius: 0,
      }
    : {
        top: `${window.position.y}px`,
        left: `${window.position.x}px`,
        width: `${window.size.width}px`,
        height: `${window.size.height}px`,
        zIndex: window.zIndex,
      }

  return (
    <div
      ref={windowRef}
      className={`absolute bg-slate-800 border border-slate-700 shadow-xl rounded-lg overflow-hidden flex flex-col pointer-events-auto ${
        isActive ? "ring-1 ring-slate-500" : "opacity-90"
      }`}
      style={windowStyle}
      onClick={handleWindowClick}
    >
      {/* Title Bar */}
      <div
        className="window-titlebar h-9 bg-slate-900 flex items-center justify-between px-3 cursor-move"
        onMouseDown={handleDragStart}
        onDoubleClick={handleTitleDoubleClick}
      >
        <div className="text-white font-medium truncate">{window.title}</div>
        <div className="flex items-center space-x-2">
          <button
            className="text-slate-400 hover:text-white focus:outline-none"
            onClick={(e) => {
              e.stopPropagation()
              onMinimize(window.id)
            }}
          >
            <Minimize2 className="h-4 w-4" />
          </button>
          <button
            className="text-slate-400 hover:text-white focus:outline-none"
            onClick={(e) => {
              e.stopPropagation()
              onMaximize(window.id)
            }}
          >
            <Maximize2 className="h-4 w-4" />
          </button>
          <button
            className="text-slate-400 hover:text-red-500 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation()
              onClose(window.id)
            }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto bg-slate-800">{children}</div>

      {/* Resize Handles (only when not maximized) */}
      {!window.isMaximized && (
        <>
          <div
            className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize"
            onMouseDown={(e) => handleResizeStart(e, "nw")}
          />
          <div
            className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize"
            onMouseDown={(e) => handleResizeStart(e, "ne")}
          />
          <div
            className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize"
            onMouseDown={(e) => handleResizeStart(e, "sw")}
          />
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize"
            onMouseDown={(e) => handleResizeStart(e, "se")}
          />
          <div
            className="absolute top-0 left-3 right-3 h-1 cursor-n-resize"
            onMouseDown={(e) => handleResizeStart(e, "n")}
          />
          <div
            className="absolute bottom-0 left-3 right-3 h-1 cursor-s-resize"
            onMouseDown={(e) => handleResizeStart(e, "s")}
          />
          <div
            className="absolute left-0 top-3 bottom-3 w-1 cursor-w-resize"
            onMouseDown={(e) => handleResizeStart(e, "w")}
          />
          <div
            className="absolute right-0 top-3 bottom-3 w-1 cursor-e-resize"
            onMouseDown={(e) => handleResizeStart(e, "e")}
          />
        </>
      )}
    </div>
  )
}
