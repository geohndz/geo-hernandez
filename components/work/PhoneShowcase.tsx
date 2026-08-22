"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { GalleryProject } from "@/content/projects";
import { cn } from "@/lib/cn";
import { isReallyVisible } from "@/lib/in-view";

const STEP_MS = 2000;
const START_MS = 1000;

const playButtonClass =
  "pointer-events-auto z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[var(--line)] text-white backdrop-blur-[6px] transition-[transform,background-color] duration-200 hover:scale-105 hover:bg-[var(--line-strong)]";

export function PhoneShowcase({
  project,
  className,
  controls = "card",
}: {
  project: GalleryProject;
  className?: string;
  controls?: "card" | "device";
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const sequence = project.sequence ?? [];
  const top = project.carousel?.top ?? [];
  const bottom = project.carousel?.bottom ?? [];
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || sequence.length === 0) return;
    let startTimer = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(startTimer);
        if (!entry) return;
        if (isReallyVisible(entry) && !pausedRef.current) {
          startTimer = window.setTimeout(() => setPlaying(true), START_MS);
        } else if (!pausedRef.current) {
          setPlaying(false);
        }
      },
      { threshold: [0, 0.25, 0.5, 1], rootMargin: "-12% 0px" },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(startTimer);
    };
  }, [sequence.length]);

  useEffect(() => {
    if (!playing || paused || sequence.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % sequence.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [playing, paused, sequence.length]);

  function togglePlayback(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    const next = !paused;
    pausedRef.current = next;
    setPaused(next);
    if (next) setPlaying(false);
    else setPlaying(true);
  }

  const phone = (
    <div className="relative w-[42%] max-w-[240px]">
      <span className="absolute -left-[3px] top-[18%] h-8 w-[3px] rounded-l-[1px] bg-[#cfcfcf]" />
      <span className="absolute -left-[3px] top-[28%] h-12 w-[3px] rounded-l-[1px] bg-[#cfcfcf]" />
      <span className="absolute -right-[3px] top-[24%] h-16 w-[3px] rounded-r-[1px] bg-[#cfcfcf]" />
      <div className="rounded-[34px] bg-[linear-gradient(160deg,#f3f3f3_0%,#c8c8c8_42%,#8f8f8f_100%)] p-[2px] shadow-[0_22px_70px_rgba(0,0,0,0.58)]">
        <div className="relative rounded-[32px] bg-black p-[9px]">
          <span className="absolute left-1/2 top-[11px] z-[2] h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-[#1a1a1a] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />
          <div
            className="relative overflow-hidden rounded-[24px] bg-black"
            style={{ aspectRatio: "9 / 19.5" }}
          >
            {sequence.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt=""
                className={cn(
                  "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500",
                  i === index ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
          </div>
        </div>
      </div>
      {controls === "device" ? (
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={paused ? "Play" : "Pause"}
          className={cn(playButtonClass, "absolute bottom-3 left-[calc(100%+12px)]")}
        >
          {paused ? <PlayIcon /> : <PauseIcon />}
        </button>
      ) : null}
    </div>
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "pointer-events-none relative z-[2] h-[440px] overflow-hidden md:h-[600px]",
        className,
      )}
    >
      {project.carousel ? (
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          }}
        >
          <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col gap-3">
            <MarqueeRow images={top} duration="48s" paused={paused} />
            <MarqueeRow images={[...bottom].reverse()} duration="34s" paused={paused} />
          </div>
        </div>
      ) : null}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 48% 58% at 50% 48%, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.42) 38%, transparent 72%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 py-7 md:px-10 md:py-9">
        {phone}
      </div>

      {controls === "card" ? (
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={paused ? "Play" : "Pause"}
          className={cn(playButtonClass, "absolute bottom-4 right-4")}
        >
          {paused ? <PlayIcon /> : <PauseIcon />}
        </button>
      ) : null}
    </div>
  );
}

function tileImages(images: string[], minCount: number) {
  if (images.length === 0) return images;
  const tiled = [...images];
  while (tiled.length < minCount) tiled.push(...images);
  return tiled;
}

function MarqueeRow({
  images,
  duration,
  paused,
}: {
  images: string[];
  duration: string;
  paused: boolean;
}) {
  const tiled = tileImages(images, 10);
  const copies = [tiled, tiled];
  const scale = tiled.length / Math.max(images.length, 1);
  const seconds = `${Number.parseFloat(duration) * scale}s`;

  return (
    <div className="pointer-events-none">
      <div
        className={cn("geo-marquee-track flex w-max", paused && "is-paused")}
        style={{ ["--geo-duration" as string]: seconds }}
      >
        {copies.map((set, copy) => (
          <div key={copy} className="flex shrink-0 gap-3 pr-3">
            {set.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${src}-${copy}-${i}`}
                src={src}
                alt=""
                className="h-[320px] w-auto shrink-0 rounded-[16px] object-cover opacity-[0.72] md:h-[420px]"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <rect x="6.5" y="5.5" width="3.75" height="13" rx="1.2" fill="currentColor" />
      <rect x="13.75" y="5.5" width="3.75" height="13" rx="1.2" fill="currentColor" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        d="M8.2 5.6c0-.7.76-1.12 1.35-.76l9.1 5.4c.58.35.58 1.17 0 1.52l-9.1 5.4c-.59.36-1.35-.06-1.35-.76V5.6Z"
        fill="currentColor"
      />
    </svg>
  );
}
