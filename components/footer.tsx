export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Dev Blog. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with Next.js & Markdown
          </p>
        </div>
      </div>
    </footer>
  )
}
