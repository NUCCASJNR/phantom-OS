"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"

interface CommandHistory {
  command: string
  output: string
}

export default function TerminalApp() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "",
      output: "Phantom OS Terminal v1.0\nType 'help' to see available commands.\n",
    },
  ])
  const [currentDir, setCurrentDir] = useState("/home/user")

  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Focus input when terminal is clicked
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand()
    }
  }

  const executeCommand = () => {
    if (!input.trim()) return

    const command = input.trim()
    let output = ""

    // Process command
    if (command === "help") {
      output = `
Available commands:
  help        - Show this help message
  clear       - Clear the terminal
  ls          - List directory contents
  cd [dir]    - Change directory
  pwd         - Print working directory
  echo [text] - Display text
  date        - Show current date and time
  whoami      - Show current user
  exit        - Close terminal
`
    } else if (command === "clear") {
      setHistory([])
      setInput("")
      return
    } else if (command === "ls") {
      output = "Documents  Downloads  Pictures  Music  Videos  .config"
    } else if (command.startsWith("cd ")) {
      const dir = command.substring(3)
      if (dir === "..") {
        if (currentDir !== "/") {
          const parts = currentDir.split("/")
          parts.pop()
          setCurrentDir(parts.join("/") || "/")
          output = ""
        } else {
          output = "Already at root directory"
        }
      } else if (dir === "~") {
        setCurrentDir("/home/user")
        output = ""
      } else {
        setCurrentDir(currentDir === "/" ? `/${dir}` : `${currentDir}/${dir}`)
        output = ""
      }
    } else if (command === "pwd") {
      output = currentDir
    } else if (command.startsWith("echo ")) {
      output = command.substring(5)
    } else if (command === "date") {
      output = new Date().toString()
    } else if (command === "whoami") {
      output = "user"
    } else if (command === "exit") {
      output = "Use the window close button to exit the terminal."
    } else {
      output = `Command not found: ${command}. Type 'help' for available commands.`
    }

    setHistory((prev) => [...prev, { command, output }])
    setInput("")
  }

  return (
    <div
      className="h-full bg-black text-green-400 p-2 font-mono text-sm overflow-auto"
      ref={terminalRef}
      onClick={focusInput}
    >
      {/* Command History */}
      {history.map((item, index) => (
        <div key={index} className="mb-2">
          {item.command && (
            <div className="flex">
              <span className="text-blue-400">{currentDir}</span>
              <span className="text-white mx-1">$</span>
              <span>{item.command}</span>
            </div>
          )}
          <div className="whitespace-pre-wrap">{item.output}</div>
        </div>
      ))}

      {/* Current Input */}
      <div className="flex items-center">
        <span className="text-blue-400">{currentDir}</span>
        <span className="text-white mx-1">$</span>
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none text-green-400 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-6"
          autoFocus
        />
      </div>
    </div>
  )
}
