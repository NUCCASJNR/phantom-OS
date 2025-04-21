"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Circle, Square, Pencil, Eraser, Save, Trash2, Palette } from "lucide-react"

export default function PaintApp() {
  const [color, setColor] = useState("#ffffff")
  const [brushSize, setBrushSize] = useState(5)
  const [tool, setTool] = useState<"pencil" | "eraser" | "circle" | "rectangle">("pencil")
  const [isDrawing, setIsDrawing] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Get context
    const context = canvas.getContext("2d")
    if (!context) return

    // Configure context
    context.lineCap = "round"
    context.lineJoin = "round"
    context.strokeStyle = color
    context.lineWidth = brushSize

    // Fill with black background
    context.fillStyle = "#000000"
    context.fillRect(0, 0, canvas.width, canvas.height)

    contextRef.current = context
  }, [])

  // Update context when color or brush size changes
  useEffect(() => {
    if (!contextRef.current) return
    contextRef.current.strokeStyle = tool === "eraser" ? "#000000" : color
    contextRef.current.lineWidth = brushSize
  }, [color, brushSize, tool])

  const startDrawing = (e: React.MouseEvent) => {
    if (!contextRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (tool === "pencil" || tool === "eraser") {
      contextRef.current.beginPath()
      contextRef.current.moveTo(x, y)
      setIsDrawing(true)
    } else {
      setStartPos({ x, y })
      setIsDrawing(true)
    }
  }

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !contextRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (tool === "pencil" || tool === "eraser") {
      contextRef.current.lineTo(x, y)
      contextRef.current.stroke()
    }
  }

  const finishDrawing = (e: React.MouseEvent) => {
    if (!isDrawing || !contextRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (tool === "pencil" || tool === "eraser") {
      contextRef.current.closePath()
    } else if (tool === "circle") {
      const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2))
      contextRef.current.beginPath()
      contextRef.current.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI)
      contextRef.current.stroke()
    } else if (tool === "rectangle") {
      const width = x - startPos.x
      const height = y - startPos.y
      contextRef.current.strokeRect(startPos.x, startPos.y, width, height)
    }

    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const context = contextRef.current
    if (!canvas || !context) return

    context.fillStyle = "#000000"
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  const saveDrawing = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // In a real app, this would save to the backend or download
    const dataUrl = canvas.toDataURL("image/png")
    console.log("Saving drawing:", dataUrl.substring(0, 50) + "...")
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="bg-slate-900 p-2 flex items-center space-x-2 border-b border-slate-700">
        <Button
          variant={tool === "pencil" ? "default" : "ghost"}
          size="sm"
          className="text-white"
          onClick={() => setTool("pencil")}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant={tool === "eraser" ? "default" : "ghost"}
          size="sm"
          className="text-white"
          onClick={() => setTool("eraser")}
        >
          <Eraser className="h-4 w-4" />
        </Button>
        <Button
          variant={tool === "circle" ? "default" : "ghost"}
          size="sm"
          className="text-white"
          onClick={() => setTool("circle")}
        >
          <Circle className="h-4 w-4" />
        </Button>
        <Button
          variant={tool === "rectangle" ? "default" : "ghost"}
          size="sm"
          className="text-white"
          onClick={() => setTool("rectangle")}
        >
          <Square className="h-4 w-4" />
        </Button>

        <div className="h-6 border-l border-slate-700 mx-1" />

        <div className="flex items-center space-x-2">
          <Palette className="h-4 w-4 text-white" />
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-6 h-6 p-0 border-0"
          />
        </div>

        <div className="flex items-center space-x-2 ml-2">
          <span className="text-xs text-white">Size:</span>
          <Slider
            value={[brushSize]}
            min={1}
            max={30}
            step={1}
            onValueChange={(value) => setBrushSize(value[0])}
            className="w-24"
          />
        </div>

        <div className="flex-1" />

        <Button variant="ghost" size="sm" className="text-white" onClick={saveDrawing}>
          <Save className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-white" onClick={clearCanvas}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-hidden">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={finishDrawing}
          onMouseLeave={finishDrawing}
          className="w-full h-full cursor-crosshair"
        />
      </div>
    </div>
  )
}
