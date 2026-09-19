# 002 — Shorten fadeUp, pageFade, and stagger tokens

- **Status**: DONE
- **Commit**: 871103c
- **Severity**: HIGH
- **Category**: Easing & duration
- **Estimated scope**: 2 files (+ call-site behavior via tokens), small

## Problem

The shared enter recipe is too slow for a site a recruiter pages through in one sitting. `fadeUp` is 700ms and moves 18px. `pageFade` is 500ms and moves 8px — then immediately strips `transform` so sticky TOC works. `staggerChildren` is 90ms (over the 30–80ms decorative range). `fadeIn` is 600ms.

```ts
/* lib/motion.ts:9 — current */
export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

export const pageFade = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutExpo },
    transitionEnd: { y: 0, transform: "none" },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};
```

```tsx
/* app/template.tsx:16 — current */
      onAnimationComplete={() => {
        // Transforms on this wrapper break position: sticky for the whole page.
        if (shellRef.current) shellRef.current.style.transform = "none";
      }}
```

`Reveal` (`components/motion/Reveal.tsx:24`) and `Hero` consume `fadeUp` / `stagger`. Every about paragraph, index card, and route pays this tax.

UI animations stay under 300ms. Entering uses ease-out. The repo already has `easeOutExpo = [0.22, 1, 0.36, 1]`.

## Target

Keep `easeOutExpo`. Change only numbers and drop the page `y` so the sticky hack can go.

```ts
/* lib/motion.ts — target */
export const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export const duration = {
  press: 0.16,
  hover: 0.18,
  ui: 0.2,
  page: 0.24,
  hero: 0.28,
} as const;

export const springSoft = {
  type: "spring" as const,
  stiffness: 380,
  damping: 32,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.hero, ease: easeOutExpo },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.page, ease: easeOutExpo },
  },
};

export const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

export const pageFade = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: duration.page, ease: easeOutExpo },
  },
  exit: { opacity: 0, transition: { duration: duration.ui } },
};
```

```tsx
/* app/template.tsx — target */
"use client";

import { motion } from "motion/react";
import { pageFade } from "@/lib/motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial="initial" animate="animate" variants={pageFade}>
      {children}
    </motion.div>
  );
}
```

If plan 001 already wrapped this file in `useReducedMotion`, keep that branch and only change the non-reduced `pageFade` path. Do not reintroduce `y` or `onAnimationComplete`.

## Repo conventions to follow

- Tokens live in `lib/motion.ts`. Add `duration` next to `easeOutExpo`. Do not add a parallel CSS `--ease-*` file.
- `easeOutExpo` stays `[0.22, 1, 0.36, 1]`. Do not replace it with `cubic-bezier(0.23, 1, 0.32, 1)` in JS variants.
- `Reveal.tsx` already applies `fadeUp` — do not edit Reveal in this plan except if a type breaks.

## Steps

1. Replace `lib/motion.ts` with the target block above. Keep `springSoft` unchanged.
2. `app/template.tsx` — remove `useRef`, `shellRef`, and `onAnimationComplete`. `pageFade` no longer writes `transform`, so sticky TOC does not need the strip.
3. Grep for `0.7`, `0.6`, `0.5` in files that import from `@/lib/motion`. Do not retune springs (`stiffness` / `damping`) or CSS `duration-500` here (plans 004 and 005).
4. Leave `components/motion/Reveal.tsx` as-is. It will pick up the new `fadeUp` duration automatically.

## Boundaries

- Do NOT remove Reveal from about paragraphs (plan 006).
- Do NOT change tab panels, hovers, or play buttons.
- Do NOT change `springSoft` or any `layoutId` spring.
- Do NOT add Framer / extra packages.
- If `lib/motion.ts` no longer matches the excerpt, STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` exits 0. `npm run lint` exits 0.
- **Feel check**:
  - Load `/`. Hero stagger should feel like a short beat, not a 700ms slide. Children start ~40ms apart, not 90ms.
  - Click Applications → Websites → a case study. The main column fades in under 300ms and does not translate.
  - On `/interface/world-geography` at the `xl` breakpoint, scroll. “On this page” stays sticky the whole way (the old transform hack is gone).
  - DevTools Animations panel at 10%: `pageFade` is opacity only. `fadeUp` moves 8px, not 18px, and finishes by ~280ms.
  - Emulate `prefers-reduced-motion: reduce` (after plan 001): no `y` on hero or page.
- **Done when**: `fadeUp.visible.transition.duration === 0.28`, `pageFade` has no `y`, `staggerChildren === 0.06`, and `app/template.tsx` has no `transform` strip.
