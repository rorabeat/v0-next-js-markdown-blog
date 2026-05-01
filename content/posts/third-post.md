---
title: "TypeScript 타입 시스템 완벽 가이드"
description: "TypeScript의 타입 시스템을 깊이 있게 이해하고 실무에 적용하는 방법을 알아봅니다."
date: "2026-04-25"
slug: "third-post"
tags: ["TypeScript", "JavaScript", "Programming"]
coverImage: "/images/posts/typescript.jpg"
relatedPosts: ["first-post", "second-post"]
---

# TypeScript 타입 시스템 완벽 가이드

TypeScript는 JavaScript에 정적 타입을 추가한 언어로, 대규모 애플리케이션 개발에 필수적입니다.

## 기본 타입

### 원시 타입

```typescript
const name: string = "홍길동";
const age: number = 25;
const isStudent: boolean = true;
const nothing: null = null;
const notDefined: undefined = undefined;
```

### 배열과 튜플

```typescript
// 배열
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["Alice", "Bob"];

// 튜플
const tuple: [string, number] = ["hello", 42];
```

## 고급 타입

### 유니온 타입

```typescript
type StringOrNumber = string | number;

function printId(id: StringOrNumber) {
  console.log(`ID: ${id}`);
}
```

### 인터섹션 타입

```typescript
interface Person {
  name: string;
}

interface Employee {
  employeeId: number;
}

type Worker = Person & Employee;

const worker: Worker = {
  name: "김철수",
  employeeId: 12345
};
```

### 제네릭

```typescript
function identity<T>(arg: T): T {
  return arg;
}

const result = identity<string>("hello");
```

## 유틸리티 타입

TypeScript는 유용한 내장 유틸리티 타입을 제공합니다:

| 유틸리티 | 설명 |
|---------|------|
| `Partial<T>` | 모든 속성을 선택적으로 만듦 |
| `Required<T>` | 모든 속성을 필수로 만듦 |
| `Pick<T, K>` | 특정 속성만 선택 |
| `Omit<T, K>` | 특정 속성을 제외 |
| `Record<K, T>` | 키-값 타입 정의 |

## 타입 가드

```typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processValue(value: unknown) {
  if (isString(value)) {
    // 여기서 value는 string 타입
    console.log(value.toUpperCase());
  }
}
```

## 결론

TypeScript의 타입 시스템을 잘 활용하면 버그를 사전에 방지하고 코드의 가독성을 높일 수 있습니다.

> "타입은 문서화이자 테스트입니다."
