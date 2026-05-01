import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-foreground transition-colors hover:text-primary">
          Dev Blog
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            홈
          </Link>
          <Link
            href="/posts"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            포스팅
          </Link>
        </nav>
      </div>
    </header>
  )
}
