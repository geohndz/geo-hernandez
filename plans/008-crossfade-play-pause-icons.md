# 008 — Crossfade play / pause icons

- **Status**: DONE
- **Commit**: 871103c
- **Severity**: LOW
- **Category**: Physicality & origin
- **Estimated scope**: 4 files, small

## Problem

Play and pause icons swap in one frame. Icon swaps should animate opacity + scale so the state change is visible.

```tsx
/* components/work/CardVideo.tsx:62 — current */
        {playing ? <PauseIcon /> : <PlayIcon />}
```

```tsx
/* components/work/DeviceShowcase.tsx:88 — current */
      {playing ? <PauseIcon /> : <PlayIcon />}
```

Same ternary at `DeviceShowcase.tsx:101`, `DeviceShowcase.tsx:116`, `PhoneShowcase.tsx:109`, `PhoneShowcase.tsx:160`, `VisorVideo.tsx:207`.

```tsx
/* components/work/CardVideo.tsx:68 — current icons */
function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      ...
    </svg>
  );
}
```

## Target

Keep both icons mounted. Crossfade with opacity and `scale(0.96)` → `1` over 160ms ease-out. CSS transitions (not keyframes) so a double-tap retargets.

```tsx
/* target — shared swap */
function PlayPauseGlyph({ playing }: { playing: boolean }) {
  const layer =
    "absolute inset-0 grid place-items-center transition-[opacity,transform] duration-[160ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";
  return (
    <span className="relative block h-4 w-4">
      <span
        className={cn(
          layer,
          playing ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
        )}
      >
        <PauseIcon />
      </span>
      <span
        className={cn(
          layer,
          playing ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100",
        )}
      >
        <PlayIcon />
      </span>
    </span>
  );
}
```

`scale-95` is 0.95 — within 0.9–0.97 (never `scale(0)`). `aria-label` on the button still announces Play/Pause; icons stay `aria-hidden`.

Under reduced motion: `motion-reduce:transition-none` — instant swap, no scale.

## Repo conventions to follow

- Each file already defines local `PlayIcon` / `PauseIcon`. Do not extract a new shared module unless all four files already import from one place (they do not). Copy `PlayPauseGlyph` into each file that has the ternary, or add `components/work/PlayPauseGlyph.tsx` and import it — one new file is allowed if it avoids four copies.
- Use `cn` from `@/lib/cn`.
- Do not change play-button positioning or the `press-scale` work from plan 005.

## Steps

1. Preferred: add `components/work/PlayPauseGlyph.tsx` with the target component plus the existing SVG markup from `CardVideo.tsx:68-86`. Export `PlayPauseGlyph`.
2. `CardVideo.tsx` — replace `{playing ? <PauseIcon /> : <PlayIcon />}` with `<PlayPauseGlyph playing={playing} />`. Delete local icon functions if unused.
3. `DeviceShowcase.tsx` — same replacement at all three ternaries. Delete local icons if unused.
4. `PhoneShowcase.tsx` — same at both ternaries. `paused` is the inverse of playing: pass `playing={!paused}`.
5. `VisorVideo.tsx` — same replacement.

## Boundaries

- Do NOT change autoplay, in-view pause, or click-to-toggle logic.
- Do NOT add hover scale (plan 005 removes it).
- Do NOT animate the button chrome, only the glyph.
- If a file has no play/pause ternary, skip it.

## Verification

- **Mechanical**: `npx tsc --noEmit` exits 0. `npm run lint` exits 0.
- **Feel check**:
  - Home featured study card: click the play control. Pause bars dissolve into the play triangle over ~160ms. Click again. No one-frame blink.
  - Double-click rapidly: the crossfade retargets, it does not restart from invisible.
  - `/interface/formula-1` visor control and `/interface/world-geography` device control match.
  - `prefers-reduced-motion: reduce`: icons swap instantly with no scale.
- **Done when**: no `{playing ? <PauseIcon /> : <PlayIcon />}` (or `paused` equivalent) remains in those four files.
