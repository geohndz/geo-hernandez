# 007 — Add press feedback to the Email CTA

- **Status**: DONE
- **Commit**: 871103c
- **Severity**: LOW
- **Category**: Physicality & origin
- **Estimated scope**: 1–2 files, small

## Problem

The primary CTA confirms hover with opacity and does nothing on press. Press feedback is `scale(0.97)` at 160ms ease-out.

```tsx
/* components/layout/FooterCta.tsx:18 — current */
            <a
              href={`mailto:${site.email}`}
              className="rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-80"
            >
              Email
            </a>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-white/30"
            >
              LinkedIn
            </a>
```

## Target

Reuse `.press-scale` from plan 005 if it exists. If `app/globals.css` does not yet define it, add exactly this:

```css
.press-scale {
  transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
              background-color 180ms ease,
              opacity 180ms ease,
              border-color 180ms ease;
}
.press-scale:active {
  transform: scale(0.97);
}

@media (prefers-reduced-motion: reduce) {
  .press-scale:active {
    transform: none;
  }
}

@media (hover: hover) and (pointer: fine) {
  .cta-email:hover {
    opacity: 0.8;
  }
  .cta-linkedin:hover {
    border-color: rgb(255 255 255 / 0.3);
  }
}
```

```tsx
/* target */
            <a
              href={`mailto:${site.email}`}
              className="cta-email press-scale rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg"
            >
              Email
            </a>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="cta-linkedin press-scale rounded-full border border-line px-5 py-2.5 text-sm font-medium text-fg"
            >
              LinkedIn
            </a>
```

Hover opacity/border moves into the fine-pointer query so tap does not stick a hover. Both links get press scale (Email is required; LinkedIn matches so the pair feels the same). Scale stays in 0.95–0.98.

## Repo conventions to follow

- Footer stays a server component. Do not add `"use client"` or Motion here.
- Prefer the shared `.press-scale` class from plan 005 over a one-off Tailwind `active:scale-[0.97]`.
- Do not wrap the footer in extra Reveal delays.

## Steps

1. Confirm `.press-scale` in `app/globals.css`. If missing, add the target CSS (safe to merge with plan 005’s block — do not duplicate the class).
2. `components/layout/FooterCta.tsx` — replace the two `<a>` classNames with the target. Drop `transition-opacity hover:opacity-80` and `transition-colors hover:border-white/30`.

## Boundaries

- Do NOT restyle the dino, heading, or Reveal wrapper.
- Do NOT add hover scale.
- Do NOT change `mailto` or LinkedIn URLs.
- If FooterCta markup has changed, STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` exits 0. `npm run lint` exits 0.
- **Feel check**:
  - Scroll to the footer on `/`. Mouse-down on Email: the pill shrinks to 0.97 and eases back on release. Duration feels like a tap, not a bounce.
  - LinkedIn matches.
  - iPhone tap: no lingering opacity-80 or thick border after the finger lifts.
  - Animations panel at 10%: `transform` 160ms, curve starts fast (ease-out).
  - `prefers-reduced-motion: reduce`: no scale. Links still work.
- **Done when**: both footer links include `press-scale` and `:active` is `scale(0.97)`.
