# Architecture

## Project Overview

This repository is a Next.js App Router Markdown blog generated from the v0 prompt. Blog posts live as Markdown/MDX files under `content/posts`, are parsed on the server with `gray-matter` and `remark`, and are rendered through static App Router pages.

## Current Repository Structure

```text
.
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── posts/
│       ├── page.tsx
│       └── [slug]/
│           ├── not-found.tsx
│           └── page.tsx
├── components/
│   ├── footer.tsx
│   ├── header.tsx
│   ├── post-card.tsx
│   ├── related-posts.tsx
│   ├── tag-badge.tsx
│   ├── theme-provider.tsx
│   └── ui/
├── content/
│   └── posts/
│       ├── first-post.md
│       ├── second-post.md
│       └── third-post.md
├── hooks/
├── lib/
│   ├── posts.ts
│   ├── types.ts
│   └── utils.ts
├── memory-bank/
│   └── architecture.md
├── public/
│   └── images/
│       └── posts/
├── styles/
│   └── globals.css
├── AGENTS.md
├── README.md
├── package.json
├── next.config.mjs
├── tsconfig.json
└── v0-markdown-blog-prompt.md
```

Generated/build and dependency directories such as `.next/` and `node_modules/` exist locally but are not part of the source architecture.

## Runtime Stack

- Framework: Next.js App Router
- Language: TypeScript
- UI: React 19, Tailwind CSS 4, shadcn/Radix-style components in `components/ui`
- Markdown parsing: `gray-matter`, `remark`, `remark-gfm`, `remark-html`
- Icons: `lucide-react`

## Deployment

- Target: GitHub Pages using GitHub Actions.
- Workflow: `.github/workflows/deploy.yml`.
- Trigger: pushes to the `deploy` branch and manual `workflow_dispatch` runs.
- Build output: Next.js static export writes to `out/` through `output: "export"` in `next.config.mjs`.
- Pages artifact: the workflow uploads `./out` with `actions/upload-pages-artifact` and publishes it with `actions/deploy-pages`.
- Base path: `next.config.mjs` derives `basePath` from `GITHUB_REPOSITORY` during GitHub Actions builds. Project pages use `/<repo-name>`; user or organization pages ending in `.github.io` use no base path. `NEXT_PUBLIC_BASE_PATH` can override this when needed.
- Static hosting compatibility: `trailingSlash: true`, `images.unoptimized: true`, and `public/.nojekyll` are enabled for GitHub Pages.

## Routes

- `/`
  - Implemented in `app/page.tsx`.
  - Reads posts with `getAllPosts()`.
  - Shows the latest post as featured and additional recent posts as cards.

- `/posts`
  - Implemented in `app/posts/page.tsx`.
  - Reads all posts with `getAllPosts()`.
  - Displays all posts in a responsive card grid.

- `/posts/[slug]`
  - Implemented in `app/posts/[slug]/page.tsx`.
  - Uses `generateStaticParams()` from `getAllSlugs()`.
  - Uses `generateMetadata()` for per-post SEO metadata.
  - Loads one post with `getPostBySlug(slug)`.
  - Renders Markdown as HTML with `dangerouslySetInnerHTML`.
  - Renders related posts through `components/related-posts.tsx`.

## Data Flow

`lib/posts.ts` owns post loading and transformation:

- `getAllPosts()`
  - Reads `content/posts` from `process.cwd()`.
  - Accepts `.md` and `.mdx` files.
  - Parses frontmatter with `gray-matter`.
  - Creates a simple excerpt from Markdown content.
  - Sorts posts by date descending.

- `getPostBySlug(slug)`
  - Finds a post by frontmatter slug.
  - Converts Markdown content to HTML with `remark`, `remark-gfm`, and `remark-html`.

- `getRelatedPosts(post)`
  - Uses the current post's `relatedPosts` slug array.
  - Returns matching posts from the full post list.

- `getAllSlugs()`
  - Returns all post slugs for static route generation.

## Post Model

Types are defined in `lib/types.ts`.

```ts
export interface PostFrontmatter {
  title: string
  description: string
  date: string
  slug: string
  tags: string[]
  coverImage: string
  relatedPosts: string[]
}

export interface Post extends PostFrontmatter {
  content: string
  excerpt: string
}
```

Each Markdown post should include frontmatter matching `PostFrontmatter`.

## Important Components

- `components/post-card.tsx`
  - Reusable preview card for home and list pages.

- `components/related-posts.tsx`
  - Displays up to three related posts at the bottom of a post detail page.

- `components/tag-badge.tsx`
  - Displays tag pills.

- `components/header.tsx` and `components/footer.tsx`
  - Shared layout/navigation elements.

## Known Notes

- Some Korean UI text currently appears mojibake-encoded in source files. Fixing that is separate from this architecture update.
- `v0-markdown-blog-prompt.md` is retained as the original prompt used to generate or refine the app.
- Update this file whenever routes, content conventions, post parsing, or major component responsibilities change.
