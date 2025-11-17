import React from 'react'
import { Link } from 'react-router-dom'

export default function PostCard({ post }) {
  const { slug, meta } = post
  return (
    <article className="p-4 border rounded-md shadow-sm">
      <h2 className="text-lg font-semibold">
        <Link to={`/${slug}`}>{meta.title || slug}</Link>
      </h2>
      <p className="text-sm text-muted">{meta.date}</p>
      {meta.summary && <p className="mt-2 text-sm">{meta.summary}</p>}
      {meta.tags && (
        <div className="mt-3 flex gap-2">
          {meta.tags.map((t) => (
            <span key={t} className="text-xs px-2 py-1 bg-gray-100 rounded">{t}</span>
          ))}
        </div>
      )}
    </article>
  )
}
