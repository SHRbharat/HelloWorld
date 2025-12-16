import React, { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import BlogHeroSection from "./BlogHeroSection";
import EngagementSection from "./EngagementSection";
import Sidebar from "./Sidebar";

import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function cleanMarkdown(md) {
  if (!md) return "";

  //remove meta-data and first heading from markdown
  const withoutFrontMatter = md.replace(/^---[\s\S]*?---\s*/, "");
  const withoutFirstH1 = withoutFrontMatter.replace(/^\s*#\s+.*(\r?\n|$)/, "");
  return withoutFirstH1.trim();
}

export default function BlogPostContent({ post }) {
  //mobile,tablet : false ; pc : true
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(min-width: 1024px)").matches;
  });
  const [activeId, setActiveId] = useState("");
  const [headings, setHeadings] = useState([]);

  // Handle resize to toggle sidebar
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");

    const handleChange = (e) => {
      setIsSidebarOpen(e.matches);
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

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
        // get all visible headings
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-120px 0px -60%",
        threshold: [0, 1],
      }
    );

    // delay to ensure markdown is rendered
    const timeout = setTimeout(() => {
      headings.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 0);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [headings]);

  const scrollToHeading = (id) => {
    const el = document.getElementById(id);
    if (el) {
      setActiveId(id);
      el.scrollIntoView({ behavior: "smooth" });
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

      {/* <div className="flex flex-col lg:flex-row gap-12 relative"> */}
      <div className="relative flex flex-col lg:flex-row lg:items-start gap-12">
        {/* Main Content */}
        {/* <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "lg:mr-[300px]" : ""
          }`}
        > */}
        <div className="flex-1 min-w-0 transition-all duration-300">
          <article className="markdown-body prose dark:prose-invert max-w-none p-1 sm:p-8 shadow-sm">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
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
                //arrow function style syntax
                h3: ({ children, ...props }) => {
                  const text = React.Children.toArray(children).join(" ");
                  const id = text.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <h3 id={id} className="scroll-mt-24" {...props}>
                      {children}
                    </h3>
                  );
                },
                //function syntax styled code block
                code({ node, className, children, ...props }) {
                  //checks if inline or block code, <pre> tag is parent of block code in react-markdown
                  const isBlock = node?.parent?.tagName === "pre";
                  if (!isBlock) {
                    return (
                      <code className="p-0 rounded bg-muted text-sm" {...props}>
                        {children}
                      </code>
                    );
                  }
                  return (
                    // <pre className="rounded-lg overflow-x-auto bg-[#0d1117] p-4 my-4">
                    <code className={`${className} block text-sm`} {...props}>
                      {children}
                    </code>
                    //</pre>
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
