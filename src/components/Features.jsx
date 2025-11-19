import { Code, Zap, BookOpen } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Best practices and patterns for writing maintainable, scalable code that stands the test of time.',
    },
    {
      icon: Zap,
      title: 'Performance Tips',
      description: 'Optimization strategies and techniques to build lightning-fast applications and enhance user experience.',
    },
    {
      icon: BookOpen,
      title: 'In-Depth Tutorials',
      description: 'Comprehensive guides covering modern frameworks, tools, and technologies for web development.',
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Why Read Here?</h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Discover what makes our blog a go-to resource for developers and tech enthusiasts.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group p-8 rounded-lg border border-border bg-background hover:border-accent hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-4 inline-block p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <Icon className="text-accent w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
