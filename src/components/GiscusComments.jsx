import React from 'react'
import Giscus from '@giscus/react'

export default function GiscusComments({ mapping = 'pathname' }) {
  const repo = import.meta.env.VITE_GISCUS_REPO
  const repoId = import.meta.env.VITE_GISCUS_REPO_ID
  const category = import.meta.env.VITE_GISCUS_CATEGORY
  const categoryId = import.meta.env.VITE_GISCUS_CATEGORY_ID

  if (!repo) return null

  return (
    <Giscus
      repo={repo}
      repoId={repoId}
      category={category}
      categoryId={categoryId}
      mapping={mapping}
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme="light"
      lang="en"
    />
  )
}
