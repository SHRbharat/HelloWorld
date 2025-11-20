import { useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";

export default function CommentsSection({ blogId }) {
  const containerRef = useRef(null);

  // Insert giscus script with mapping='specific' and term `blog-{id}` so each blog has its own discussion
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !blogId) return;

    // Clean previous
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", "SHRbharat/HelloWorld");
    script.setAttribute("data-repo-id", "R_kgDOQXhCBw");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOQXhCB84CyAvC");
    script.setAttribute("data-mapping", "specific");
    script.setAttribute("data-term", `blog-${blogId}`);
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");

    const isDarkMode = document.documentElement.classList.contains("dark");
    script.setAttribute("data-theme", isDarkMode ? "dark" : "light");

    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");

    container.appendChild(script);

    // Observe theme changes on <html class='dark'> using a MutationObserver and postMessage to giscus iframe to update theme
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      const iframe = container.querySelector("iframe.giscus-frame");
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage(
          { giscus: { setConfig: { theme: isDark ? "dark" : "light" } } },
          "https://giscus.app"
        );
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    
    return () => {
      observer.disconnect();
      container.innerHTML = "";
    };
  }, [blogId]);

  return (
    <div className="py-8 border-t border-border">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="text-primary" size={20} />
        <h2 className="text-2xl font-bold">Discussion</h2>
      </div>

      <div ref={containerRef} />
    </div>
  );
}
