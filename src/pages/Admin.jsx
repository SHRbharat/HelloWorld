import React, { useEffect, useState } from 'react'

export default function Admin() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/github-metrics')
      .then((r) => r.json())
      .then(setData)
      .catch(setError)
  }, [])

  if (error) return <pre className="p-4">Error: {String(error)}</pre>
  if (!data) return <p className="p-4">Loading metrics...</p>

  return (
    <div className="p-4">
      <h1>Admin — GitHub Metrics</h1>
      <pre className="mt-4 bg-slate-50 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
