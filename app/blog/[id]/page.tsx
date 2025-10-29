
// "use client"

// import type React from "react"
// import { useState } from "react"
// import { blogPosts } from "@/lib/data"
// import { Calendar, User, MessageCircle, Share2, Send } from "lucide-react"
// // 👇 Added the required import for Client Components
// import { useParams } from "next/navigation" 

// export default function BlogPostPage() {
//   // 👇 Safely access route parameters using the hook
//   const params = useParams()
//   // The 'id' parameter is accessed from the result of the hook
//   const postId = Array.isArray(params.id) ? params.id[0] : params.id
  
//   const post = blogPosts.find((p) => p.id === postId)
  
//   const [comments, setComments] = useState(post?.comments || [])
//   const [newComment, setNewComment] = useState("")
//   const [commentAuthor, setCommentAuthor] = useState("")

//   if (!post) {
//     return (
//       <div className="min-h-screen bg-muted py-12">
//         <div className="container-custom text-center">
//           <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
//           <p className="text-muted-foreground">The blog post you're looking for doesn't exist.</p>
//         </div>
//       </div>
//     )
//   }

//   const handleAddComment = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (newComment.trim() && commentAuthor.trim()) {
//       const comment = {
//         id: String(comments.length + 1),
//         author: commentAuthor,
//         text: newComment,
//         date: new Date().toISOString().split("T")[0],
//       }
//       setComments([...comments, comment])
//       setNewComment("")
//       setCommentAuthor("")
//     }
//   }

//   return (
//     <div className="min-h-screen bg-muted py-12">
//       <div className="container-custom max-w-3xl">
//         {/* Featured Image */}
//         <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden mb-8">
//           <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
//         </div>

//         {/* Main Content */}
//         <article className="bg-white rounded-lg shadow-md p-8 mb-8">
//           {/* Meta Information */}
//           <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-border text-sm text-muted-foreground">
//             <div className="flex items-center gap-2">
//               <User size={16} />
//               <span>{post.author}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Calendar size={16} />
//               <span>{new Date(post.date).toLocaleDateString()}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <MessageCircle size={16} />
//               <span>{comments.length} comments</span>
//             </div>
//           </div>

//           {/* Title */}
//           <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

//           {/* Content */}
//           <div className="prose prose-lg max-w-none mb-8 text-muted-foreground leading-relaxed">
//             <p>{post.content}</p>
//             <p>
//               This is a great opportunity to share your insights and connect with other professionals in the industry.
//               Feel free to leave your thoughts in the comments section below.
//             </p>
//           </div>

//           {/* Share Section */}
//           <div className="flex gap-4 py-6 border-t border-b border-border">
//             <button className="flex items-center gap-2 px-6 py-2 bg-muted hover:bg-border rounded-lg transition-colors font-semibold">
//               <Share2 size={16} />
//               Share on Facebook
//             </button>
//             <button className="flex items-center gap-2 px-6 py-2 bg-muted hover:bg-border rounded-lg transition-colors font-semibold">
//               <Share2 size={16} />
//               Share on Twitter
//             </button>
//           </div>
//         </article>

//         {/* Comments Section */}
//         <div className="bg-white rounded-lg shadow-md p-8">
//           <h2 className="text-2xl font-bold mb-8">Comments ({comments.length})</h2>

//           {/* Add Comment Form */}
//           <form onSubmit={handleAddComment} className="mb-8 pb-8 border-b border-border">
//             <h3 className="text-lg font-semibold mb-4">Leave a Comment</h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-semibold mb-2">Name *</label>
//                 <input
//                   type="text"
//                   value={commentAuthor}
//                   onChange={(e) => setCommentAuthor(e.target.value)}
//                   placeholder="Your name"
//                   className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold mb-2">Comment *</label>
//                 <textarea
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                   placeholder="Share your thoughts..."
//                   rows={4}
//                   className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-light transition-colors"
//               >
//                 <Send size={16} />
//                 Post Comment
//               </button>
//             </div>
//           </form>

//           {/* Comments List */}
//           <div className="space-y-6">
//             {comments.length > 0 ? (
//               comments.map((comment) => (
//                 <div key={comment.id} className="pb-6 border-b border-border last:border-b-0">
//                   <div className="flex items-center justify-between mb-2">
//                     <h4 className="font-semibold text-foreground">{comment.author}</h4>
//                     <span className="text-sm text-muted-foreground">{new Date(comment.date).toLocaleDateString()}</span>
//                   </div>
//                   <p className="text-muted-foreground">{comment.text}</p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-muted-foreground text-center py-8">No comments yet. Be the first to comment!</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client";

import type React from "react";
import { useState } from "react";
import { blogPosts } from "@/lib/data";
import {
  Calendar,
  User,
  MessageCircle,
  Share2,
  Send,
  ChevronDown,
} from "lucide-react";
import { useParams } from "next/navigation";

// --- Right Sidebar Placeholder (AD Blocks) ---
const RightSidebarPlaceholder: React.FC = () => {
  const adBlocks = [
    "AD SENSE 1 (160x600)",
    "AD SENSE 2 (160x600)",
    "AD SENSE 3 (160x600)",
  ];
  return (
    <aside className="flex flex-col gap-4 sticky top-4">
      {adBlocks.map((ad, index) => (
        <div
          key={index}
          className="bg-gray-100 text-gray-500 flex items-center justify-center p-4 border border-dashed border-gray-300 rounded-lg h-[250px] w-full max-w-[250px]"
        >
          {ad}
        </div>
      ))}
    </aside>
  );
};

export default function BlogPostPage() {
  const params = useParams();
  const postId = Array.isArray(params.id) ? params.id[0] : params.id;
  const post = blogPosts.find((p) => p.id === postId);

  const [comments, setComments] = useState(post?.comments || []);
  const [newComment, setNewComment] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Post Not Found</h1>
          <p className="text-gray-500">
            The blog post you’re looking for doesn’t exist.
          </p>
        </div>
      </div>
    );
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && commentAuthor.trim()) {
      const comment = {
        id: String(comments.length + 1),
        author: commentAuthor,
        text: newComment,
        date: new Date().toISOString().split("T")[0],
      };
      setComments([...comments, comment]);
      setNewComment("");
      setCommentAuthor("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      {/* Flex container instead of grid */}
      <div className="flex flex-col lg:flex-row justify-center gap-6 max-w-[1400px] mx-auto px-4">
        {/* LEFT SIDEBAR */}
        <aside className="bg-[#2C8845] text-white p-4 rounded-md sticky top-4 self-start w-full lg:w-[280px] flex-shrink-0 h-fit">
          <button className="w-full bg-white text-[#2C8845] font-bold py-2 rounded-md mb-4">
            All Blogs
          </button>

          {/* Blog Categories */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3">
              Blog Category
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                ["Technology", 5],
                ["Travel", 3],
                ["Education", 7],
                ["Business", 2],
              ].map(([cat, num]) => (
                <li
                  key={cat}
                  className="flex justify-between cursor-pointer hover:text-gray-200"
                >
                  {cat} <span>({num})</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Location Filter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3">
              Location (District)
            </h3>
            <div className="bg-[#24923F] rounded-md p-2">
              <div className="flex justify-between items-center cursor-pointer font-semibold">
                Dhaka Division
                <ChevronDown size={16} />
              </div>
              <ul className="pl-2 mt-2 space-y-1 text-sm">
                <li className="flex justify-between">
                  Dhaka <span>(2)</span>
                </li>
                <li className="flex justify-between">
                  Gazipur <span>(1)</span>
                </li>
                <li className="flex justify-between">
                  Narayanganj <span>(1)</span>
                </li>
                <li className="flex justify-between">
                  Munshiganj <span>(0)</span>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* MIDDLE CONTENT */}
        <main className="flex-1 min-w-0 bg-white rounded-lg shadow-md p-8">
          {/* Featured Image */}
          <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden mb-8">
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6 pb-4 border-b text-sm text-gray-500">
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
          <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
            <p>{post.content}</p>
            <p>
              This is a great opportunity to share your insights and connect
              with others in the community.
            </p>
          </div>

          {/* Share Buttons */}
          <div className="flex flex-wrap gap-4 py-4 border-t border-b">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md font-semibold text-gray-700">
              <Share2 size={16} />
              Share on Facebook
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md font-semibold text-gray-700">
              <Share2 size={16} />
              Share on Twitter
            </button>
          </div>

          {/* Comments Section */}
          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-6">
              Comments ({comments.length})
            </h2>

            {/* Add Comment */}
            <form
              onSubmit={handleAddComment}
              className="mb-8 pb-6 border-b border-gray-200"
            >
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  required
                />
                <textarea
                  placeholder="Write your comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm resize-none"
                  rows={4}
                  required
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 bg-[#2C8845] text-white rounded-md font-semibold hover:bg-green-700 transition"
                >
                  <Send size={16} />
                  Post Comment
                </button>
              </div>
            </form>

            {/* Display Comments */}
            <div className="space-y-6">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="pb-4 border-b border-gray-200 last:border-none"
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-gray-800">
                        {comment.author}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{comment.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </section>
        </main>

        {/* RIGHT SIDEBAR */}
        <div className="hidden lg:flex flex-col w-[250px] flex-shrink-0">
          <RightSidebarPlaceholder />
        </div>
      </div>
    </div>
  );
}
