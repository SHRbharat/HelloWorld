import React from "react";
import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  ChevronRight,
  ChevronLeft,
  List,
  Eye,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function cleanMarkdown(md) {
  if (!md) return "";

  // Remove YAML front‑matter block at the top (--- ... ---)
  // Handles \r\n and multiple lines
  const withoutFrontMatter = md.replace(/^---[\s\S]*?---\s*/, "");

  // Remove first H1 (# Heading) line
  // Handles optional leading spaces and CRLF
  const withoutFirstH1 = withoutFrontMatter.replace(/^\s*#\s+.*(\r?\n|$)/, "");

  return withoutFirstH1.trim();
}


export default function BlogPostContent({ post }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeId, setActiveId] = useState("");
  const [headings, setHeadings] = useState([]);

  // Extract headings from markdown
  useEffect(() => {
    if (!post.content) return;
    const regex = /^(#{2,3})\s+(.*)$/gm;
    const found = [];
    let match;
    while ((match = regex.exec(post.content)) !== null) {
      const level = match[1].length; // ## => 2, ### => 3
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/\s+/g, "-");
      found.push({ id, text, level });
    }
    setHeadings(found);
  }, [post.content]);

  // Scroll spy
  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66%" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
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
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta Info & Stats */}
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

          {/* Engagement Stats */}
          <div className="flex items-center gap-6 py-3 px-6 bg-card border border-border rounded-full shadow-sm">
            <div
              className="flex items-center gap-2 text-muted-foreground"
              title="Views"
            >
              <Eye size={18} />
              <span className="font-medium">1.2k</span>
            </div>
            <div className="w-px h-4 bg-border"></div>
            <button
              className="flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-colors"
              title="Upvote"
            >
              <ThumbsUp size={18} />
              <span className="font-medium">245</span>
            </button>
            <div className="w-px h-4 bg-border"></div>
            <button
              className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors"
              title="Downvote"
            >
              <ThumbsDown size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="mb-16 rounded-2xl overflow-hidden shadow-lg aspect-video relative">
        <img
          src={post.coverImage || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-12 relative">
        {/* Main Content Area */}
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "lg:mr-[300px]" : ""
          }`}
        >
          {/* <article className="prose prose-lg dark:prose-invert max-w-none"> */}
          <article className="markdown-body prose dark:prose-invert max-w-none p-6 sm:p-8 shadow-sm">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ node, children, ...props }) => {
                  const text = React.Children.toArray(children).join(" ");
                  const id = text.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <h2 id={id} className="scroll-mt-24" {...props}>
                      {children}
                    </h2>
                  );
                },
                h3: ({ node, children, ...props }) => {
                  const text = React.Children.toArray(children).join(" ");
                  const id = text.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <h3 id={id} className="scroll-mt-24" {...props}>
                      {children}
                    </h3>
                  );
                },
              }}
            >
              {cleanMarkdown(post.content)}
            </ReactMarkdown>
          </article>
        </div>

        {/* sidebar */}
        <aside
          className={`
            fixed top-24 right-0 h-[calc(100vh-6rem)] z-40 transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
            lg:translate-x-0 lg:static lg:h-auto lg:block
            ${!isSidebarOpen && "lg:hidden"} 
          `}
          style={{ width: "300px" }}
        >
          {/* Toggle Button (Mobile/Tablet only or when collapsed) */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`
              absolute top-0 -left-10 p-2 bg-card border border-border rounded-l-lg shadow-md
              hover:bg-accent transition-colors lg:hidden
            `}
            aria-label="Toggle Table of Contents"
          >
            {isSidebarOpen ? <ChevronRight size={20} /> : <List size={20} />}
          </button>

          {/* Sidebar Content */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm h-full overflow-y-auto lg:sticky lg:top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Table of Contents</h3>
              {/* Desktop Collapse Button */}
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="hidden lg:block p-1 hover:bg-accent rounded-md text-muted-foreground"
                title="Hide Sidebar"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <nav className="space-y-1">
              {headings.map((heading) => (
                <button
                  key={heading.id}
                  onClick={() => scrollToHeading(heading.id)}
                  className={`
                    block w-full text-left text-sm py-2 px-3 rounded-md transition-colors
                    ${heading.level === 3 ? "pl-6" : ""}
                    ${
                      activeId === heading.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }
                  `}
                >
                  {heading.text}
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t border-border">
              <h4 className="font-semibold text-sm mb-4">Share this article</h4>
              <div className="flex gap-2">
                {["Twitter", "LinkedIn", "Facebook"].map((platform) => (
                  <button
                    key={platform}
                    className="px-3 py-1.5 text-xs font-medium bg-background border border-border rounded-md hover:bg-accent transition-colors"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Re-open button */}
        {!isSidebarOpen && (
          <div className="hidden lg:block fixed top-24 right-8 z-40">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-3 bg-card border border-border rounded-full shadow-md hover:bg-accent transition-colors group"
              title="Show Table of Contents"
            >
              <ChevronLeft
                size={20}
                className="text-muted-foreground group-hover:text-foreground"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
