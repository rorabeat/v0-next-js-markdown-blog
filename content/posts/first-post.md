---
title: "Next.js App Router로 블로그 만들기"
description: "Next.js 14의 App Router를 활용하여 현대적인 블로그를 만드는 방법을 알아봅니다."
date: "2026-05-01"
slug: "first-post"
tags: ["Next.js", "React", "Blog"]
coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hz3Smu9HAGN9E6lZCFia8w5s0lnTww.png"
relatedPosts: ["second-post", "third-post"]
---

# Next.js App Router로 블로그 만들기

Next.js 14에서 도입된 App Router는 React Server Components를 기본으로 사용하며, 더 직관적인 파일 기반 라우팅을 제공합니다.

## 주요 특징

### 1. 파일 기반 라우팅

App Router는 `app` 디렉토리 내의 폴더 구조를 기반으로 라우트를 자동으로 생성합니다.

```typescript
// app/posts/[slug]/page.tsx
export default function PostPage({ params }: { params: { slug: string } }) {
  return <div>Post: {params.slug}</div>
}
```

### 2. React Server Components

기본적으로 모든 컴포넌트가 서버 컴포넌트로 동작하여 번들 크기를 줄이고 성능을 향상시킵니다.

### 3. 레이아웃 시스템

`layout.tsx` 파일을 통해 중첩된 레이아웃을 쉽게 구현할 수 있습니다.

## 코드 예시

다음은 간단한 포스팅 카드 컴포넌트 예시입니다:

```tsx
interface PostCardProps {
  title: string
  description: string
  date: string
}

export function PostCard({ title, description, date }: PostCardProps) {
  return (
    <article className="rounded-lg border p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
      <time className="text-sm">{date}</time>
    </article>
  )
}
```

## 결론

Next.js App Router는 현대적인 웹 애플리케이션을 구축하는 데 강력한 도구입니다. 특히 블로그와 같은 콘텐츠 중심의 웹사이트에 적합합니다.

> "좋은 개발자는 코드를 작성하고, 훌륭한 개발자는 코드를 공유합니다."
