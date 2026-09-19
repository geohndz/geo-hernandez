# 010 — Pause about-sticker bob on hover

- **Status**: DONE
- **Commit**: 871103c
- **Severity**: LOW
- **Category**: Missed opportunities
- **Estimated scope**: 1 file, small

## Problem

About stickers loop forever. Looping motion needs a way to rest. Hover already scales them; it does not stop the bob.

```tsx
/* components/about/AboutPortrait.tsx:54 — current */
            <motion.div
              className="flex flex-col items-center"
              animate={reduce ? undefined : { y: [...motionBob.y] }}
              transition={{
                duration: motionBob.duration,
                delay: motionBob.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={reduce ? undefined : { scale: 1.05, transition: { duration: 0.25 } }}
            >
```

`reduce` already kills the loop. There is no in-page pause for everyone else.

## Target

When a sticker is hovered (fine pointer), `y` holds at `0` and the infinite repeat stops. Scale hover can stay, but drop it to `1.02` over `0.18s` so it matches plan 005’s hover budget. Moving / morphing on screen uses ease-in-out — the bob already does.

```tsx
/* target */
  const [hovered, setHovered] = useState<number | null>(null);

  // inside the map:
            <motion.div
              className="flex flex-col items-center"
              animate={
                reduce
                  ? undefined
                  : hovered === i
                    ? { y: 0, scale: 1.02 }
                    : { y: [...motionBob.y], scale: 1 }
              }
              transition={
                hovered === i
                  ? { duration: 0.18, ease: [0.77, 0, 0.175, 1] }
                  : {
                      y: {
                        duration: motionBob.duration,
                        delay: motionBob.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      scale: { duration: 0.18, ease: [0.77, 0, 0.175, 1] },
                    }
              }
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
            >
```

`[0.77, 0, 0.175, 1]` is the strong ease-in-out for on-screen movement. Do not use `whileHover` once `animate` owns scale (two sources fight).

On hover end, the bob resumes from `y: 0` (Motion retargets). That is correct.

Touch / reduced motion: `onHoverStart` may fire on tap. Guard:

```tsx
onHoverStart={() => {
  if (reduce) return;
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    setHovered(i);
  }
}}
```

## Repo conventions to follow

- File already imports `motion`, `useReducedMotion`, `useState` is not imported — add `useState` to the React import (`import { useState } from "react"`).
- `easeOutExpo` stays on the enter (`whileInView`). Do not change enter duration here (plan 002 owns `0.7` → if you touch line 52, only do so if you import `duration.hero` from `lib/motion.ts`; otherwise leave the enter as you found it).
- Do not add pause buttons or extra UI chrome.

## Steps

1. `components/about/AboutPortrait.tsx` — import `useState`.
2. Add `hovered` state. Replace the inner `motion.div` props with the target. Remove `whileHover`.
3. Keep the outer `motion.figure` enter as-is.

## Boundaries

- Do NOT change sticker assets, captions, or placements.
- Do NOT pause all stickers when one is hovered — only index `i`.
- Do NOT add a visible pause control.
- If the bob already stops on hover, STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` exits 0. `npm run lint` exits 0.
- **Feel check**:
  - `/about`. Stickers idle-bob independently.
  - Hover matcha: it settles to rest over ~180ms and scales slightly (1.02). The other two keep bobbing.
  - Leave: matcha resumes bobbing without a jump.
  - iPhone tap: sticker must not freeze forever after tap. If it does, the matchMedia guard is missing.
  - `prefers-reduced-motion: reduce`: no bob, no hover scale (existing `reduce` branch).
- **Done when**: hovering a sticker sets `y: 0` and clears `repeat: Infinity` for that sticker only.
