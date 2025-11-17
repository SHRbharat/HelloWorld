import Fuse from 'fuse.js'

export function makeFuseIndex(posts) {
  return new Fuse(posts, {
    keys: [
      { name: 'meta.title', weight: 0.6 },
      { name: 'meta.tags', weight: 0.3 },
      { name: 'content', weight: 0.1 }
    ],
    threshold: 0.35,
  })
}

export function searchPosts(fuse, query) {
  if (!query) return fuse?.getIndex ? [] : []
  if (!fuse) return []
  const results = fuse.search(query)
  return results.map((r) => r.item || r)
}
