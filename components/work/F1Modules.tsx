"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";

const modules = [
  {
    tab: "Leaderboard",
    src: "/media/formula-1/modules/leaderboard.png",
    alt: "Live leaderboard for lap 36 of 52 with gaps, team marks, and tire compounds",
    body: "Standings live in the left zone for the whole race. Position, gap, and compound stay readable at a glance, because the component never has to invent a new place to sit.",
  },
  {
    tab: "Radio",
    src: "/media/formula-1/modules/radio.png",
    alt: "Now Listening To module in collapsed, commentary, and team-radio states",
    body: "Commentary and team radio share one window. Collapse it to a waveform, or open the transcription when you actually need the words.",
  },
  {
    tab: "Cameras",
    src: "/media/formula-1/modules/cameras.png",
    alt: "Onboard camera browser with Broadcast, Onboards, Track, and Aerial tabs",
    body: "The camera browser sits under the stream, so switching an onboard is a glance down, not a hunt. Broadcast, onboards, track, and aerial stay in the same strip.",
  },
  {
    tab: "Driver",
    src: "/media/formula-1/modules/driver.png",
    alt: "Driver profiles for George Russell and Kimi Antonelli beside the Mercedes team panel",
    body: "The right zone holds whoever is on screen: driver bio and stats, or the team, without leaving the race. Tabs swap the content. The window stays put.",
  },
  {
    tab: "Race control",
    src: "/media/formula-1/modules/flags.png",
    alt: "Race-control banners for safety car, fastest lap, red flag, and yellow flag",
    body: "Flags, safety cars, and fastest laps sit outside the boundary on purpose. They can interrupt you without rearranging the layout you already learned.",
  },
] as const;

export function F1Modules() {
  const [index, setIndex] = useState(0);
  const module = modules[index];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Final modules"
        className="mx-auto mb-4 grid w-max max-w-full grid-flow-col auto-cols-fr rounded-lg border border-line bg-card p-1"
      >
        {modules.map((item, i) => {
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
                <motion.span
                  layoutId="f1-module-tab"
                  className="absolute inset-0 rounded-lg bg-white/[0.06]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              ) : null}
              <span className="relative z-10 whitespace-nowrap">{item.tab}</span>
            </button>
          );
        })}
      </div>

      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px] border border-line bg-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={module.src}
          src={module.src}
          alt={module.alt}
          className="absolute inset-0 m-auto max-h-[78%] max-w-[82%] object-contain"
        />
      </div>

      <p className="study-text mx-auto mt-6 text-center text-[16px] leading-[1.75] text-muted">
        {module.body}
      </p>
    </div>
  );
}
