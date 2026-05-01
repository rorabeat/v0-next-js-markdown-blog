import Link from "next/link"
import Image from "next/image"
import { TagBadge } from "./tag-badge"
import type { Post } from "@/lib/types"

interface RelatedPostsProps {
  posts: Post[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="mb-8 text-2xl font-bold text-foreground">연관 포스팅</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`} className="group block">
            <article className="overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/20 hover:shadow-md">
              <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="text-3xl text-muted-foreground/50">📝</div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 2).map((tag) => (
                    <TagBadge key={tag} tag={tag} />
                  ))}
                </div>
                <h3 className="font-semibold text-card-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
