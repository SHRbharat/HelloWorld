import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogsList({
  blogs,
  searchQuery,
  setSearchQuery,
  selectedCategories,
  setSelectedCategories,
}) {
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link key={blog.id} to={`/blogs/${blog.id}`} className="block h-full">
          <article
            className="group h-full flex flex-col bg-card rounded-2xl overflow-hidden border border-border hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={blog.coverImage || blog.image || "/placeholder.svg"}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 text-xs font-bold bg-background/90 backdrop-blur-sm text-foreground rounded-full shadow-sm">
                  {blog.category}
                </span>
              </div>
            </div>

            <div className="flex-1 p-6 flex flex-col">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <Calendar size={14} />
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-cyan-600 transition-colors">
                {blog.title}
              </h3>

              <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
                {blog.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                <span className="text-sm font-medium text-muted-foreground">
                  {blog.author}
                </span>
                <span className="flex items-center gap-1 text-sm font-semibold text-cyan-600 group-hover:gap-2 transition-all">
                  Read More <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </article>
          </Link>
        ))}
      </div>

      {blogs.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">
            No articles found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategories(["All"]);
            }}
            className="mt-4 text-cyan-600 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
