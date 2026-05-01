import Link from "next/link"
import { getAllPosts } from "@/lib/posts"
import { PostCard } from "@/components/post-card"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  const posts = getAllPosts()
  const latestPosts = posts.slice(0, 3)
  const featuredPost = latestPosts[0]
  const otherPosts = latestPosts.slice(1)

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Dev Blog
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          개발 경험과 기술적인 인사이트를 공유합니다.
          <br />
          Next.js, TypeScript, 그리고 모던 웹 개발에 대한 이야기.
        </p>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="mb-12">
          <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            최신 포스팅
          </h2>
          <PostCard post={featuredPost} featured />
        </section>
      )}

      {/* Other Posts */}
      {otherPosts.length > 0 && (
        <section className="mb-12">
          <div className="grid gap-6 md:grid-cols-2">
            {otherPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* View All Link */}
      {posts.length > 3 && (
        <div className="text-center">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            모든 포스팅 보기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="py-20 text-center">
          <div className="mb-4 text-6xl">📝</div>
          <h2 className="mb-2 text-xl font-semibold text-foreground">아직 포스팅이 없습니다</h2>
          <p className="text-muted-foreground">
            곧 첫 번째 글이 작성될 예정입니다.
          </p>
        </div>
      )}
    </main>
  )
}
