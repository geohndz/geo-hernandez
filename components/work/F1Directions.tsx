"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CircleCheck, CircleX } from "lucide-react";
import { cn } from "@/lib/cn";

const directions = [
  {
    tab: "F1 Broadcast",
    title: "F1 Broadcast Style",
    src: "/media/formula-1/directions/f1-broadcast.png",
    alt: "Dense F1-branded spatial dashboard overlaid on a living room",
    pros: ["Familiar", "Brand aligned"],
    cons: ["Dense", "Visually noisy"],
  },
  {
    tab: "General Racing",
    title: "General Racing Interface",
    src: "/media/formula-1/directions/general-racing.png",
    alt: "Cleaner general racing dashboard with quieter chrome",
    pros: ["Cleaner hierarchy", "More modern"],
    cons: ["Less distinctive"],
  },
  {
    tab: "VisionOS",
    title: "VisionOS Inspired",
    src: "/media/formula-1/directions/visionos.png",
    alt: "Translucent VisionOS-style panels floating in a living room",
    pros: ["Spatially native", "Elegant"],
    cons: ["Risked prioritizing aesthetics over usability"],
  },
] as const;

export function F1VisualDirections() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  return (
    <div>
      <div
        role="tablist"
        aria-label="Visual directions"
        className="mx-auto mb-4 grid w-max max-w-full grid-flow-col auto-cols-fr rounded-lg border border-line bg-card p-1"
      >
        {directions.map((item, i) => {
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
                    layoutId="f1-direction-tab"
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

      <div className="relative aspect-[1024/484] w-full">
        {directions.map((item, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={item.src}
            src={item.src}
            alt={item.alt}
            aria-hidden={i !== index}
            className={cn(
              "pointer-events-none absolute inset-0 h-full w-full object-contain transition-[opacity,transform] duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:transition-none",
              i === index
                ? "translate-y-0 opacity-100"
                : "translate-y-1.5 opacity-0",
            )}
          />
        ))}
      </div>

      <div className="relative mt-3 min-h-[7.5rem]">
        {directions.map((item, i) => (
          <div
            key={item.tab}
            aria-hidden={i !== index}
            className={cn(
              "grid gap-3 sm:grid-cols-2 transition-[opacity,transform] duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:transition-none",
              i === index
                ? "relative translate-y-0 opacity-100"
                : "pointer-events-none absolute inset-x-0 top-0 translate-y-1.5 opacity-0",
            )}
          >
            <div className="pair-solution rounded-[14px] px-4 py-4">
              <ul className="space-y-2.5">
                {item.pros.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-3 text-[15px] leading-relaxed"
                  >
                    <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#b6f0c8]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pair-challenge rounded-[14px] px-4 py-4">
              <ul className="space-y-2.5">
                {item.cons.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-3 text-[15px] leading-relaxed"
                  >
                    <CircleX className="mt-0.5 h-4 w-4 shrink-0 text-[#ffc4c4]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
