import { Eye, ThumbsUp, ThumbsDown } from "lucide-react";
import { useEffect, useState } from "react";
import { hitBlogView, getBlogViews } from "../../api/counterApi";

export default function EngagementSection({ blogId }) {
  const [views, setViews] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (!blogId) return;

    async function fetchViews() {
      try {
        const key = `viewed_blog_${blogId}`;
        const already = localStorage.getItem(key);
        if (!already) {
          const res = await hitBlogView(blogId);
          if (mounted) setViews(res?.value ?? 0);
          localStorage.setItem(key, Date.now());
        } else {
          const res = await getBlogViews(blogId);
          if (mounted) setViews(res?.value ?? 0);
        }
      } catch (e) {
        console.error(e);
      }
    }

    fetchViews();
    return () => (mounted = false);
  }, [blogId]);

  return (
    <div className="flex items-center gap-6 py-3 px-6 bg-card border border-border rounded-full shadow-sm">
      {/* Views */}
      <div className="flex items-center gap-2 text-muted-foreground" title="Views">
        <Eye size={18} />
        <span className="font-medium">{views !== null ? new Intl.NumberFormat().format(views) : 'no views'}</span>
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
