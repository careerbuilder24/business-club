"use client"

import type React from "react"

import { useState } from "react"
import { Bold, Italic, AlignLeft, AlignCenter, AlignRight } from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (content: string) => void
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)

  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value)
  }

  const handleEditorChange = (e: React.FormEvent<HTMLDivElement>) => {
    onChange(e.currentTarget.innerHTML)
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-muted border-b border-border p-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            applyFormat("bold")
            setIsBold(!isBold)
          }}
          className={`p-2 rounded hover:bg-border transition-colors ${isBold ? "bg-primary text-white" : ""}`}
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onClick={() => {
            applyFormat("italic")
            setIsItalic(!isItalic)
          }}
          className={`p-2 rounded hover:bg-border transition-colors ${isItalic ? "bg-primary text-white" : ""}`}
          title="Italic"
        >
          <Italic size={18} />
        </button>

        <div className="w-px bg-border mx-1"></div>

        <button
          type="button"
          onClick={() => applyFormat("justifyLeft")}
          className="p-2 rounded hover:bg-border transition-colors"
          title="Align Left"
        >
          <AlignLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => applyFormat("justifyCenter")}
          className="p-2 rounded hover:bg-border transition-colors"
          title="Align Center"
        >
          <AlignCenter size={18} />
        </button>
        <button
          type="button"
          onClick={() => applyFormat("justifyRight")}
          className="p-2 rounded hover:bg-border transition-colors"
          title="Align Right"
        >
          <AlignRight size={18} />
        </button>
      </div>

      {/* Editor */}
      <div
        contentEditable
        onInput={handleEditorChange}
        className="min-h-64 p-4 focus:outline-none text-foreground bg-white"
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  )
}
