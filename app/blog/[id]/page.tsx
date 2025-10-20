"use client"

import type React from "react"

import { useState } from "react"
import { blogPosts } from "@/lib/data"
import { Calendar, User, MessageCircle, Share2, Send } from "lucide-react"

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find((p) => p.id === params.id)
  const [comments, setComments] = useState(post?.comments || [])
  const [newComment, setNewComment] = useState("")
  const [commentAuthor, setCommentAuthor] = useState("")

  if (!post) {
    return (
      <div className="min-h-screen bg-muted py-12">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground">The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim() && commentAuthor.trim()) {
      const comment = {
        id: String(comments.length + 1),
        author: commentAuthor,
        text: newComment,
        date: new Date().toISOString().split("T")[0],
      }
      setComments([...comments, comment])
      setNewComment("")
      setCommentAuthor("")
    }
  }

  return (
    <div className="min-h-screen bg-muted py-12">
      <div className="container-custom max-w-3xl">
        {/* Featured Image */}
        <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden mb-8">
          <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Main Content */}
        <article className="bg-white rounded-lg shadow-md p-8 mb-8">
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-border text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle size={16} />
              <span>{comments.length} comments</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-8 text-muted-foreground leading-relaxed">
            <p>{post.content}</p>
            <p>
              This is a great opportunity to share your insights and connect with other professionals in the industry.
              Feel free to leave your thoughts in the comments section below.
            </p>
          </div>

          {/* Share Section */}
          <div className="flex gap-4 py-6 border-t border-b border-border">
            <button className="flex items-center gap-2 px-6 py-2 bg-muted hover:bg-border rounded-lg transition-colors font-semibold">
              <Share2 size={16} />
              Share on Facebook
            </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-muted hover:bg-border rounded-lg transition-colors font-semibold">
              <Share2 size={16} />
              Share on Twitter
            </button>
          </div>
        </article>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-8">Comments ({comments.length})</h2>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="mb-8 pb-8 border-b border-border">
            <h3 className="text-lg font-semibold mb-4">Leave a Comment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Name *</label>
                <input
                  type="text"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Comment *</label>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-light transition-colors"
              >
                <Send size={16} />
                Post Comment
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="pb-6 border-b border-border last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{comment.author}</h4>
                    <span className="text-sm text-muted-foreground">{new Date(comment.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-muted-foreground">{comment.text}</p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-8">No comments yet. Be the first to comment!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
