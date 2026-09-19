"use client";

import { useEffect, useRef, useState } from "react";
import { PlayPauseGlyph } from "@/components/work/PlayPauseGlyph";

type CardVideoProps = {
  src: string;
  poster?: string;
  className?: string;
};

export function CardVideo({ src, poster, className = "" }: CardVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    setPlaying(!video.paused);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  function toggle(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }

  return (
    <>
      <video
        ref={videoRef}
        className={className}
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="press-scale absolute bottom-3.5 right-3.5 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[var(--line)] text-white backdrop-blur-[6px] hover:bg-[var(--line-strong)]"
      >
        <PlayPauseGlyph playing={playing} />
      </button>
    </>
  );
}
