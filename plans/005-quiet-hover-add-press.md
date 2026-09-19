# 005 — Quiet card hovers and drop play-button scale

- **Status**: DONE
- **Commit**: 871103c
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Estimated scope**: 8 files, medium

## Problem

The same hover recipe is applied across cards and play controls: `scale(1.05)` or image `scale-[1.04]` over 500–700ms, with no fine-pointer gate. Touch can latch a hover scale. There is no `:active` press feedback.

```tsx
/* components/work/CardVideo.tsx:60 — current */
        className="absolute bottom-3.5 right-3.5 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[var(--line)] text-white backdrop-blur-[6px] transition-[transform,background-color] duration-200 hover:scale-105 hover:bg-[var(--line-strong)]"
```

```tsx
/* components/work/VisorVideo.tsx:204 — current */
          className="pointer-events-auto absolute z-[2] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[var(--line)] text-white backdrop-blur-[6px] transition-[transform,background-color] duration-200 hover:scale-105 hover:bg-[var(--line-strong)]"
```

```tsx
/* components/work/PhoneShowcase.tsx:11 — current */
const playButtonClass =
  "pointer-events-auto z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[var(--line)] text-white backdrop-blur-[6px] transition-[transform,background-color] duration-200 hover:scale-105 hover:bg-[var(--line-strong)]";
```

```tsx
/* components/work/DeviceShowcase.tsx:86 — current */
      className={cn(playButtonClass, "absolute bottom-4 right-4 h-10 w-10 rounded-full hover:scale-105")}
```

(`DeviceShowcase.tsx:113` repeats `hover:scale-105`. The shared `playButtonClass` at line 22 already has the color transition.)

```tsx
/* components/work/ProjectCard.tsx:24 — current */
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
```

```tsx
/* components/work/ProjectCard.tsx:69 — current */
    <article className="group overflow-hidden rounded-[24px] border border-line bg-card transition-[border-color,transform,background] duration-500 hover:-translate-y-0.5 hover:border-white/20 hover:[background-image:linear-gradient(145deg,#2a1848_0%,#1a1428_46%,transparent_100%)]">
```

```tsx
/* components/home/FeaturedStudyCard.tsx:23 — current */
      <article className="overflow-hidden rounded-[24px] border border-line bg-card transition-[border-color,transform,background] duration-500 group-hover:-translate-y-0.5 group-hover:border-line-strong group-hover:[background-image:linear-gradient(145deg,#2a1848_0%,#1a1428_46%,transparent_100%)]">
```

```tsx
/* components/home/FeaturedStudyCard.tsx:28 — current */
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
```

```tsx
/* components/work/ExplorationDeviceCard.tsx:53 — current */
            "group transition-[border-color,transform,background] duration-500 hover:-translate-y-0.5 hover:border-line-strong",
```

```ts
/* lib/chip-accents.ts:42 — current */
    "transition-[border-color,background-color,color] duration-500 group-hover:border-[#c4b5fd] group-hover:bg-[#2a1848] group-hover:text-[#f3edff]",
```

Every string in `chipAccents` and `chipCategoryHover` uses `duration-500`.

## Target

Hover / color change uses `ease` and 150–200ms. Press uses `scale(0.97)` at 160ms ease-out. Hover motion is gated to fine pointers.

Add one utility in `app/globals.css` (do not invent a second motion file):

```css
/* app/globals.css — add after the reduced-motion block */
@media (hover: hover) and (pointer: fine) {
  .hover-card:hover {
    transform: translateY(-2px);
  }
  .hover-media:hover,
  .group:hover .hover-media {
    transform: scale(1.02);
  }
}

.press-scale {
  transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
              background-color 180ms ease;
}
.press-scale:active {
  transform: scale(0.97);
}

@media (prefers-reduced-motion: reduce) {
  .hover-card:hover,
  .hover-media,
  .group:hover .hover-media,
  .press-scale:active {
    transform: none;
  }
}
```

`0.23, 1, 0.32, 1` is the strong ease-out for press. Color stays `ease` at 180ms (`duration-200` in Tailwind is the nearest token — use `duration-200`).

Play buttons:

- Delete every `hover:scale-105`.
- Keep `transition-[background-color] duration-200` (or the `press-scale` class).
- Add `press-scale` so `:active` is `scale(0.97)`.

Cards:

- Remove `hover:-translate-y-0.5` / `group-hover:-translate-y-0.5` from Tailwind (those fire on touch). Add class `hover-card` so only fine-pointer hover lifts 2px.
- Change card chrome transition to `transition-[border-color,background] duration-200`.
- Image zoom: replace `duration-700 group-hover:scale-[1.04]` with class `hover-media` and `transition-transform duration-200`. Scale is 1.02, not 1.04, and only inside the fine-pointer query.

Chips:

- In `chipAccents` and `chipCategoryHover`, replace `duration-500` with `duration-200` on every string. Do not change colors.

## Repo conventions to follow

- `cn()` for composing classes.
- Chip strings are the existing pattern — only the duration token changes.
- Do not add `hover:` scale utilities back. The gate must be the `@media (hover: hover) and (pointer: fine)` block.

## Steps

1. Add the CSS block above to `app/globals.css`.
2. `CardVideo.tsx:60` — drop `hover:scale-105` and `transition-[transform,background-color]`; use `press-scale hover:bg-[var(--line-strong)]`.
3. `VisorVideo.tsx:204` — same as CardVideo.
4. `PhoneShowcase.tsx:11` — remove `hover:scale-105` from `playButtonClass`; add `press-scale`.
5. `DeviceShowcase.tsx` — remove `hover:scale-105` from the two className concatenations (lines 86 and 113). Add `press-scale` to `playButtonClass` (line 22).
6. `ProjectCard.tsx` — article: `hover-card transition-[border-color,background] duration-200` plus the existing hover border/gradient classes. Images/video: `hover-media transition-transform duration-200` (drop `duration-700 group-hover:scale-[1.04]`).
7. `FeaturedStudyCard.tsx` — same as ProjectCard.
8. `ExplorationDeviceCard.tsx` — replace `transition-[border-color,transform,background] duration-500 hover:-translate-y-0.5` with `hover-card transition-[border-color,background] duration-200`.
9. `lib/chip-accents.ts` — replace all `duration-500` with `duration-200` in `chipAccents` and `chipCategoryHover`.

## Boundaries

- Do NOT change FolderCard sheet fanning (`components/home/FolderCard.tsx`) — that is a deliberate delight moment.
- Do NOT add press scale to the Email CTA here (plan 007).
- Do NOT change play/pause icon swapping (plan 008).
- Do NOT change `FeaturedDeviceCard` unless it still has `duration-500` hover lift — if it only transitions border/background, leave it, but switch `duration-500` to `duration-200`.
- If `hover:scale-105` is already gone, STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` exits 0. `npm run lint` exits 0. Grep `hover:scale-105` returns no matches.
- **Feel check**:
  - Desktop mouse: card lift is a 2px nudge over ~180ms, not a 500ms float. Image zoom is barely visible (1.02).
  - Press a play button: it scales to 0.97 and returns. Hovering it does not enlarge it.
  - Chrome device mode, iPhone, tap a card: no stuck hover lift or image scale after the tap.
  - Animations panel at 10%: press is 160ms on `transform` only.
  - `prefers-reduced-motion: reduce`: no lift, no zoom, no press scale. Background/border color may still change.
- **Done when**: no `hover:scale-105`, no `duration-700` image zoom, no `duration-500` on chips or these card hovers, and play buttons use `.press-scale`.
