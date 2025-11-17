import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPostBySlug } from '../lib/posts'
import GiscusComments from './GiscusComments'

export default function PostPage({ slug }) {
  const [post, setPost] = useState(null)

  useEffect(() => {
    let mounted = true
    getPostBySlug(slug).then((p) => {
      if (mounted) setPost(p)
    })
    return () => (mounted = false)
  }, [slug])

  if (!post) return <p className="p-4">Loading...</p>

  return (
    <article className="prose mx-auto p-4">
      <h1>{post.meta.title}</h1>
      <p className="text-sm text-muted">{post.meta.date}</p>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>

      <section className="mt-10">
        <GiscusComments mapping={`/${post.slug}`} />
      </section>
    </article>
  )
}
