# 006 — Stop Revealing every about paragraph

- **Status**: DONE
- **Commit**: 871103c
- **Severity**: LOW
- **Category**: Purpose & frequency
- **Estimated scope**: 1 file, small

## Problem

The about lead already Reveals. Every following paragraph also Reveals, so body copy fades in while the user is trying to read it. Motion on text-only blocks whose only purpose is the entrance itself is not allowed.

```tsx
/* app/about/page.tsx:22 — current (keep) */
            <Reveal className="order-1 min-w-0 md:col-start-1 md:row-start-1">
              <h1 className="max-w-xl font-display text-[34px] font-medium leading-[1.15] tracking-[-0.04em] md:text-[46px]">
                {lead}
              </h1>
            </Reveal>
```

```tsx
/* app/about/page.tsx:36 — current (remove) */
                {rest.map((p) => (
                  <Reveal key={p}>
                    <p>{p}</p>
                  </Reveal>
                ))}
```

Section headings and testimonial cards also wrap in `Reveal` (`app/about/page.tsx:49`, `60`, `67`). Those are headings and cards, not body paragraphs. Leave them.

## Target

Paragraphs in `rest` render as static `<p>` elements. No `whileInView`. First paint is readable.

```tsx
/* target */
              <div className="space-y-5 text-[16px] leading-[1.75] text-muted md:text-[17px]">
                {rest.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
```

Keep the lead `Reveal`. Keep Achievement / Words headings and testimonial `Reveal`s.

## Repo conventions to follow

- `Reveal` from `@/components/motion/Reveal` stays the only enter primitive.
- After plan 002, `fadeUp` is 280ms / `y: 8`. That is still too much for body copy — deleting the wrapper is the fix, not retuning it.

## Steps

1. `app/about/page.tsx` — replace the `rest.map` Reveal wrappers with the target block. No other edits.

## Boundaries

- Do NOT remove Reveal from the lead `h1`, Achievements heading, Words heading, or testimonial cards.
- Do NOT edit `Reveal.tsx`.
- Do NOT change AboutPortrait motion.
- If `rest.map` is already static, STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` exits 0. `npm run lint` exits 0.
- **Feel check**:
  - Load `/about`. The four body paragraphs under the portrait are visible immediately, with no fade-up as they enter the viewport.
  - The lead sentence may still fade (280ms after plan 002). That is intended.
  - Scroll to Achievements: the heading may still Reveal. Award rows are unchanged.
- **Done when**: `app/about/page.tsx` has no `<Reveal>` inside the `rest.map` loop.
