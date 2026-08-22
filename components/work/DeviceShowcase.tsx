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
  return <DeviceShowcase study={study} className="mt-12" />;
}

export function F1Visor() {
  const study = caseStudies.find((item) => item.slug === "formula-1");
  if (!study?.video) return null;
  return <DeviceShowcase study={study} className="mt-12" />;
}

export function DeviceShowcase({
  study,
  className,
  deviceOnly = false,
}: {
  study: CaseStudyMeta;
  className?: string;
  deviceOnly?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisor = study.slug === "formula-1" && Boolean(study.video);
  const hasVideo = Boolean(study.video) && !study.deviceImage && !isVisor;
  const [playing, setPlaying] = useState(() => Boolean(study.deviceImage));
  const userPaused = useRef(false);
  const aspect = study.deviceAspect ?? "80 / 49";
  const top = study.carousel?.top ?? [];
  const bottom = study.carousel?.bottom ?? [];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (isReallyVisible(entry) && !userPaused.current) setPlaying(true);
        else setPlaying(false);
      },
      { threshold: [0, 0.25, 0.5, 1], rootMargin: "-12% 0px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [hasVideo]);

  function togglePlayback(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    const video = videoRef.current;
    const next = !playing;
    userPaused.current = !next;
    setPlaying(next);
    if (!video) return;
    if (next) void video.play();
    else video.pause();
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) void video.play();
    else video.pause();
  }, [playing, hasVideo]);

  const device = (
    <div className={cn("relative", deviceOnly ? "mx-auto w-full max-w-[720px]" : "w-[84%] max-w-[720px]")}>
      <span className="absolute -left-[3px] top-[20%] h-7 w-[3px] rounded-l-[1px] bg-[#cfcfcf]" />
      <span className="absolute -left-[3px] top-[30%] h-10 w-[3px] rounded-l-[1px] bg-[#cfcfcf]" />
      <div className="rounded-[14px] bg-[linear-gradient(160deg,#f3f3f3_0%,#c8c8c8_42%,#8f8f8f_100%)] p-[2px] shadow-[0_22px_70px_rgba(0,0,0,0.58)]">
        <div className="relative rounded-[12px] bg-black p-[10px] md:p-[13px]">
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
            {hasVideo && deviceOnly ? (
              <button
                type="button"
                onClick={togglePlayback}
                aria-label={playing ? "Pause" : "Play"}
                className="pointer-events-auto absolute bottom-3 right-3 z-[2] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[var(--line)] text-white backdrop-blur-[6px] transition-[transform,background-color] duration-200 hover:scale-105 hover:bg-[var(--line-strong)]"
              >
                {playing ? <PauseIcon /> : <PlayIcon />}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );

  if (deviceOnly && isVisor) {
    return (
      <div className={cn("relative mt-10", className)}>
        <VisorVideo src={study.video!} poster={study.poster} />
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
    return <div className={cn("relative mt-10", className)}>{device}</div>;
  }

  return (
    <div className={cn("pointer-events-none relative z-[2] h-[400px] overflow-hidden md:h-[560px]", className)}>
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

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 py-7 md:px-10 md:py-9">
        {isVisor ? (
          <div className="w-[84%] max-w-[720px]">
            <VisorVideo src={study.video!} poster={study.poster} />
          </div>
        ) : study.deviceImage ? (
          <div className="relative w-[84%] max-w-[720px]" style={{ aspectRatio: aspect }}>
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

      {hasVideo ? (
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={playing ? "Pause" : "Play"}
          className="pointer-events-auto absolute bottom-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[var(--line)] text-white backdrop-blur-[6px] transition-[transform,background-color] duration-200 hover:scale-105 hover:bg-[var(--line-strong)]"
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
      ) : null}
    </div>
  );
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
  const copies = [images, images];

  return (
    <div className="pointer-events-none min-h-0 overflow-hidden">
      <div
        className={cn("geo-marquee-track flex h-full w-max", paused && "is-paused")}
        style={{ ["--geo-duration" as string]: duration }}
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
