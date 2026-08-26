"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { CaseStudyMeta } from "@/content/projects";
import { caseStudies } from "@/content/projects";
import { cn } from "@/lib/cn";
import { isReallyVisible } from "@/lib/in-view";
import { VisorVideo } from "./VisorVideo";

export function DeviceCarousel() {
  const study = caseStudies.find((item) => item.slug === "world-geography");
  if (!study?.video) return null;
  return <DeviceShowcase study={study} className="mt-12" controls="device" />;
}

export function F1Visor() {
  const study = caseStudies.find((item) => item.slug === "formula-1");
  if (!study?.video) return null;
  return <DeviceShowcase study={study} className="mt-12" controls="device" />;
}

const playButtonClass =
  "pointer-events-auto z-10 flex cursor-pointer items-center justify-center bg-[var(--line)] text-white backdrop-blur-[6px] transition-[transform,background-color] duration-200 hover:bg-[var(--line-strong)]";

export function DeviceShowcase({
  study,
  className,
  deviceOnly = false,
  controls,
  compact = false,
}: {
  study: CaseStudyMeta;
  className?: string;
  deviceOnly?: boolean;
  controls?: "card" | "device";
  compact?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const isVisor = study.slug === "formula-1" && Boolean(study.video);
  const hasVideo = Boolean(study.video);
  const placement = controls ?? (deviceOnly || isVisor ? "device" : "card");
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);
  const aspect = study.deviceAspect ?? "80 / 49";
  const top = study.carousel?.top ?? [];
  const bottom = study.carousel?.bottom ?? [];

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !hasVideo) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (isReallyVisible(entry) && !userPaused.current) setPlaying(true);
        else if (!userPaused.current) setPlaying(false);
      },
      { threshold: [0, 0.25, 0.5, 1], rootMargin: "-12% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasVideo]);

  function togglePlayback(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    const next = !playing;
    userPaused.current = !next;
    setPlaying(next);
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) void video.play();
    else video.pause();
  }, [playing]);

  const playToggle = (
    <button
      type="button"
      onClick={togglePlayback}
      aria-label={playing ? "Pause" : "Play"}
      className={cn(playButtonClass, "absolute bottom-4 right-4 h-10 w-10 rounded-full hover:scale-105")}
    >
      {playing ? <PauseIcon /> : <PlayIcon />}
    </button>
  );

  const mobilePlayToggle =
    hasVideo && placement === "device" && !isVisor ? (
      <div className="mt-5 flex justify-center md:hidden">
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={playing ? "Pause" : "Play"}
          className={cn(playButtonClass, "pointer-events-auto h-12 w-12 rounded-full")}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
    ) : null;

  const deviceToggle = !isVisor ? (
    <button
      type="button"
      onClick={togglePlayback}
      aria-label={playing ? "Pause" : "Play"}
      className={cn(
        playButtonClass,
        "absolute bottom-3 left-[calc(100%+12px)] hidden h-10 w-10 rounded-full hover:scale-105 md:flex",
      )}
    >
      {playing ? <PauseIcon /> : <PlayIcon />}
    </button>
  ) : null;

  const device = (
    <div className={cn("relative", deviceOnly ? "mx-auto w-full max-w-[720px]" : "w-[94%] max-w-[680px] md:w-[76%]")}>
      <span className="absolute -left-1 top-[20%] h-8 w-1 rounded-l-[2px] bg-[#cfcfcf] md:-left-[3px] md:h-7 md:w-[3px] md:rounded-l-[1px]" />
      <span className="absolute -left-1 top-[30%] h-11 w-1 rounded-l-[2px] bg-[#cfcfcf] md:-left-[3px] md:h-10 md:w-[3px] md:rounded-l-[1px]" />
      <div className="rounded-[16px] bg-[linear-gradient(160deg,#f3f3f3_0%,#c8c8c8_42%,#8f8f8f_100%)] p-[2px] shadow-[0_22px_70px_rgba(0,0,0,0.58)] md:rounded-[14px]">
        <div className="relative rounded-[14px] bg-black p-[8px] md:rounded-[12px] md:p-[13px]">
          <span className="absolute left-1/2 top-[4px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#2a2a2a] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]" />
          <div
            className="relative overflow-hidden rounded-[6px] bg-black"
            style={{ aspectRatio: aspect }}
          >
            {study.video ? (
              <video
                ref={videoRef}
                className="h-full w-full object-contain"
                muted
                loop
                playsInline
                preload="metadata"
                poster={study.poster}
              >
                <source src={study.video} type="video/mp4" />
              </video>
            ) : null}
          </div>
        </div>
      </div>
      {hasVideo && placement === "device" ? deviceToggle : null}
    </div>
  );

  if (deviceOnly && isVisor) {
    return (
      <div ref={rootRef} className={cn("relative mt-10", className)}>
        <VisorVideo
          src={study.video!}
          poster={study.poster}
          playing={playing}
          onToggle={togglePlayback}
        />
      </div>
    );
  }

  if (deviceOnly && study.deviceImage) {
    return (
      <div className={cn("relative mt-10", className)}>
        <div
          className="relative mx-auto w-full max-w-[720px]"
          style={{ aspectRatio: aspect }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={study.deviceImage}
            alt=""
            className="h-full w-full object-contain drop-shadow-[0_16px_48px_rgba(0,0,0,0.45)]"
          />
        </div>
      </div>
    );
  }

  if (deviceOnly) {
    return (
      <div
        ref={rootRef}
        className={cn(
          "relative mt-10",
          hasVideo && placement === "device" && "md:pr-14",
          className,
        )}
      >
        {device}
        {mobilePlayToggle}
      </div>
    );
  }

  return (
    <div ref={rootRef} className={cn("relative z-[2]", className)}>
      <div
        className={cn(
          "pointer-events-none relative overflow-hidden",
          compact
            ? "h-[260px] md:h-[420px]"
            : study.carousel
              ? "h-[300px] md:h-[720px]"
              : "h-[240px] md:h-[720px]",
        )}
      >
        {study.carousel ? (
          <div className="absolute inset-0 flex items-center">
            <div className="grid h-[52%] w-full grid-rows-2 gap-2.5">
              <MarqueeRow images={top} duration="55.2s" paused={!playing} />
              <MarqueeRow images={[...bottom].reverse()} duration="32.2s" paused={!playing} />
            </div>
          </div>
        ) : null}

        {study.deviceImage ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 58% 52% at 50% 48%, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.42) 38%, transparent 72%)",
            }}
          />
        ) : null}

        <div
          className={cn(
            "pointer-events-none absolute inset-0 flex items-center justify-center",
            compact ? "px-3 py-4 md:px-8 md:py-14" : "px-3 py-3 md:px-14 md:py-16",
            hasVideo && placement === "device" && !isVisor && "md:pr-24",
          )}
        >
          {isVisor ? (
            <div className="w-[94%] max-w-[720px] md:w-[84%]">
              <VisorVideo
                src={study.video!}
                poster={study.poster}
                playing={playing}
                onToggle={togglePlayback}
                controls={placement === "device"}
              />
            </div>
          ) : study.deviceImage ? (
            <div className="relative w-[94%] max-w-[720px] md:w-[84%]" style={{ aspectRatio: aspect }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={study.deviceImage}
                alt=""
                className="h-full w-full object-contain drop-shadow-[0_16px_48px_rgba(0,0,0,0.45)]"
              />
            </div>
          ) : (
            device
          )}
        </div>

        {hasVideo && placement === "card" ? playToggle : null}
      </div>
      {mobilePlayToggle}
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
    <div className="pointer-events-none min-h-0 overflow-hidden">
      <div
        className={cn("geo-marquee-track flex h-full w-max", paused && "is-paused")}
        style={{ ["--geo-duration" as string]: seconds }}
      >
        {copies.map((set, copy) => (
          <div key={copy} className="flex h-full shrink-0 gap-3 pr-3">
            {set.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${src}-${copy}-${i}`}
                src={src}
                alt=""
                className="h-full w-auto shrink-0 rounded-[4px] object-cover opacity-[0.7]"
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
