import React, { useState, useEffect } from 'react'

export default function SearchBar({ onSearch, initial = '' }) {
  const [q, setQ] = useState(initial)

  useEffect(() => {
    const t = setTimeout(() => onSearch(q), 200)
    return () => clearTimeout(t)
  }, [q, onSearch])

  return (
    <div className="p-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search posts..."
        className="w-full p-2 border rounded"
      />
    </div>
  )
}
