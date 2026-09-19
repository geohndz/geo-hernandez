"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

const DURATION = 10000;
const LAST = 2;

const steps = [
  {
    id: "phase-1",
    kicker: "Phase 1",
    title: "Defining the MVP",
    body: [
      "Three of us started by asking for the smallest thing we could ship that still served the new curriculum. Layered maps got us there technically.",
      "In class, though, teachers could look — they still couldn't teach. No drawing, no pinning, no way to run the activity on the map itself.",
    ],
  },
  {
    id: "pause",
    kicker: "Pause",
    title: "A one-year halt",
    body: [
      "Then the third-party maps failed a curriculum review, and work stopped for about a year.",
      "When it came back, I was the only designer on it — which meant I also owned what it should become.",
    ],
  },
  {
    id: "phase-2",
    kicker: "Phase 2",
    title: "Designing for the Classroom",
    body: [
      "I stopped designing a map product and started designing for a class period. Teachers needed the layers, yes, but they needed a pen, a pin, and a way to build an exercise without leaving the map.",
      "Navigation got quieter, the layout left room for those tools, and the interface started to feel like something you'd actually project on a classroom wall.",
    ],
  },
] as const;

export function EvolutionTimeline() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const wrapRef = useRef<HTMLElement>(null);
  const hoveringRef = useRef(false);
  const timeoutRef = useRef(0);
  const remainingRef = useRef(DURATION);
  const lastStartRef = useRef(0);
  const visibleRef = useRef(false);

  function clearClock() {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = 0;
  }

  function pauseClock() {
    if (lastStartRef.current) {
      remainingRef.current = Math.max(
        0,
        remainingRef.current - (performance.now() - lastStartRef.current),
      );
      lastStartRef.current = 0;
    }
    clearClock();
  }

  function resumeClock() {
    if (!visibleRef.current || paused || hoveringRef.current) return;
    clearClock();
    lastStartRef.current = performance.now();
    timeoutRef.current = window.setTimeout(() => {
      remainingRef.current = DURATION;
      lastStartRef.current = 0;
      setIndex((current) => (current === LAST ? 0 : current + 1));
    }, remainingRef.current);
  }

  useEffect(() => {
    remainingRef.current = DURATION;
    lastStartRef.current = 0;

    const el = wrapRef.current;
    if (!el || paused) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) resumeClock();
        else pauseClock();
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearClock();
      lastStartRef.current = 0;
    };
  }, [paused, index]);

  function select(next: number) {
    setPaused(true);
    pauseClock();
    setIndex(next);
  }

  return (
    <figure
      ref={wrapRef}
      className="study-text mt-8"
      onMouseEnter={() => {
        hoveringRef.current = true;
        setHovering(true);
        pauseClock();
      }}
      onMouseLeave={() => {
        hoveringRef.current = false;
        setHovering(false);
        resumeClock();
      }}
    >
      <ol className="relative">
        {steps.map((item, i) => {
          const active = i === index;
          const done = i < index;
          return (
            <li key={item.id} className={cn("relative pl-8", i < steps.length - 1 && "pb-8")}>
              <div
                className={cn(
                  "absolute left-[5px] bottom-0 w-px bg-line",
                  i === 0 ? "top-[11px]" : "top-0",
                )}
              >
                {active && !paused ? (
                  <div
                    className={cn("absolute inset-0 bg-fg evolution-fill", hovering && "is-paused")}
                    style={{ "--evolution-duration": `${DURATION}ms` } as CSSProperties}
                  />
                ) : done || active ? (
                  <div className="absolute inset-0 bg-fg" />
                ) : null}
              </div>
              <span
                className={cn(
                  "absolute left-0 top-1.5 z-10 h-2.5 w-2.5 rounded-full border transition-colors",
                  active || done ? "border-fg bg-fg" : "border-line-strong bg-bg",
                )}
              />
              <button
                type="button"
                onClick={() => select(i)}
                className="block w-full text-left"
                aria-expanded={active}
                aria-current={active ? "step" : undefined}
              >
                <p
                  className={cn(
                    "text-[11px] uppercase tracking-[0.16em] transition-colors",
                    active ? "text-fg" : "text-dim",
                  )}
                >
                  {item.kicker}
                </p>
                <h3
                  className={cn(
                    "mt-1 font-display text-[23px] tracking-tight transition-colors md:text-[27px]",
                    active ? "text-fg" : "text-muted",
                  )}
                >
                  {item.title}
                </h3>
              </button>

              {reduce ? (
                active ? (
                  <div className="mt-4 rounded-[18px] border border-line bg-card px-5 py-5 md:px-6">
                    {item.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="mt-3 text-[15px] leading-relaxed text-muted first:mt-0 md:text-[16px] md:leading-[1.75]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : null
              ) : (
                <div className="evolution-body" data-open={active}>
                  <div className="evolution-body-inner">
                    <div className="mt-4 rounded-[18px] border border-line bg-card px-5 py-5 md:px-6">
                      {item.body.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="mt-3 text-[15px] leading-relaxed text-muted first:mt-0 md:text-[16px] md:leading-[1.75]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
