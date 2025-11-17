# AlgoArena Blog — Local Workspace

This repo contains a minimal client-side blog scaffold for the AlgoArena Blog product concept.

What I added in this change-set:

- A markdown posts loader: `src/lib/posts.js` (uses `import.meta.glob` + `gray-matter`).
- A sample post: `src/posts/hello-world.md`.
- Basic components:
  - `PostList`, `PostCard`, `PostPage` (render markdown with `react-markdown`).
  - `GiscusComments` wrapper for `@giscus/react` configured via Vite env vars.
  - `Avatar`, `Breadcrumbs`, `SearchBar`, `ContactForm`.
  - `src/lib/search.js` — small Fuse.js wrapper.
- A tiny Admin page at `src/pages/Admin.jsx` that fetches `/api/github-metrics`.
- A serverless API shim: `api/github-metrics.js` (uses `@octokit/rest` and environment variables).

Notes and next steps
- Install the recommended dependencies listed in the original plan (if not present):
  - `gray-matter`, `react-markdown`, `remark-gfm`, `@giscus/react`, `@octokit/rest`, `fuse.js`, `emailjs-com`, `react-router-dom`.
- Provide Vite env variables (add to `.env` / Vercel dashboard):
  - `VITE_GISCUS_REPO`, `VITE_GISCUS_REPO_ID`, `VITE_GISCUS_CATEGORY`, `VITE_GISCUS_CATEGORY_ID`
  - For EmailJS: `VITE_EMAILJS_SERVICE`, `VITE_EMAILJS_TEMPLATE`, `VITE_EMAILJS_USER`
  - For the server API: `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`

How to try locally

1. Install dependencies:

```powershell
npm install
```

2. Run the dev server:

```powershell
npm run dev
```

3. Open `http://localhost:5173` (Vite default) and navigate — the sample post is in `src/posts/hello-world.md`.

Limitations
- These components are intentionally minimal to give you a functional starting point. You should wire routing (React Router), add styling (Tailwind + shadcn/ui), and secure environment variables before deploying.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
