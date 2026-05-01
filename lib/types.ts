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
