"use client";

import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { cn } from "@/lib/cn";
import { isReallyVisible } from "@/lib/in-view";

const VISOR_PATH =
  "M527.01,288.59c-19.94,20.58-49.4,37.92-77.57,43.93-56.48,12.06-93.88-20.66-144.05-35.97-12.48-3.81-21.88-4.3-34.49-.57-51.18,15.1-88.47,49.16-146.29,36.36C-26.45,298.89-51.09,55.26,111.42,17.5c99.29-23.07,257.23-23.86,356.22.8,120.99,30.15,138.21,188.94,59.37,270.29Z";

const VISOR_CLIP_PATH =
  "M 0.91652 0.86105 c -0.03468 0.06140 -0.08591 0.11314 -0.13490 0.13107 -0.09822 0.03598 -0.16327 -0.06164 -0.25052 -0.10732 -0.02170 -0.01137 -0.03805 -0.01283 -0.05998 -0.00170 -0.08901 0.04505 -0.15386 0.14668 -0.25441 0.10849 C -0.04600 0.89178 -0.08885 0.16488 0.19377 0.05221 c 0.17268 -0.06883 0.44735 -0.07119 0.61950 0.00239 0.21041 0.08996 0.24036 0.56373 0.10325 0.80645 Z";

const VISOR_W = 575.01;
const VISOR_H = 335.16;
const STRAP_W = 52;
const STRAP_H = 68;
const TOP_STRAP_W = 64;
const TOP_STRAP_H = 32;
const PAD_TOP = TOP_STRAP_H;
const PAD_BOTTOM = 16;
const FRAME_W = VISOR_W + STRAP_W * 2;
const FRAME_H = VISOR_H + PAD_TOP + PAD_BOTTOM;
const STRAP_RADIUS = 12;

function strapPath(
  x: number,
  y: number,
  w: number,
  h: number,
  corners: { tl?: boolean; tr?: boolean; br?: boolean; bl?: boolean },
) {
  const r = Math.min(STRAP_RADIUS, w / 2, h / 2);
  const tl = corners.tl ? r : 0;
  const tr = corners.tr ? r : 0;
  const br = corners.br ? r : 0;
  const bl = corners.bl ? r : 0;
  return [
    `M${x + tl},${y}`,
    `H${x + w - tr}`,
    tr ? `A${tr},${tr} 0 0 1 ${x + w},${y + tr}` : `L${x + w},${y}`,
    `V${y + h - br}`,
    br ? `A${br},${br} 0 0 1 ${x + w - br},${y + h}` : `L${x + w},${y + h}`,
    `H${x + bl}`,
    bl ? `A${bl},${bl} 0 0 1 ${x},${y + h - bl}` : `L${x},${y + h}`,
    `V${y + tl}`,
    tl ? `A${tl},${tl} 0 0 1 ${x + tl},${y}` : `L${x},${y}`,
    "Z",
  ].join(" ");
}

export function VisorVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const clipId = useId().replace(/:/g, "");
  const metalId = `${clipId}-metal`;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

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
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) void video.play();
    else video.pause();
  }, [playing]);

  function togglePlayback(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    const next = !playing;
    userPaused.current = !next;
    setPlaying(next);
  }

  const visorLeft = `${(STRAP_W / FRAME_W) * 100}%`;
  const visorWidth = `${(VISOR_W / FRAME_W) * 100}%`;
  const visorTop = `${(PAD_TOP / FRAME_H) * 100}%`;
  const visorHeight = `${(VISOR_H / FRAME_H) * 100}%`;
  const visorBottom = `${(PAD_BOTTOM / FRAME_H) * 100}%`;

  return (
    <div
      className={cn("relative mx-auto w-full max-w-[920px] overflow-visible", className)}
      style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
    >
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={VISOR_CLIP_PATH} />
          </clipPath>
        </defs>
      </svg>
      <div
        className="absolute overflow-hidden drop-shadow-[0_16px_48px_rgba(0,0,0,0.45)]"
        style={{
          left: visorLeft,
          top: visorTop,
          width: visorWidth,
          height: visorHeight,
          clipPath: `url(#${clipId})`,
          WebkitClipPath: `url(#${clipId})`,
        }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
      <svg
        viewBox={`0 0 ${FRAME_W} ${FRAME_H}`}
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
      >
        <defs>
          <linearGradient id={metalId} x1="0.12" y1="0" x2="0.88" y2="1">
            <stop offset="0%" stopColor="#f3f3f3" />
            <stop offset="42%" stopColor="#c8c8c8" />
            <stop offset="100%" stopColor="#8f8f8f" />
          </linearGradient>
        </defs>
        <g transform={`translate(${STRAP_W} ${PAD_TOP})`}>
          <path
            d={strapPath(-STRAP_W, VISOR_H / 2 - STRAP_H / 2, STRAP_W, STRAP_H, {
              tl: true,
              bl: true,
            })}
            fill={`url(#${metalId})`}
          />
          <path
            d={strapPath(VISOR_W, VISOR_H / 2 - STRAP_H / 2, STRAP_W, STRAP_H, {
              tr: true,
              br: true,
            })}
            fill={`url(#${metalId})`}
          />
          <path
            d={strapPath(
              VISOR_W / 2 - TOP_STRAP_W / 2,
              -TOP_STRAP_H,
              TOP_STRAP_W,
              TOP_STRAP_H,
              { tl: true, tr: true },
            )}
            fill={`url(#${metalId})`}
          />
          <path
            d={VISOR_PATH}
            fill="none"
            stroke={`url(#${metalId})`}
            strokeWidth={16}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={playing ? "Pause" : "Play"}
        className="pointer-events-auto absolute z-[2] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[var(--line)] text-white backdrop-blur-[6px] transition-[transform,background-color] duration-200 hover:scale-105 hover:bg-[var(--line-strong)]"
        style={{ right: visorLeft, bottom: visorBottom }}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
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
