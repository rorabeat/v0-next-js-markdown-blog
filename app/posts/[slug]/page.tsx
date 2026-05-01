import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getAllSlugs, getPostBySlug, getRelatedPosts, getAllPosts } from "@/lib/posts"
import { TagBadge } from "@/components/tag-badge"
import { RelatedPosts } from "@/components/related-posts"

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "포스팅을 찾을 수 없습니다",
    }
  }

  return {
    title: `${post.title} | Dev Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: post.coverImage ? [post.coverImage] : [],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const allPosts = getAllPosts()
  const fullPost = allPosts.find((p) => p.slug === slug)
  const relatedPosts = fullPost ? getRelatedPosts(fullPost) : []

  const formattedDate = new Date(post.date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      {/* Back Link */}
      <Link
        href="/posts"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        모든 포스팅
      </Link>

      <article>
        {/* Header */}
        <header className="mb-8">
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>

          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {post.title}
          </h1>

          <p className="mb-4 text-lg text-muted-foreground">{post.description}</p>

          <time className="text-sm text-muted-foreground/70">{formattedDate}</time>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-xl bg-muted">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h3:text-xl prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[#1a1a1a] prose-pre:text-sm prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-table:overflow-hidden prose-table:rounded-lg prose-table:border prose-th:bg-muted prose-th:px-4 prose-th:py-2 prose-td:px-4 prose-td:py-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Related Posts */}
      <RelatedPosts posts={relatedPosts} />
    </main>
  )
}
