import { useState } from 'react'
import { User, MessageSquare, Reply, ThumbsUp } from 'lucide-react'

const initialComments = [
  {
    id: 1,
    author: "Shivam Ray",
    date: "Oct 16, 2025",
    content: "This is a great explanation of Server Components! I've been struggling to understand the difference between RSC and SSR. The bundle size benefit is huge.",
    likes: 12,
    replies: [
      {
        id: 2,
        author: "Dinehs",
        date: "Oct 16, 2025",
        content: "Glad you found it helpful, Alex! The zero bundle size for server-only dependencies is indeed a game changer.",
        likes: 4,
        replies: []
      }
    ]
  },
  {
    id: 3,
    author: "Aman",
    date: "Oct 17, 2025",
    content: "How does this affect authentication? Do we need to change how we handle sessions?",
    likes: 8,
    replies: []
  }
]

export default function CommentsSection() {
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment = {
      id: Date.now(),
      author: "Guest User",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      content: newComment,
      likes: 0,
      replies: []
    }

    setComments([comment, ...comments])
    setNewComment('')
  }

  const CommentItem = ({ comment, isReply = false }) => (
    <div className={`flex gap-4 ${isReply ? 'ml-12 mt-4' : 'mt-6'}`}>
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <User size={20} />
        </div>
      </div>
      <div className="flex-1">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-sm">{comment.author}</h4>
            <span className="text-xs text-muted-foreground">{comment.date}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{comment.content}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <button className="flex items-center gap-1 hover:text-primary transition-colors">
              <ThumbsUp size={14} />
              <span>{comment.likes}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-primary transition-colors">
              <Reply size={14} />
              <span>Reply</span>
            </button>
          </div>
        </div>
        {comment.replies && comment.replies.length > 0 && (
          <div className="space-y-4">
            {comment.replies.map(reply => (
              <CommentItem key={reply.id} comment={reply} isReply={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="py-8 border-t border-border">
      <div className="flex items-center gap-2 mb-8">
        <MessageSquare className="text-primary" size={24} />
        <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-10">
        <div className="mb-4">
          <label htmlFor="comment" className="sr-only">Add a comment</label>
          <textarea
            id="comment"
            rows={4}
            className="w-full p-4 rounded-xl bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post Comment
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}
