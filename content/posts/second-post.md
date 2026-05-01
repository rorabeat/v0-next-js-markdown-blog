---
title: "Markdown으로 기술 문서 작성하기"
description: "개발자를 위한 Markdown 작성 팁과 베스트 프랙티스를 소개합니다."
date: "2026-04-28"
slug: "second-post"
tags: ["Markdown", "Documentation", "Writing"]
coverImage: "/images/posts/markdown.jpg"
relatedPosts: ["first-post"]
---

# Markdown으로 기술 문서 작성하기

Markdown은 간단한 문법으로 서식이 있는 문서를 작성할 수 있는 마크업 언어입니다.

## 기본 문법

### 제목 (Headings)

```markdown
# H1 제목
## H2 제목
### H3 제목
```

### 강조 (Emphasis)

- **굵게**: `**텍스트**` 또는 `__텍스트__`
- *기울임*: `*텍스트*` 또는 `_텍스트_`
- ~~취소선~~: `~~텍스트~~`

### 목록 (Lists)

순서 없는 목록:
- 첫 번째 항목
- 두 번째 항목
- 세 번째 항목

순서 있는 목록:
1. 첫 번째
2. 두 번째
3. 세 번째

### 코드 블록

인라인 코드는 `backtick`으로 감싸면 됩니다.

```javascript
function hello(name) {
  console.log(`Hello, ${name}!`);
}

hello('World');
```

### 표 (Tables)

| 기능 | 지원 여부 |
|------|----------|
| 제목 | ✅ |
| 목록 | ✅ |
| 코드 | ✅ |
| 이미지 | ✅ |

## GFM (GitHub Flavored Markdown)

GitHub에서 확장한 Markdown 문법으로, 다음 기능들을 추가로 지원합니다:

- 체크박스: `- [ ]` 또는 `- [x]`
- 자동 링크 변환
- 취소선
- 표

## 결론

Markdown은 배우기 쉽고 어디서나 사용할 수 있어 개발자에게 필수적인 도구입니다.
