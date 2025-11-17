import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Breadcrumbs() {
  const loc = useLocation()
  const parts = loc.pathname.split('/').filter(Boolean)
  return (
    <nav aria-label="breadcrumbs" className="text-sm p-2">
      <Link to="/">Home</Link>
      {parts.map((part, idx) => {
        const path = '/' + parts.slice(0, idx + 1).join('/')
        return (
          <span key={path}>
            {' '} / {' '}
            <Link to={path}>{decodeURIComponent(part)}</Link>
          </span>
        )
      })}
    </nav>
  )
}
