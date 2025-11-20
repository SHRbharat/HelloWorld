import { Eye, ThumbsUp, ThumbsDown } from "lucide-react";

export default function EngagementSection() {
  return (
    <div className="flex items-center gap-6 py-3 px-6 bg-card border border-border rounded-full shadow-sm">
      {/* Views */}
      <div className="flex items-center gap-2 text-muted-foreground" title="Views">
        <Eye size={18} />
        <span className="font-medium">1.2k</span>
      </div>

      <div className="w-px h-4 bg-border"></div>

      {/* Upvote */}
      <button
        className="flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-colors"
        title="Upvote"
      >
        <ThumbsUp size={18} />
        <span className="font-medium">245</span>
      </button>

      <div className="w-px h-4 bg-border"></div>

      {/* Downvote */}
      <button
        className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors"
        title="Downvote"
      >
        <ThumbsDown size={18} />
      </button>
    </div>
  );
}
