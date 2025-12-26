# TDR-001: Image Placeholder Strategy

**Date:** 2025-12-26
**Status:** Decided
**Context:** Epic 3 requires "blur-up" placeholders (FR6) for high-performance asset delivery.

## Decision
Use **Native Next.js Static Imports** with `placeholder="blur"`.

## Rationale
The project architecture mandates that static assets live in `public/assets/`. Next.js automatically generates `blurDataURL` and handles width/height sizing when images are imported statically.

## Implementation Pattern

**DO THIS:**
```tsx
// ✅ Correct Pattern
import myImage from '@/../public/assets/image.jpg'; // Static Import

export default function MyComponent() {
  return (
    <Image
      src={myImage}
      alt="Description"
      placeholder="blur" // Auto-magic blur generation
      priority={false}   // Lazy by default
    />
  );
}
```

**NOT THIS:**
```tsx
// ❌ Incorrect Pattern (Requires manual width/height and no auto-blur)
export default function MyComponent() {
  return (
    <Image
      src="/assets/image.jpg" // String path
      width={800}
      height={600}
      placeholder="blur" // 💥 WILL FAIL: blurDataURL missing
    />
  );
}
```

## Consequences
- **Zero Dependencies:** No need to install `plaiceholder` or `sharp`.
- **Performance:** Blurs are pre-computed at build time (cached).
- **Constraint:** Developers MUST strictly use static imports.
