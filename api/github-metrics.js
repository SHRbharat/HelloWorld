import { Octokit } from '@octokit/rest'

export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO

  if (!token || !owner || !repo) {
    return res.status(500).json({ error: 'Missing GITHUB_TOKEN or repo info in environment' })
  }

  const octokit = new Octokit({ auth: token })

  try {
    // Example: list discussions (if using Discussions) or issues
    const discussions = await octokit.rest.discussions.list({ owner, repo, per_page: 100 })

    const metrics = discussions.data.map((d) => ({
      id: d.id,
      number: d.number,
      title: d.title,
      comments: d.comments,
      reactions: d.reaction_groups?.reduce((sum, g) => sum + (g?.total_count || 0), 0) || 0,
    }))

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
    return res.json({ metrics })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: err.message })
  }
}
