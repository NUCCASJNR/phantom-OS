"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Save, FileUp } from "lucide-react"

export default function NotepadApp() {
  const [content, setContent] = useState("")
  const [fileName, setFileName] = useState("Untitled.txt")
  const [isSaved, setIsSaved] = useState(true)

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    setIsSaved(false)
  }

  const handleSave = () => {
    // In a real app, this would save to the backend
    setIsSaved(true)
    console.log(`Saving file ${fileName} with content: ${content}`)
  }

  const handleNew = () => {
    if (!isSaved) {
      if (confirm("You have unsaved changes. Create new file anyway?")) {
        setContent("")
        setFileName("Untitled.txt")
        setIsSaved(true)
      }
    } else {
      setContent("")
      setFileName("Untitled.txt")
      setIsSaved(true)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="bg-slate-900 p-2 flex items-center space-x-2 border-b border-slate-700">
        <Button variant="ghost" size="sm" className="text-white" onClick={handleNew}>
          <FileUp className="h-4 w-4 mr-1" />
          New
        </Button>
        <Button variant="ghost" size="sm" className="text-white" onClick={handleSave}>
          <Save className="h-4 w-4 mr-1" />
          Save
        </Button>
        <div className="flex-1 text-center text-sm text-slate-400">
          {fileName} {!isSaved && "*"}
        </div>
      </div>

      {/* Editor */}
      <Textarea
        value={content}
        onChange={handleContentChange}
        className="flex-1 resize-none rounded-none border-0 bg-slate-800 text-white focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Start typing..."
      />
    </div>
  )
}
