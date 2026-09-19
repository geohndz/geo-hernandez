# 003 — Crossfade case-study tab content

- **Status**: DONE
- **Commit**: 871103c
- **Severity**: MEDIUM
- **Category**: Physicality & origin
- **Estimated scope**: 3 files, medium

## Problem

Tab chrome already springs via `layoutId`. The stage does not. Modules remount the image. Tools remount the video. Direction copy snaps while the pictures already fade.

```tsx
/* components/work/F1Modules.tsx:78 — current */
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px] border border-line bg-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={module.src}
          src={module.src}
          alt={module.alt}
          className="absolute inset-0 m-auto max-h-[78%] max-w-[82%] object-contain"
        />
      </div>

      <p className="study-text mx-auto mt-6 text-center text-[16px] leading-[1.75] text-muted">
        {module.body}
      </p>
```

```tsx
/* components/work/TeacherTools.tsx:81 — current */
      <div className="overflow-hidden rounded-[20px] border border-line bg-[#cfe8f4]">
        <InViewVideo
          key={tool.src}
          src={`${tool.src}?v=2`}
          alt={tool.alt}
          className="block h-auto w-full"
          onEnded={() => setIndex((value) => (value + 1) % tools.length)}
        />
      </div>

      <div className="study-text mx-auto mt-6 text-center">
        <p className="text-[16px] leading-[1.75] text-muted">{tool.body}</p>
      </div>
```

```tsx
/* components/work/F1Directions.tsx:81 — current (images already stacked) */
            className={cn(
              "pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ease-out",
              i === index ? "opacity-100" : "opacity-0",
            )}
```

```tsx
/* components/work/F1Directions.tsx:89 — current (copy snaps) */
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="pair-solution rounded-[14px] px-4 py-4">
          <ul className="space-y-2.5">
            {direction.pros.map((item) => (
```

Rapid tab clicks restart from zero if this is done with keyframes or `key`-remount fades. Use CSS transitions on stacked panels so the transition retargets.

## Target

Match the stacked-image pattern already in `F1Directions.tsx:73`. Durations from the UI budget: 200ms enter (dropdown/select range 150–250ms), 160ms for the subtler exit feel — implement as one 200ms ease-out transition that retargets (do not use keyframes).

Curve: `cubic-bezier(0.22, 1, 0.36, 1)` (`easeOutExpo` already in `lib/motion.ts`).

```tsx
/* target — stacked panel class */
const panelMotion =
  "transition-[opacity,transform] duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

// active:   "opacity-100 translate-y-0"
// inactive: "pointer-events-none opacity-0 translate-y-1.5"
```

`translate-y-1.5` is 6px. Inactive panels stay mounted. Only the active panel is in the accessibility tree (`aria-hidden={i !== index}` on images; hidden copy uses `invisible` + `aria-hidden` or stacked absolute paragraphs).

Do not remount with `key={src}` except TeacherTools video `src` (the player must change file). For tools: stack one `InViewVideo` per tool, hide inactive with the same opacity/transform classes, and call `onEnded` only on the active video.

Under `prefers-reduced-motion: reduce`, `motion-reduce:transition-none` plus `motion-reduce:translate-y-0` — opacity may still flip instantly.

## Repo conventions to follow

- `F1Directions.tsx:73` is the exemplar: map every item, stack with `absolute inset-0`, toggle `opacity`.
- Use `cn()` from `@/lib/cn`.
- Tailwind already has `duration-200` and `motion-reduce:*`. Do not add a Motion `AnimatePresence` around these panels (keyframes/exit mounts are worse for rapid clicks).
- Do not change `layoutId` pill springs (plan 001 only gates them).

## Steps

1. `components/work/F1Modules.tsx` — replace the single `img` + `key={module.src}` with a map over `modules`, stacked in the existing `aspect-[16/9]` frame, using `panelMotion` + active/inactive classes. Stack the body copy the same way in a `relative min-h-*` wrapper (use `min-h-[4.5rem]` so the layout does not jump). Remove the `key` remount.
2. `components/work/F1Directions.tsx` — change image transition from `duration-500 ease-out` to `duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]`. Keep stacked images. Stack the pro list and con list the same way (one grid, each direction’s lists absolutely stacked) so copy does not snap.
3. `components/work/TeacherTools.tsx` — inside the rounded video frame, map `tools` to stacked `InViewVideo` instances. Active: `opacity-100` and keep `onEnded`. Inactive: `opacity-0 pointer-events-none`, no `onEnded`. Stack the caption paragraph like Modules. Do not use `key={tool.src}` on a single player.
4. Add `motion-reduce:transition-none motion-reduce:translate-y-0` on every new transition class.

## Boundaries

- Do NOT restyle tablists, pills, or `layoutId`.
- Do NOT change `InViewVideo` internals.
- Do NOT add Motion enter/exit on these panels.
- Do NOT touch `PhaseCarousel`, `ResearchBoard`, or `F1SpatialModel` diagram layout (plan 004).
- If `F1Directions` stacked images are gone, STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` exits 0. `npm run lint` exits 0.
- **Feel check**:
  - `/interface/formula-1` — click Leaderboard → Radio → Cameras quickly. Images dissolve, they do not pop. Spamming tabs must retarget mid-fade (no jump back to 0% opacity).
  - Same page, visual directions: pictures and pro/con lists fade together. Duration feels like ~200ms, not 500ms.
  - `/interface/world-geography` — Annotation Toolkit tabs. Video crossfades. Auto-advance `onEnded` still walks the tabs.
  - Animations panel at 10%: properties are `opacity` and `transform` only.
  - `prefers-reduced-motion: reduce`: panels swap with no slide.
- **Done when**: none of the three files remount stage content with `key={*.src}`, and inactive panels use `opacity-0` + a 200ms transition.
