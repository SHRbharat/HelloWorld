import SuggestedBlogs from "./../components/SuggestedBlogs";
import BlogPostContent from "./../components/BlogPostContent";
import CommentsSection from "./../components/CommentsSection";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import blogs from "../lib/blogs";

// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";



export default function Blog() {
  const { id } = useParams(); // blog id from route
  const blogId = isNaN(Number(id)) ? id : Number(id);
  const blogMeta = blogs.find((b) => b.id === blogId || String(b.id) === String(id));

  const [content, setContent] = useState("");

  useEffect(() => {
    if (blogMeta && blogMeta.file) {
      fetch(blogMeta.file)
        .then((res) => res.text())
        .then((text) => setContent(text))
        .catch(() => setContent(""));
    }
  }, [blogMeta]);

  if (!blogMeta) return <p>Blog not found</p>;

  return (
    <main className="flex-grow pt-8 pb-16">
      <BlogPostContent post={{ ...blogMeta, content }}>
        {/* <ReactMarkdown
          children={content}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypePrism]}
          className="markdown-body prose prose-lg dark:prose-invert max-w-none"
        /> */}
      </BlogPostContent>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <CommentsSection blogId={blogMeta.id} />
            <SuggestedBlogs />
          </div>
        </div>
      </div>
    </main>
  );
}


