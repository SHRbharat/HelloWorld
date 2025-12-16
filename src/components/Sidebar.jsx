import {
  ChevronRight,
  List,
  Link,
  Twitter,
  Facebook,
  Instagram,
  MessageCircle,
  Send,
} from "lucide-react";

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  headings,
  activeId,
  scrollToHeading,
}) {
  return (
    // <aside
    //   className={`
    //     fixed top-24 right-0 h-[calc(100vh-6rem)] z-40 transition-transform duration-300 ease-in-out
    //     ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
    //     lg:translate-x-0 lg:static lg:h-auto lg:block
    //     ${!isSidebarOpen && "lg:hidden"}
    //   `}
    //   style={{ width: "300px" }}
    // >
    <aside
      className={`
    fixed top-22 right-0 z-40 transition-transform duration-300 ease-in-out
    ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
    lg:translate-x-0 lg:sticky lg:top-22 lg:block lg:flex-shrink-0
    ${!isSidebarOpen && "lg:hidden"}
  `}
      style={{ width: "300px", height: "calc(100vh - 6rem)" }}
    >
      {/* Toggle Button */}
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
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm h-full overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Table of Contents</h3>
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
            {[
              { icon: Link, label: "Copy Link" },
              { icon: Twitter, label: "Share on X" },
              { icon: Facebook, label: "Share on Facebook" },
              { icon: Instagram, label: "Share on Instagram" },
              { icon: MessageCircle, label: "Send on WhatsApp" },
              { icon: Send, label: "Send on Telegram" },
            ].map(({ icon: Icon, label }, idx) => (
              <button
                key={idx}
                className="p-2 lg:p-1.5 bg-background border border-border rounded-md hover:bg-accent transition-colors"
                aria-label={label}
                title={label}
              >
                <Icon size={20} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
