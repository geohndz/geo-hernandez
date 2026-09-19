# 001 — Wire prefers-reduced-motion through Motion.js

- **Status**: DONE
- **Commit**: 871103c
- **Severity**: HIGH
- **Category**: Accessibility
- **Estimated scope**: 13 files, medium

## Problem

`app/globals.css:66` only short-circuits CSS `animation` and `transition` durations. Motion.js writes transforms in JavaScript, so those components keep moving when the OS asks them not to.

```css
/* app/globals.css:66 — current */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

These trees import `motion` and never call `useReducedMotion()`:

```tsx
/* components/home/Hero.tsx:14 — current */
      <motion.div
        className="relative mx-auto flex max-w-2xl flex-col items-center text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
```

```tsx
/* app/template.tsx:11 — current */
    <motion.div
      ref={shellRef}
      initial="initial"
      animate="animate"
      variants={pageFade}
      onAnimationComplete={() => {
        // Transforms on this wrapper break position: sticky for the whole page.
        if (shellRef.current) shellRef.current.style.transform = "none";
      }}
    >
```

```tsx
/* components/layout/MobileNav.tsx:42 — current */
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
```

```tsx
/* components/layout/Sidebar.tsx:149 — current */
        <motion.span
          layoutId={`${layoutPrefix}-nav-pill`}
          className="absolute inset-0 rounded-lg bg-white/[0.06]"
          transition={{ type: "spring", stiffness: 420, damping: 36 }}
        />
```

```tsx
/* components/layout/Logo.tsx:18 — current */
    <motion.svg
      initial={animated ? { opacity: 0, scale: 0.86 } : false}
      animate={animated ? { opacity: 1, scale: 1 } : undefined}
      transition={springSoft}
    >
```

Same gap in `components/work/TeacherTools.tsx`, `F1Modules.tsx`, `F1Directions.tsx`, `F1SpatialModel.tsx` (tab `layoutId` springs), `PhaseCarousel.tsx` (`animate={{ x: ... }}` spring), `ResearchBoard.tsx` (enter `y: 8`), `EvolutionTimeline.tsx` (height spring).

A visitor who set reduced motion still gets a sliding drawer, a fading-and-translating route, and layout springs on first paint.

## Target

Reduced motion means fewer and gentler animations, not zero. Keep opacity and color. Drop position, scale, and `layoutId` movement.

Exact values:

- Opacity-only fade: `duration: 0.2`, easing `ease` (color/opacity, not an entrance slide)
- No `x` / `y` / `scale` / `layoutId` when `useReducedMotion()` is true
- Mobile drawer under RM: overlay and panel appear with opacity `0.2s ease` only — `x` stays `0`
- Tab / nav pills under RM: static `span` with the same fill class, no `layoutId`
- Hero / Logo under RM: render the non-`motion` element (same markup, no variants)
- Page template under RM: render a plain `div` (no `pageFade`, no transform-stripping `onAnimationComplete`)

```tsx
/* target — Hero */
const reduce = useReducedMotion();

if (reduce) {
  return (
    <section>
      <AsciiBackground />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        {/* same portrait / copy / tags, no motion.div */}
      </div>
    </section>
  );
}
```

```tsx
/* target — MobileNav panel */
const reduce = useReducedMotion();
<motion.div
  initial={reduce ? { opacity: 0 } : { x: "-100%" }}
  animate={reduce ? { opacity: 1 } : { x: 0 }}
  exit={reduce ? { opacity: 0 } : { x: "-100%" }}
  transition={reduce ? { duration: 0.2, ease: "ease" } : { type: "spring", stiffness: 380, damping: 36 }}
>
```

## Repo conventions to follow

- Reduced-motion branch already exists. Copy `components/motion/Reveal.tsx:15` — if `reduce`, return a plain element; otherwise run Motion.
- `components/layout/IntroOverlay.tsx:9` skips the whole overlay when `reduce` is true. Same import: `useReducedMotion` from `motion/react`.
- Do not add a new package. Do not change `app/globals.css` reduced-motion block (it stays as the CSS fallback).
- Keep using `easeOutExpo` from `lib/motion.ts` for the non-reduced path. Do not invent a second JS curve.

## Steps

1. `components/home/Hero.tsx` — import `useReducedMotion`. When `reduce` is true, render the existing section with a plain `div` wrapper (no `variants` / `initial` / `animate`). Leave `AsciiBackground` as-is (it already checks the media query).
2. `app/template.tsx` — import `useReducedMotion`. When `reduce` is true, return `{children}` wrapped in a plain `div` (keep `className` none). Delete the `onAnimationComplete` transform strip on that path. When `reduce` is false, keep the current `pageFade` wrapper.
3. `components/layout/MobileNav.tsx` — import `useReducedMotion`. Overlay fade can stay (`opacity` only — already correct). Change the drawer panel to the target block above.
4. `components/layout/Sidebar.tsx` — import `useReducedMotion` in the nav-link component that renders the pill. When `reduce` is true, replace `motion.span` + `layoutId` with `<span className="absolute inset-0 rounded-lg bg-white/[0.06]" />`.
5. `components/layout/Logo.tsx` — import `useReducedMotion`. When `reduce` or `animated` is false, render a plain `<svg>` with the same `viewBox`, `className`, `aria-hidden`, and path. Only the `animated && !reduce` path uses `motion.svg`.
6. Tab pills — same static-span treatment as Sidebar, in:
   - `components/work/TeacherTools.tsx` (`layoutId="toolkit-tab"`)
   - `components/work/F1Modules.tsx` (`layoutId="f1-module-tab"`)
   - `components/work/F1Directions.tsx` (`layoutId="f1-direction-tab"`)
   - `components/work/F1SpatialModel.tsx` (`layoutId="f1-spatial-tab"`)
   Each file is already `"use client"`. Import `useReducedMotion` and branch the `{active ? (...)}` pill.
7. `components/work/PhaseCarousel.tsx` — when `reduce`, set `transition={{ duration: 0 }}` on the sliding `motion.div` (instant snap, no spring). Keep the `x` calc so layout is correct.
8. `components/work/ResearchBoard.tsx` — on the `motion.section` enter (`initial={{ opacity: 0, y: 8 }}`), when `reduce` use `{ opacity: 0 }` / `{ opacity: 1 }` with `{ duration: 0.2, ease: "ease" }` and `delay: 0`.
9. `components/work/EvolutionTimeline.tsx` — import `useReducedMotion`. When `reduce`, skip `AnimatePresence` and render the open body as a static `div` (no `height` animation). Closed steps stay unmounted.

## Boundaries

- Do NOT change `app/globals.css` reduced-motion rules.
- Do NOT change durations or easings on the non-reduced path (that is plan 002).
- Do NOT restyle tab content, cards, or copy.
- Do NOT add `framer-motion` or any new dependency (`motion` is already installed).
- Do NOT wrap `Constraints.tsx`, `Reveal.tsx`, `Stagger.tsx`, `IntroOverlay.tsx`, `AboutPortrait.tsx`, or `BrandLockup.tsx` — they already branch.
- If a file no longer matches the excerpts above, STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` exits 0. `npm run lint` exits 0.
- **Feel check**:
  - Chrome DevTools → Rendering → emulate `prefers-reduced-motion: reduce`.
  - Load `/`. Portrait and hero copy are visible immediately. No `translateY` on the hero group.
  - Click About, Applications, a case study. The main column does not slide. Sticky “On this page” still sticks on `/interface/world-geography`.
  - Narrow viewport: open the hamburger. The drawer does not slide from the left; it appears. Escape still closes it.
  - On `/interface/formula-1`, click visual-direction tabs. The pill does not spring; it just appears on the active tab.
  - Toggle the emulation off and confirm the existing springs / fades still run.
- **Done when**: every file listed in Steps 1–9 calls `useReducedMotion()` (or renders a static twin) and reduced-motion users get no `x` / `y` / `scale` / `layoutId` movement.
