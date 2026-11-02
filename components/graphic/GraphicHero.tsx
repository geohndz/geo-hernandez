"use client";

import Image from "next/image";
import { useState } from "react";
import { PlayPauseGlyph } from "@/components/work/PlayPauseGlyph";
import { cn } from "@/lib/cn";
import { graphic, projectPoster, type GraphicProject } from "@/content/graphic";

const float = [
  { y: 10, rot: -6.5, bob: -14, sway: 7, dur: 5.8, delay: 0.1, w: 200 },
  { y: 46, rot: 4.5, bob: 12, sway: -6, dur: 7.2, delay: 1.3, w: 150 },
  { y: 22, rot: -3, bob: -10, sway: 5, dur: 4.9, delay: 0.6, w: 176 },
  { y: 54, rot: 7, bob: 13, sway: -8, dur: 6.4, delay: 2.2, w: 140 },
  { y: 6, rot: -4.5, bob: -16, sway: 4, dur: 8.1, delay: 0.8, w: 216 },
  { y: 36, rot: 3.5, bob: 10, sway: -5, dur: 5.3, delay: 1.7, w: 162 },
  { y: 18, rot: -8, bob: -12, sway: 8, dur: 6.9, delay: 0.4, w: 188 },
  { y: 42, rot: 5.5, bob: 14, sway: -4, dur: 7.6, delay: 2.5, w: 136 },
] as const;

export function GraphicHero({ projects }: { projects: GraphicProject[] }) {
  const [paused, setPaused] = useState(false);
  const posters = projects.flatMap((project) => {
    const poster = projectPoster(project);
    return poster ? [{ title: project.title, ...poster }] : [];
  });
  const sets = [0, 1] as const;

  return (
    <section className="relative flex min-h-[calc(100dvh-3.5rem)] flex-col overflow-hidden">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col px-5 pb-8 pt-12 md:px-10 md:pb-10 md:pt-16 lg:px-14">
        <p className="text-[1.35rem] font-medium tracking-[-0.03em] md:text-[1.65rem]">
          {graphic.name}
        </p>
        <h1 className="mt-5 font-bold leading-[0.96] tracking-[-0.045em] text-[clamp(1.85rem,6.2vw,5.25rem)] md:mt-6">
          {graphic.headline[0]}
          <br />
          {graphic.headline[1]}
        </h1>
        <p className="mt-8 max-w-[34rem] text-[1.05rem] leading-[1.5] text-[var(--gd-muted)] md:mt-10 md:text-[1.2rem]">
          {graphic.intro}
        </p>
      </div>

      <button
        type="button"
        aria-pressed={paused}
        aria-label={paused ? "Play" : "Pause"}
        onClick={() => setPaused((value) => !value)}
        className="absolute bottom-4 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--gd-rule)] bg-[var(--gd-paper)] text-[var(--gd-ink)] shadow-[0_8px_24px_rgba(18,18,18,0.12)] hover:border-[var(--gd-ink)] md:bottom-6 md:right-6"
      >
        <PlayPauseGlyph playing={!paused} />
      </button>

      <div className="gd-float-lane mt-auto min-h-0 flex-1" aria-hidden="true">
        <div className={cn("gd-float-track flex w-max items-end", paused && "is-paused")}>
          {sets.map((copy) => (
            <div key={copy} className="flex shrink-0 items-end gap-6 pr-6 md:gap-10 md:pr-10">
              {posters.map((poster, i) => {
                const spec = float[i % float.length];
                return (
                  <div
                    key={`${copy}-${poster.src}`}
                    className="gd-float-card shrink-0"
                    style={{
                      ["--gd-w" as string]: `${spec.w}px`,
                      ["--gd-y" as string]: `${spec.y}px`,
                      ["--gd-rot" as string]: `${spec.rot}deg`,
                      ["--gd-bob" as string]: `${spec.bob}px`,
                      ["--gd-sway" as string]: `${spec.sway}px`,
                      ["--gd-bob-dur" as string]: `${spec.dur}s`,
                      ["--gd-bob-delay" as string]: `${spec.delay}s`,
                    }}
                  >
                    <div className="gd-float-bob">
                      <Image
                        src={poster.src}
                        alt=""
                        width={poster.width}
                        height={poster.height}
                        sizes="230px"
                        priority={copy === 0 && i < 4}
                        className="h-auto w-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
