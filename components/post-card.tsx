import Link from "next/link"
import Image from "next/image"
import { TagBadge } from "./tag-badge"
import type { Post } from "@/lib/types"

interface PostCardProps {
  post: Post
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article
        className={`overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/20 hover:shadow-lg ${
          featured ? "md:flex md:items-stretch" : ""
        }`}
      >
        <div
          className={`relative overflow-hidden bg-muted ${
            featured ? "aspect-[16/9] md:aspect-auto md:w-1/2" : "aspect-[16/9]"
          }`}
        >
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-4xl text-muted-foreground/50">📝</div>
            </div>
          )}
        </div>

        <div className={`p-5 ${featured ? "md:flex md:w-1/2 md:flex-col md:justify-center md:p-8" : ""}`}>
          <div className="mb-3 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>

          <h2
            className={`mb-2 font-bold text-card-foreground transition-colors group-hover:text-primary ${
              featured ? "text-2xl md:text-3xl" : "text-lg"
            }`}
          >
            {post.title}
          </h2>

          <p className={`mb-4 text-muted-foreground ${featured ? "text-base" : "line-clamp-2 text-sm"}`}>
            {post.description}
          </p>

          <time className="text-sm text-muted-foreground/70">{formattedDate}</time>
        </div>
      </article>
    </Link>
  )
}
