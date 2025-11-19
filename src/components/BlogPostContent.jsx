import { useState, useEffect } from 'react'
import { Calendar, Clock, User, ChevronRight, ChevronLeft, List, Eye, ThumbsUp, ThumbsDown } from 'lucide-react'

export default function BlogPostContent({ post }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeId, setActiveId] = useState('')

  // Mock headings 
  const headings = [
    { id: 'introduction', text: 'Introduction', level: 2 },
    { id: 'what-are-server-components', text: 'What are Server Components?', level: 2 },
    { id: 'key-benefits', text: 'Key Benefits', level: 3 },
    { id: 'how-it-works', text: 'How it Works', level: 2 },
    { id: 'the-protocol', text: 'The Protocol', level: 3 },
    { id: 'conclusion', text: 'Conclusion', level: 2 },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -66%' }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToHeading = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveId(id)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6">
          {post.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
        
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
            <div className="flex items-center gap-2 text-muted-foreground" title="Views">
              <Eye size={18} />
              <span className="font-medium">1.2k</span>
            </div>
            <div className="w-px h-4 bg-border"></div>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-colors" title="Upvote">
              <ThumbsUp size={18} />
              <span className="font-medium">245</span>
            </button>
            <div className="w-px h-4 bg-border"></div>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors" title="Downvote">
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
        <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:mr-[300px]' : ''}`}>
          <article className="prose prose-lg dark:prose-invert max-w-none">
            {/* Simulated Markdown Content Rendering */}
            <div className="space-y-8">
              <section id="introduction" className="scroll-mt-24">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Introduction</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  React Server Components (RSC) represent a paradigm shift in how we build React applications. By moving component rendering to the server, we can significantly reduce the amount of JavaScript sent to the client.
                </p>
              </section>

              <section id="what-are-server-components" className="scroll-mt-24">
                <h2 className="text-2xl font-bold mb-4 text-foreground">What are Server Components?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Server Components allow developers to write UI that can be rendered on the server. Unlike Server-Side Rendering (SSR), which returns HTML that must be hydrated, RSCs stream a special data format that React uses to update the DOM without losing client state.
                </p>
                
                <div id="key-benefits" className="scroll-mt-24 ml-4 mt-6">
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Key Benefits</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li><strong className="text-foreground">Zero Bundle Size</strong>: Dependencies used in Server Components aren't included in the client bundle.</li>
                    <li><strong className="text-foreground">Direct Backend Access</strong>: Access your database or filesystem directly from your components.</li>
                    <li><strong className="text-foreground">Automatic Code Splitting</strong>: Client components imported by Server Components are automatically code-split.</li>
                  </ul>
                </div>
              </section>

              <section id="how-it-works" className="scroll-mt-24">
                <h2 className="text-2xl font-bold mb-4 text-foreground">How it Works</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When a request comes in, the server renders the component tree. It serializes the result into a JSON-like format.
                </p>

                <div id="the-protocol" className="scroll-mt-24 ml-4 mt-6">
                  <h3 className="text-xl font-semibold mb-3 text-foreground">The Protocol</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The wire format is optimized for streaming and can be processed by React on the client as it arrives.
                  </p>
                </div>
              </section>

              <section id="conclusion" className="scroll-mt-24">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Conclusion</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Server Components are not just a performance optimization; they are a new way to think about building user interfaces.
                </p>
              </section>
            </div>
          </article>
        </div>

        {/* Collapsible Sidebar / Table of Contents */}
        <aside 
          className={`
            fixed top-24 right-0 h-[calc(100vh-6rem)] z-40 transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
            lg:translate-x-0 lg:static lg:h-auto lg:block
            ${!isSidebarOpen && 'lg:hidden'} 
          `}
          style={{ width: '300px' }}
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
                    ${heading.level === 3 ? 'pl-6' : ''}
                    ${activeId === heading.id 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
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
                {['Twitter', 'LinkedIn', 'Facebook'].map((platform) => (
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
        
        
        {/* Re-open button for desktop when sidebar is hidden */}
        {!isSidebarOpen && (
          <div className="hidden lg:block fixed top-24 right-8 z-40">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-3 bg-card border border-border rounded-full shadow-md hover:bg-accent transition-colors group"
              title="Show Table of Contents"
            >
              <ChevronLeft size={20} className="text-muted-foreground group-hover:text-foreground" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
