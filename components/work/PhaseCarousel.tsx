"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

const phases = {
  1: {
    label: "Phase 1 screens",
    layoutId: "phase1-tab",
    slides: [
      {
        src: "/media/world-geography/phase-1/01.png",
        alt: "Grayscale Africa map with the control panel toggles off",
        caption: "First pass: a grayscale map with layers you could turn off.",
      },
      {
        src: "/media/world-geography/phase-1/02.png",
        alt: "Africa map with borders, names, and latitude lines turned on",
        caption: "Borders, names, and coordinates on at once.",
      },
      {
        src: "/media/world-geography/phase-1/03.png",
        alt: "Early physical map prototype with region thumbnails",
        caption: "Physical maps enter. Still a prototype.",
      },
      {
        src: "/media/world-geography/phase-1/04.png",
        alt: "Physical map with Layers and Info panels",
        caption: "Layers and info panels start to look like a teaching tool.",
      },
      {
        src: "/media/world-geography/phase-1/05.png",
        alt: "South America World Geography interface with administrative layer buttons",
        caption: "A real lesson structure: administrative vs geographical features.",
      },
    ],
  },
  2: {
    label: "Phase 2 screens",
    layoutId: "phase2-tab",
    slides: [
      {
        src: "/media/world-geography/phase-2/01.png",
        alt: "United States map with a floating annotation toolbar along the bottom",
        caption: "Quieter chrome: an icon rail, floating tools, the map as the lesson.",
      },
      {
        src: "/media/world-geography/phase-2/02.png",
        alt: "North America map with a Map Layers sidebar and annotation toolbar",
        caption: "Layers listed by name, capitals on, still teaching from the bottom bar.",
      },
      {
        src: "/media/world-geography/phase-2/03.png",
        alt: "United States map with annotation tools moved to a side toolbar",
        caption: "After testing, the toolkit moves to the side so the map stays visible.",
      },
    ],
  },
} as const;

export function PhaseCarousel({
  phase = 1,
}: {
  phase?: 1 | 2 | "1" | "2";
}) {
  const config = phases[Number(phase) === 2 ? 2 : 1];
  const frameRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [bleedW, setBleedW] = useState(0);

  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    function measure() {
      if (!el) return;
      const frame = el.getBoundingClientRect();
      setBleedW(Math.max(el.clientWidth, window.innerWidth - frame.left));
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  function go(next: number) {
    setIndex((next + config.slides.length) % config.slides.length);
  }

  const slide = config.slides[index];

  return (
    <figure
      ref={frameRef}
      className="study-text mt-8 [container-type:inline-size]"
    >
      <div
        className="relative overflow-hidden"
        style={{ width: bleedW || "100%" }}
      >
        <motion.div
          className="flex gap-5"
          animate={{ x: `calc(${-index} * (100cqw + 1.25rem))` }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 280, damping: 34, mass: 0.8 }
          }
        >
          {config.slides.map((item, i) => {
            const active = i === index;
            return (
              <button
                key={item.src}
                type="button"
                aria-label={item.alt}
                aria-current={active ? "true" : undefined}
                onClick={() => setIndex(i)}
                className="w-[100cqw] shrink-0 text-left"
              >
                <div
                  className={cn(
                    "overflow-hidden rounded-[18px] border border-line bg-[#ececec] transition-opacity duration-500",
                    active ? "opacity-100" : "opacity-45",
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={1024}
                    height={711}
                    className="aspect-[16/10] h-auto w-full object-cover object-top"
                  />
                </div>
              </button>
            );
          })}
        </motion.div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent md:w-36"
        />
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous screen"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-muted hover:text-fg"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>

        <div
          role="tablist"
          aria-label={config.label}
          className="flex min-w-0 flex-1 justify-center gap-1.5"
        >
          {config.slides.map((item, i) => {
            const active = i === index;
            return (
              <button
                key={item.src}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Screen ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 w-5 origin-center rounded-full transition-[transform,background-color] duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                  active ? "scale-x-100 bg-fg" : "scale-x-[0.3] bg-white/25 hover:bg-white/45",
                )}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next screen"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-muted hover:text-fg"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <figcaption className="mt-4 text-center text-[15px] leading-relaxed text-muted">
        {slide.caption}
      </figcaption>
    </figure>
  );
}
