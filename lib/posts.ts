import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import gfm from "remark-gfm"
import type { Post, PostFrontmatter } from "./types"

const postsDirectory = path.join(process.cwd(), "content/posts")

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)
      const frontmatter = data as PostFrontmatter

      // Generate excerpt from content (first 150 characters)
      const plainText = content.replace(/[#*`\[\]]/g, "").trim()
      const excerpt = plainText.slice(0, 150) + (plainText.length > 150 ? "..." : "")

      return {
        ...frontmatter,
        content,
        excerpt,
      }
    })

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = getAllPosts()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return null
  }

  // Process markdown content to HTML
  const processedContent = await remark().use(gfm).use(html, { sanitize: false }).process(post.content)

  return {
    ...post,
    content: processedContent.toString(),
  }
}

export function getRelatedPosts(post: Post): Post[] {
  if (!post.relatedPosts || post.relatedPosts.length === 0) {
    return []
  }

  const allPosts = getAllPosts()
  return allPosts.filter((p) => post.relatedPosts.includes(p.slug))
}

export function getAllSlugs(): string[] {
  const posts = getAllPosts()
  return posts.map((post) => post.slug)
}
