import { Calendar, Clock, User } from "lucide-react";

export default function HeroSection({ post }) {
  return (
    <div className="mb-12 text-center max-w-3xl mx-auto">
      {/* Tags */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {post.tags?.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
        {post.title}
      </h1>

      {/* Meta Info */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="flex items-center justify-center gap-6 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
