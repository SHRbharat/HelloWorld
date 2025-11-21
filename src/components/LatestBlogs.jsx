import { useState } from 'react'
import { ArrowRight, Calendar, User } from 'lucide-react'

export default function LatestBlogs() {
  const [hoveredId, setHoveredId] = useState(null)

  const blogs = [
    {
      id: 1,
      title: 'React 19: The Future of Component Development',
      excerpt: 'Exploring the latest features and improvements in React 19, including server components and automatic batching.',
      date: 'Nov 15, 2024',
      author: 'Shivam Ray',
      category: 'React',
      image: '/react-development-concept.png',
    },
    {
      id: 2,
      title: 'Mastering TypeScript Generics',
      excerpt: 'Deep dive into TypeScript generics and how to use them effectively for type-safe, reusable code.',
      date: 'Nov 12, 2024',
      author: 'Shivam Ray',
      category: 'TypeScript',
      image: '/typescript-code.png',
    },
    {
      id: 3,
      title: 'Web Performance Optimization Guide',
      excerpt: 'Complete strategies for optimizing web applications including bundling, caching, and image optimization.',
      date: 'Nov 8, 2024',
      author: 'Shivam Ray',
      category: 'Performance',
      image: '/web-performance-concept.png',
    },
    {
      id: 4,
      title: 'Building Scalable Node.js APIs',
      excerpt: 'Architecture patterns and best practices for building production-ready Node.js backend services.',
      date: 'Nov 5, 2024',
      author: 'Shivam Ray',
      category: 'Backend',
      image: '/nodejs-backend.png',
    },
    {
      id: 5,
      title: 'CSS Grid vs Flexbox: When to Use What',
      excerpt: 'Understanding layout systems in CSS and choosing the right tool for different layout scenarios.',
      date: 'Oct 30, 2024',
      author: 'Shivam Ray',
      category: 'CSS',
      image: '/css-layout-diagram.png',
    },
    {
      id: 6,
      title: 'Getting Started with GraphQL',
      excerpt: 'Introduction to GraphQL, comparing it with REST APIs, and how to implement it in your projects.',
      date: 'Oct 25, 2024',
      author: 'Shivam Ray',
      category: 'GraphQL',
      image: '/graphql-api-concept.png',
    },
  ]

  return (
    <section id="blogs" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Latest Articles</h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Fresh insights and practical guides on web development, programming, and tech trends.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="group h-full flex flex-col overflow-hidden rounded-lg border border-border bg-background hover:border-accent transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
              onMouseEnter={() => setHoveredId(blog.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-card">
                <img
                  src={blog.image || "/placeholder.svg"}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 text-xs font-semibold bg-accent/10 text-accent rounded-full">
                    {blog.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                  {blog.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {blog.date}
                    </div>
                  </div>
                  <ArrowRight
                    size={18}
                    className={`text-accent transition-transform duration-300 ${
                      hoveredId === blog.id ? 'translate-x-1' : ''
                    }`}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center">
          <button className="px-8 py-3 border border-border rounded-lg font-semibold hover:bg-card transition-colors duration-200 flex items-center gap-2 group">
            View All Articles
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}
