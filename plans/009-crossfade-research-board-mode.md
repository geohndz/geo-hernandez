# 009 — Crossfade the research-board sort mode

- **Status**: DONE
- **Commit**: 871103c
- **Severity**: LOW
- **Category**: Missed opportunities
- **Estimated scope**: 1 file, small

## Problem

Sticky notes already FLIP with `layoutId`. Switching Unsorted → Sorted unmounts one tree and mounts the other. Bucket sections fade up; the outgoing layout vanishes.

```tsx
/* components/work/ResearchBoard.tsx:268 — current */
            {sorted ? (
              <div className="space-y-3">
                {grouped.map((bucket, bucketIndex) => (
                  <motion.section
                    key={bucket.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: bucketIndex * 0.05, duration: 0.35 }}
```

```tsx
/* components/work/ResearchBoard.tsx:299 — current */
            ) : (
              <div className="flex flex-wrap justify-center gap-2">
                {notes.map((note, i) => (
                  <Sticky key={note.id} note={note} sorted={false} delay={i * 0.015} />
                ))}
              </div>
            )}
```

Do not add another stagger. The notes already move. The gap is the wrapper cut.

## Target

Fade the mode wrapper only. Opacity, 200ms, `easeOutExpo` `[0.22, 1, 0.36, 1]`. No `y` on the wrapper. CSS/Motion transition (not keyframes) so a fast tab retargets.

```tsx
/* target */
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";

const reduce = useReducedMotion();

<AnimatePresence mode="wait" initial={false}>
  <motion.div
    key={sorted ? "sorted" : "loose"}
    initial={reduce ? false : { opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={reduce ? undefined : { opacity: 0 }}
    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
  >
    {sorted ? (
      <div className="space-y-3">
        {grouped.map((bucket) => (
          <section
            key={bucket.id}
            className={cn("rounded-[16px] border p-3 pt-4 md:p-4", bucket.fill, bucket.border)}
          >
            {/* header + notes — no extra y/delay on the section */}
          </section>
        ))}
      </div>
    ) : (
      <div className="flex flex-wrap justify-center gap-2">
        {notes.map((note) => (
          <Sticky key={note.id} note={note} sorted={false} delay={0} />
        ))}
      </div>
    )}
  </motion.div>
</AnimatePresence>
```

Drop `y: 8` and the 50ms bucket stagger (decorative stagger on a toggle the user can spam). Sticky `layoutId` stays. `delay={0}` on unsorted notes.

## Repo conventions to follow

- File already uses `LayoutGroup` + `motion`. Add `AnimatePresence` and `useReducedMotion` to that import.
- Tab pill `layoutId="research-tab"` stays (plan 001 may have gated it).
- Do not restyle the dotted board background.

## Steps

1. `components/work/ResearchBoard.tsx` — extend the `motion/react` import.
2. Wrap the `sorted ? … : …` block (currently lines 268–305) with the target `AnimatePresence` / `motion.div`.
3. Change `motion.section` buckets to plain `section` (wrapper owns the fade). Keep `Sticky` as-is except `delay={0}` on the unsorted list.
4. If `reduce`, skip `initial`/`exit` so the mode swap is instant.

## Boundaries

- Do NOT change note copy, colors, or `layoutId={note.id}`.
- Do NOT add bounce or a second stagger.
- Do NOT change the Unsorted / Sorted tablist.
- If the ternary is already wrapped in `AnimatePresence`, STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` exits 0. `npm run lint` exits 0.
- **Feel check**:
  - `/interface/world-geography` research board. Toggle Sorted. The board dims and the grouped buckets appear over ~200ms. Notes still FLIP into buckets.
  - Toggle back immediately: the fade reverses from the current opacity (no flash to 0 then in).
  - `prefers-reduced-motion: reduce`: instant swap, notes may still layout-jump (FLIP off is OK under RM if `useReducedMotion` is also applied to `Sticky` — only do that if `Sticky` already accepts a flag; do not invent new Sticky props unless needed).
- **Done when**: the sorted/unsorted trees swap inside one opacity `0.2s` wrapper and bucket sections no longer animate `y`.
