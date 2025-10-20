"use client"

import { useState } from "react"
import Link from "next/link"
import { blogPosts } from "@/lib/data"
import { Calendar, User, MessageCircle, Share2 } from "lucide-react"
import NewBlogPostModal from "@/components/blog/new-blog-post-modal"

export default function BlogPage() {
  const [posts, setPosts] = useState(blogPosts)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleNewPost = (newPost: any) => {
    setPosts([newPost, ...posts])
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-muted py-12">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Read insights and stories from our community of business owners and professionals
          </p>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary">
            Write a Blog Post
          </button>
        </div>

        {/* New Post Modal */}
        <NewBlogPostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleNewPost} />

        {/* Blog Posts */}
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.id} className="card-base overflow-hidden hover:shadow-lg transition-shadow">
              {/* Featured Image */}
              <div className="relative h-64 bg-gray-200 overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
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
                    <span>{post.comments.length} comments</span>
                  </div>
                </div>

                {/* Title */}
                <Link href={`/blog/${post.id}`}>
                  <h2 className="text-2xl font-bold mb-4 hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                </Link>

                {/* Excerpt */}
                <p className="text-muted-foreground mb-6 line-clamp-3">{post.content}</p>

                {/* Actions */}
                <div className="flex gap-4">
                  <Link
                    href={`/blog/${post.id}`}
                    className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-light transition-colors"
                  >
                    Read More
                  </Link>
                  <button className="flex items-center gap-2 px-6 py-2 bg-muted hover:bg-border rounded-lg transition-colors font-semibold">
                    <Share2 size={16} />
                    Share
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
