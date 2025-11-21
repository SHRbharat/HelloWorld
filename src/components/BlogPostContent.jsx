import React, { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import BlogHeroSection from "./BlogHeroSection";
import EngagementSection from "./EngagementSection";
import Sidebar from "./Sidebar";

function cleanMarkdown(md) {
  if (!md) return "";

  //remove meta-data and first heading from markdown
  const withoutFrontMatter = md.replace(/^---[\s\S]*?---\s*/, "");
  const withoutFirstH1 = withoutFrontMatter.replace(/^\s*#\s+.*(\r?\n|$)/, "");
  return withoutFirstH1.trim();
}

export default function BlogPostContent({ post }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeId, setActiveId] = useState("");
  const [headings, setHeadings] = useState([]);

  // Extract headings
  useEffect(() => {
    if (!post.content) return;
    const regex = /^(#{2,3})\s+(.*)$/gm;
    const found = [];
    let match;
    while ((match = regex.exec(post.content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/\s+/g, "-");
      found.push({ id, text, level });
    }
    setHeadings(found);
  }, [post.content]);

  // Scroll 
  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-100px 0px -66%" }
    );
    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <BlogHeroSection post={post} />

      {/* Engagement Section */}
      <div className="flex justify-center mb-8">
        <EngagementSection blogId={post.id} />
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
        {/* Main Content */}
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "lg:mr-[300px]" : ""
          }`}
        >
          <article className="markdown-body prose dark:prose-invert max-w-none p-6 sm:p-8 shadow-sm">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children, ...props }) => {
                  const text = React.Children.toArray(children).join(" ");
                  const id = text.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <h2 id={id} className="scroll-mt-24" {...props}>
                      {children}
                    </h2>
                  );
                },
                h3: ({ children, ...props }) => {
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

        {/* Sidebar */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          headings={headings}
          activeId={activeId}
          scrollToHeading={scrollToHeading}
        />

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
