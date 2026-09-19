# Animation plans

Stamped against `871103c`. One plan per finding (duration tokens + fadeUp/pageFade merged). All ten plans landed.

| # | Title | Severity | Status | Depends on |
| --- | --- | --- | --- | --- |
| 001 | Wire prefers-reduced-motion through Motion.js | HIGH | DONE | — |
| 002 | Shorten fadeUp, pageFade, and stagger tokens | HIGH | DONE | — |
| 003 | Crossfade case-study tab content | MEDIUM | DONE | — |
| 004 | Stop animating layout properties | MEDIUM | DONE | — |
| 005 | Quiet card hovers and drop play-button scale | MEDIUM | DONE | — |
| 006 | Stop Revealing every about paragraph | LOW | DONE | 002 (uses the new fadeUp; still delete the wrappers) |
| 007 | Add press feedback to the Email CTA | LOW | DONE | 005 (`.press-scale`) |
| 008 | Crossfade play / pause icons | LOW | DONE | 005 (do not reintroduce hover scale) |
| 009 | Crossfade the research-board sort mode | LOW | DONE | 001 (RM branch on the new wrapper) |
| 010 | Pause about-sticker bob on hover | LOW | DONE | — |

## Execution order

1. **001** then **002** — accessibility first, then the tokens every enter reads.
2. **005** — shared CSS (`.press-scale`, fine-pointer hover) that 007 and 008 reuse.
3. **003**, **004** — independent; can run in parallel after 001.
4. **006** — one-file follow-up to 002.
5. **007**, **008** — after 005.
6. **009** — after 001 so the new wrapper honors reduced motion.
7. **010** — anytime; no token dependency.

`001` and `002` both touch `app/template.tsx`. Do 001 first (RM branch), then 002 (drop `y` and the transform strip) on whatever 001 left behind.

`005` and `008` both touch play buttons. Do 005 first (classes), then 008 (glyph swap only).

## How to run

Any agent: open `plans/NNN-*.md` and execute it in a worktree. The plan is self-contained — do not read this conversation. After a plan lands, mark its Status **DONE** here.
