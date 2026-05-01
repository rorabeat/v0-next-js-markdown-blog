import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center justify-center px-4 py-24 text-center">
      <div className="mb-6 text-8xl">404</div>
      <h1 className="mb-4 text-2xl font-bold text-foreground">
        포스팅을 찾을 수 없습니다
      </h1>
      <p className="mb-8 text-muted-foreground">
        요청하신 포스팅이 존재하지 않거나 삭제되었을 수 있습니다.
      </p>
      <Link
        href="/posts"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <ArrowLeft className="h-4 w-4" />
        모든 포스팅으로 돌아가기
      </Link>
    </main>
  )
}
