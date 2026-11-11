"use client";

import { useEffect, useRef, type RefObject } from "react";

export function isReallyVisible(entry: IntersectionObserverEntry) {
  if (!entry.isIntersecting || entry.intersectionRatio <= 0) return false;
  const rect = entry.boundingClientRect;
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < vh * 0.85 && rect.bottom > vh * 0.15;
}

export function usePlayWhenVisible(ref: RefObject<HTMLVideoElement | null>) {
  const pausedByUser = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (isReallyVisible(entry)) {
          if (!pausedByUser.current) void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.25, 0.5, 1] },
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [ref]);

  return pausedByUser;
}
