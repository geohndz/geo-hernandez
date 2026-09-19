"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { InViewVideo } from "@/components/work/InViewVideo";

function QuoteLine({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 border-l border-white/80 pl-5 text-[18px] font-medium leading-snug tracking-tight text-fg md:text-[20px]">
      {children}
    </p>
  );
}

const tools = [
  {
    tab: "Drawing",
    body: "Circle a river, trace a coastline, or sketch a route so the class can follow the lesson on the map itself.",
    src: "/media/world-geography/tools/drawing.mp4",
    alt: "Cursor selecting the pen and circling São Francisco River on the map",
  },
  {
    tab: "Text",
    body: "Add a label as you go: a definition, a quiz prompt, or the next feature to find, without leaving the map.",
    src: "/media/world-geography/tools/text.mp4",
    alt: "Cursor placing a purple Add text label on the map",
  },
  {
    tab: "Pins",
    body: "Drop a marker on a city, a people group, or a student's guess so everyone is looking at the same point.",
    src: "/media/world-geography/tools/pins.mp4",
    alt: "Cursor dropping a blue pin onto the terrain map",
  },
  {
    tab: "Shape",
    body: "Fill a region, an elevation band, or a flood zone so the class can see the boundary you are about to talk through.",
    src: "/media/world-geography/tools/shape.mp4",
    alt: "Cursor clicking vertices to build a filled region on the map",
  },
] as const;

function ToolkitGallery() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  return (
    <div className="mt-8">
      <div
        role="tablist"
        aria-label="Annotation tools"
        className="mx-auto mb-6 grid w-max max-w-full grid-flow-col auto-cols-fr rounded-lg border border-line bg-card p-1"
      >
        {tools.map((item, i) => {
          const active = i === index;
          return (
            <button
              key={item.tab}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setIndex(i)}
              className={cn(
                "relative rounded-lg px-3 py-1.5 text-center text-[13px] font-medium transition-colors md:px-4",
                active ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              {active ? (
                reduce ? (
                  <span className="absolute inset-0 rounded-lg bg-white/[0.06]" />
                ) : (
                  <motion.span
                    layoutId="toolkit-tab"
                    className="absolute inset-0 rounded-lg bg-white/[0.06]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )
              ) : null}
              <span className="relative z-10 whitespace-nowrap">{item.tab}</span>
            </button>
          );
        })}
      </div>

      <div className="relative overflow-hidden rounded-[20px] border border-line bg-[#cfe8f4]">
        {tools.map((item, i) => (
          <div
            key={item.src}
            className={cn(
              i === 0 ? "relative" : "absolute inset-0",
              "transition-[opacity,transform] duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:transition-none",
              i === index
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-1.5 opacity-0",
            )}
          >
            <InViewVideo
              src={`${item.src}?v=2`}
              alt={item.alt}
              active={i === index}
              className="block h-auto w-full"
              onEnded={
                i === index
                  ? () => setIndex((value) => (value + 1) % tools.length)
                  : undefined
              }
            />
          </div>
        ))}
      </div>

      <div className="study-text relative mx-auto mt-6 min-h-[4.5rem] text-center">
        {tools.map((item, i) => (
          <p
            key={item.tab}
            aria-hidden={i !== index}
            className={cn(
              "text-[16px] leading-[1.75] text-muted transition-[opacity,transform] duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:transition-none",
              i === index
                ? "relative translate-y-0 opacity-100"
                : "pointer-events-none absolute inset-x-0 top-0 translate-y-1.5 opacity-0",
            )}
          >
            {item.body}
          </p>
        ))}
      </div>
    </div>
  );
}

export function TeacherTools() {
  return (
    <div className="mt-2">
      <p className="study-text text-center text-[16px] leading-[1.75] text-muted">
        After the year off, I came back asking what a teacher would want to do
        during class, not what the map should do.
      </p>

      <div className="study-text study-card mt-8 px-6 py-6 md:px-8 md:py-7">
        <p className="text-[15px] text-muted">Instead of asking:</p>
        <QuoteLine>What should the map do?</QuoteLine>
        <p className="mt-8 text-[15px] text-muted">I asked:</p>
        <QuoteLine>What would a teacher want to do during class?</QuoteLine>
      </div>

      <div className="study-text mt-12 text-center">
        <h3 className="font-display text-[22px] font-medium tracking-tight text-fg md:text-[26px]">
          Annotation Toolkit
        </h3>
        <p className="mt-4 text-[16px] leading-[1.75] text-muted">
          I borrowed the spirit of Figma and FigJam: a small, reusable set of
          tools you don&apos;t have to think about, aimed at a lesson instead of
          a design file.
        </p>
      </div>

      <ToolkitGallery />

      <div className="study-text mt-12">
        <h3 className="font-display text-[22px] font-medium tracking-tight text-fg md:text-[26px]">
          User Testing
        </h3>
        <p className="mt-4 text-[16px] leading-[1.75] text-muted">
          The first toolbar sat along the bottom and covered the exact coastline
          teachers needed. Moving it to the side was an unglamorous fix that
          made the map readable from the back of the room.
        </p>
        <div className="study-card mt-8 px-6 py-6 md:px-8 md:py-7">
          <p className="text-[15px] text-muted">Outcome</p>
          <QuoteLine>
            The advanced tools stayed. They just stopped competing with South
            America.
          </QuoteLine>
        </div>
      </div>
    </div>
  );
}
