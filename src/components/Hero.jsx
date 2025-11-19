import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: 'url(/placeholder.svg?height=1080&width=1920&query=abstract%20tech%20background)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background z-1" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 inline-block">
          <div className="px-4 py-2 bg-card border border-border rounded-full">
            <p className="text-sm font-medium text-accent-foreground">Welcome to HelloWorld!</p>
          </div>
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold mb-6 text-balance leading-tight">
          Exploring Code & <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Ideas</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground mb-10 text-balance max-w-2xl mx-auto leading-relaxed">
          A collection of insights, tutorials, and musings about software development, web technologies, and the creative journey of building digital products.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#blogs"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all duration-200 flex items-center gap-2 group"
          >
            Explore Blogs
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-border rounded-lg font-semibold hover:bg-card transition-colors duration-200"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  )
}
