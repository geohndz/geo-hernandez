# 004 — Stop animating layout properties

- **Status**: DONE
- **Commit**: 871103c
- **Severity**: MEDIUM
- **Category**: Performance
- **Estimated scope**: 5 files, medium

## Problem

Several surfaces tween layout (`height`, `width`, `margin`, `left`/`top` via `transition-all`). That triggers layout + paint + composite. `transition: all` is always a finding.

```tsx
/* components/work/EvolutionTimeline.tsx:177 — current */
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
```

```tsx
/* components/work/F1SpatialModel.tsx:159 — current */
        "absolute rounded-[7px] border transition-all duration-500",
```

Same class at `F1SpatialModel.tsx:199` and `F1SpatialModel.tsx:336`. Inline `style` sets `left`, `width`, and `top` as percentages, so `transition-all` animates those.

```tsx
/* components/layout/AppShell.tsx:38 — current */
                  "absolute left-0 h-px bg-fg transition-all duration-200",
                  menuOpen
                    ? "top-1/2 w-5 -translate-y-1/2 rotate-45"
                    : "top-0 w-full",
```

The closed second bar is `w-3.5`; open is `w-5`. Width is a layout property.

```tsx
/* components/work/PhaseCarousel.tsx:176 — current */
                  "h-1.5 rounded-full transition-all",
                  active ? "w-5 bg-fg" : "w-1.5 bg-white/25 hover:bg-white/45",
```

```tsx
/* components/work/Constraints.tsx:349 — current */
            "rounded-[16px] border border-line px-4 py-4 transition-[margin] duration-500",
            endCaption ? "mt-3" : "mt-5",
```

## Target

Animate `transform` and `opacity` only. Reveals that need a clip use `clip-path: inset()`.

Accordion (240ms, under the 300ms UI cap, ease-out):

```tsx
/* target — EvolutionTimeline body */
<AnimatePresence initial={false}>
  {active ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className="grid overflow-hidden"
      style={{ gridTemplateRows: "1fr" }}
    >
      <div className="min-h-0 overflow-hidden">
        <div className="mt-4 rounded-[18px] border border-line bg-card px-5 py-5 md:px-6">
          {/* existing paragraphs */}
        </div>
      </div>
    </motion.div>
  ) : null}
</AnimatePresence>
```

Do not animate `grid-template-rows` with Motion if it still layouts every frame. Use CSS:

```css
/* preferred CSS on the wrapper */
.evolution-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 240ms cubic-bezier(0.22, 1, 0.36, 1),
              opacity 240ms cubic-bezier(0.22, 1, 0.36, 1);
  opacity: 0;
}
.evolution-body[data-open="true"] {
  grid-template-rows: 1fr;
  opacity: 1;
}
.evolution-body > .evolution-body-inner {
  overflow: hidden;
  min-height: 0;
}
```

If you use the CSS path, keep the body mounted and toggle `data-open` so the transition can retarget (better than AnimatePresence + height). Under reduced motion (after plan 001): no grid-row animation, just show/hide.

```tsx
/* target — F1SpatialModel panels */
"absolute rounded-[7px] border transition-[opacity,border-color,background-color] duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
```

Left / width / top snap. Labels keep their existing `transition-opacity duration-300` but change it to `duration-200`.

```tsx
/* target — hamburger bars: always w-5, transform only */
"absolute left-0 h-px w-5 bg-fg transition-transform duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
// open top:    top-1/2 -translate-y-1/2 rotate-45
// closed top:  top-0
// open bottom: top-1/2 -translate-y-1/2 -rotate-45
// closed bottom: bottom-0  (keep both bars full width; drop w-3.5)
```

Position `top` / `bottom` still changes. Prefer both bars `top-1/2` always and use only `translate` + `rotate`:

```tsx
// top closed:  -translate-y-[7px]   (half of h-3.5)
// top open:    -translate-y-1/2 rotate-45
// bot closed:   translate-y-[7px]
// bot open:    -translate-y-1/2 -rotate-45
```

Both spans: `absolute left-0 top-1/2 h-px w-5 origin-center`.

```tsx
/* target — phase dots */
"h-1.5 rounded-full transition-[width,background-color] duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
```

Width on a 6px-tall pill is a small layout. Accept `width` here only if listed explicitly (not `all`). Prefer `scaleX` from the center if you can keep the hit target: `w-5` always, inactive `scale-x-[0.3] origin-center`. That is the better path.

```tsx
/* target — Constraints cleared box */
"rounded-[16px] border border-line px-4 py-4 mt-5"
```

Drop `transition-[margin]`. Use a single `mt-5`. Do not tween margin.

## Repo conventions to follow

- Curve is `easeOutExpo`: `[0.22, 1, 0.36, 1]` / `cubic-bezier(0.22, 1, 0.36, 1)`.
- `cn()` for class strings.
- `F1Directions.tsx:82` already lists `transition-opacity` instead of `all` — copy that specificity.

## Steps

1. `components/work/EvolutionTimeline.tsx` — replace `height: 0` / `"auto"` with the CSS `grid-template-rows` toggle (keep both step bodies in the tree, `data-open={active}`). Duration `240ms`, curve `cubic-bezier(0.22, 1, 0.36, 1)`. Put the CSS in `app/globals.css` next to `.evolution-fill` as `.evolution-body` / `.evolution-body-inner`. Honor the existing reduced-motion splat (it already zeros transition-duration).
2. `components/work/F1SpatialModel.tsx` — replace every `transition-all duration-500` with `transition-[opacity,border-color,background-color] duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]`. Change label `duration-300` to `duration-200`. Leave the inline `left` / `width` / `top` styles; they must snap.
3. `components/layout/AppShell.tsx` — rewrite the two hamburger spans to the transform-only target (always `w-5`, `top-1/2`, `origin-center`).
4. `components/work/PhaseCarousel.tsx` — replace `transition-all` with always-`w-5` dots using `scale-x-[0.3]` when inactive and `scale-x-100` when active, `transition-transform duration-200` + `transition-colors duration-200`, `origin-center`.
5. `components/work/Constraints.tsx` — remove `transition-[margin] duration-500` and the `endCaption ? "mt-3" : "mt-5"` branch; use `mt-5` always.

## Boundaries

- Do NOT change the autoplay / pause logic in EvolutionTimeline.
- Do NOT change spatial zone math (`left` / `width` percentages).
- Do NOT restyle tab pills.
- Do NOT introduce `transition: all` anywhere.
- If `EvolutionTimeline` no longer uses `height: "auto"`, STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` exits 0. `npm run lint` exits 0.
- **Feel check**:
  - `/interface/world-geography` evolution steps: opening a step does not shove the whole page in a layout-thrashy way. In DevTools Performance, clicking a step should not show long Recalculate Style + Layout spikes from height tweening.
  - Animations panel: accordion properties are `grid-template-rows` and `opacity`, not `height`.
  - `/interface/formula-1` spatial model: switch Zones / Windows / Components. Panels reflow instantly; only opacity and border color ease.
  - Mobile hamburger: bars rotate into an X without the right bar growing from `w-3.5` to `w-5`.
  - Phase carousel dots: inactive dots shrink on the X axis, not by changing layout width if you used `scaleX`.
  - Constraints: the cleared box does not slide when the mid caption appears.
- **Done when**: repo grep for `transition-all` in these five files returns no matches, and no `height: "auto"` animation remains in EvolutionTimeline.
