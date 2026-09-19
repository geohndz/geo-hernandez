"use client";

import { useEffect, useRef } from "react";
import { isReallyVisible } from "@/lib/in-view";

export function InViewVideo({
  src,
  alt,
  className,
  loop = false,
  active = true,
  onEnded,
}: {
  src: string;
  alt: string;
  className?: string;
  loop?: boolean;
  active?: boolean;
  onEnded?: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (!active) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (isReallyVisible(entry)) void video.play();
        else video.pause();
      },
      { threshold: [0, 0.25, 0.5, 1] },
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [src, active]);

  return (
    <video
      ref={ref}
      key={src}
      className={className}
      muted
      playsInline
      loop={loop}
      preload="metadata"
      onEnded={onEnded}
      aria-label={alt}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
