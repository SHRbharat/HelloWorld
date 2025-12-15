import { Eye, ThumbsUp, ThumbsDown } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  hitBlogView,
  getBlogViews,
  hitBlogVote,
  getBlogVotes,
} from "../lib/counterApi";

export default function EngagementSection({ blogId }) {
  const [views, setViews] = useState(0);
  const [votes, setVotes] = useState({ up: 0, down: 0 });
  const [voted, setVoted] = useState(null); // 'up' | 'down' | null

  const votedKey = `helloworld_voted_blog_${blogId}`;

  useEffect(() => {
    if (!blogId) return;
    let mounted = true;

    async function fetchViews() {
      const key = `helloworld_viewed_blog_${blogId}`;
      const already = localStorage.getItem(key);

      const res = already
        ? await getBlogViews(blogId)
        : await hitBlogView(blogId);

      if (mounted) setViews(res);
      if (!already) localStorage.setItem(key, Date.now());
    }

    async function fetchVotes() {
      const res = await getBlogVotes(blogId);
      if (!mounted) return;

      setVotes({ up: res.up, down: res.down });

      const userVote = localStorage.getItem(votedKey);
      if (userVote === "up" || userVote === "down") {
        setVoted(userVote);
      }
    }

    fetchViews();
    fetchVotes();

    return () => (mounted = false);
  }, [blogId]);

  async function handleVote(type) {
    // Already voted
    if (voted === type) {
      toast.info("You have already voted");
      return;
    }

    // Prevent switching (API limitation)
    if (voted && voted !== type) {
      toast.warning("Changing vote is not supported");
      return;
    }

    try {
      const res = await hitBlogVote(blogId, type);

      // API success → update UI
      setVotes((prev) => ({
        ...prev,
        [type]: res.value,
      }));

      setVoted(type);
      localStorage.setItem(votedKey, type);
    } catch (e) {
      toast.error("Vote not counted. Please try again.");
    }
  }

  return (
    <div className="flex items-center gap-6 py-3 px-6 bg-card border border-border rounded-full shadow-sm">
      {/* Views */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <Eye size={18} />
        <span>{views}</span>
      </div>

      <div className="w-px h-4 bg-border" />

      {/* Upvote */}
      <button
        onClick={() => handleVote("up")}
        className={`flex items-center gap-2 transition-colors ${
          voted === "up"
            ? "text-green-600 font-bold"
            : "text-muted-foreground hover:text-green-500"
        }`}
      >
        <ThumbsUp size={18} />
        <span>{votes.up}</span>
      </button>

      <div className="w-px h-4 bg-border" />

      {/* Downvote */}
      <button
        onClick={() => handleVote("down")}
        className={`flex items-center gap-2 transition-colors ${
          voted === "down"
            ? "text-red-600 font-bold"
            : "text-muted-foreground hover:text-red-500"
        }`}
      >
        <ThumbsDown size={18} />
        <span>{votes.down}</span>
      </button>
    </div>
  );
}
