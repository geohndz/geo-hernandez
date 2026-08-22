"use client";

import { useEffect, useRef, useState } from "react";

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
        className="absolute bottom-3.5 right-3.5 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[var(--line)] text-white backdrop-blur-[6px] transition-[transform,background-color] duration-200 hover:scale-105 hover:bg-[var(--line-strong)]"
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
    </>
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
