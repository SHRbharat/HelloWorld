import matter from 'gray-matter'

// Load all markdown files under src/posts at runtime/build-time
const modules = import.meta.glob('/src/posts/*.md', { as: 'raw' })

export async function getAllPosts() {
  const entries = await Promise.all(
    Object.entries(modules).map(async ([path, resolver]) => {
      const raw = await resolver()
      const { data, content } = matter(raw)
      const file = path.split('/').pop()
      const slug = file.replace(/\.md$/, '')
      return { slug, meta: data || {}, content }
    }),
  )

  return entries
    .filter((p) => p.meta?.published !== false)
    .sort((a, b) => new Date(b.meta?.date || 0) - new Date(a.meta?.date || 0))
}

export async function getPostBySlug(slug) {
  const posts = await getAllPosts()
  return posts.find((p) => p.slug === slug) || null
}
