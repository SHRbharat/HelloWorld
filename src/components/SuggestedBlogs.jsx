import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";

export default function SuggestedBlogs() {
  // Mock data 
  const suggestedBlogs = [
    {
      id: 1,
      title: "Mastering TypeScript Generics",
      date: "2024-11-12",
      category: "TypeScript",
      image: "/typescript-code.png",
      href: "mastering-typescript-generics",
    },
    {
      id: 2,
      title: "Web Performance Optimization Guide",
      date: "2024-11-08",
      category: "Performance",
      image: "/web-performance-concept.png",
      href: "web-performance-optimization",
    },
    {
      id: 3,
      title: "Building Scalable Node.js APIs",
      date: "2024-11-05",
      category: "Backend",
      image: "/nodejs-backend.png",
      href: "building-scalable-apis",
    },
    {
      id: 4,
      title: "CSS Grid vs Flexbox: When to Use What",
      date: "2024-10-30",
      category: "CSS",
      image: "/css-layout-diagram.png",
      href: "css-grid-vs-flexbox",
    },
  ];

  return (
    <div className="mt-16 pt-10 border-t border-border">
      <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <span className="w-1 h-8 bg-cyan-500 rounded-full inline-block"></span>
        Suggested for You
      </h3>

      <div className="grid gap-6 max-w-3xl">
        {suggestedBlogs.map((blog) => (
          <Link
            key={blog.id}
            to={`/blogs/${blog.href}`} 
            className="group flex flex-col sm:flex-row gap-4 bg-card p-3 rounded-xl border border-border hover:border-cyan-500/50 transition-all hover:shadow-md hover:bg-accent/5"
          >
            {/* Image Container */}
            <div className="w-full sm:w-48 h-32 sm:h-28 flex-shrink-0 overflow-hidden rounded-lg relative">
              <img
                src={blog.image || "/placeholder.svg"}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-2 left-2">
                <span className="px-2 py-0.5 text-[10px] font-bold bg-background/90 backdrop-blur-sm text-foreground rounded-full shadow-sm">
                  {blog.category}
                </span>
              </div>
            </div>

            {/* Content Container */}
            <div className="flex flex-col justify-center flex-grow min-w-0">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <Calendar size={12} />
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>

              <h4 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-cyan-600 transition-colors">
                {blog.title}
              </h4>

              <div className="flex items-center text-xs font-medium text-cyan-600 mt-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                Read Article <ArrowRight size={12} className="ml-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
