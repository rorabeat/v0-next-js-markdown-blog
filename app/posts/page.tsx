import type { Metadata } from "next"
import { getAllPosts } from "@/lib/posts"
import { PostCard } from "@/components/post-card"

export const metadata: Metadata = {
  title: "모든 포스팅 | Dev Blog",
  description: "개발 블로그의 모든 포스팅을 확인하세요.",
}

export default function PostsPage() {
  const posts = getAllPosts()

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-12">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          모든 포스팅
        </h1>
        <p className="text-muted-foreground">
          총 {posts.length}개의 포스팅이 있습니다.
        </p>
      </header>

      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
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
