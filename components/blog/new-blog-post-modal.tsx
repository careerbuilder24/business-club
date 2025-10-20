"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface NewBlogPostModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (post: any) => void
}

export default function NewBlogPostModal({ isOpen, onClose, onSubmit }: NewBlogPostModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newPost = {
      id: String(Date.now()),
      title: formData.title,
      author: formData.author,
      date: new Date().toISOString().split("T")[0],
      image: "/blog-post.jpg",
      content: formData.content,
      comments: [],
    }
    onSubmit(newPost)
    setFormData({ title: "", author: "", content: "" })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-white">
          <h2 className="text-2xl font-bold">Write a Blog Post</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog post title"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Author Name *</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Content *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog post content here..."
              rows={6}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-light transition-colors"
            >
              Publish Post
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-muted text-foreground px-6 py-2 rounded-lg font-semibold hover:bg-border transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
