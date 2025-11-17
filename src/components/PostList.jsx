import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../lib/posts'
import PostCard from './PostCard'

export default function PostList() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    let mounted = true
    getAllPosts().then((p) => {
      if (mounted) setPosts(p)
    })
    return () => {
      mounted = false
    }
  }, [])

  if (!posts.length) return <p className="p-4">No posts found.</p>

  return (
    <section className="grid gap-4">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </section>
  )
}
