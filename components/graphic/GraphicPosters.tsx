"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import type { GraphicFrame } from "@/content/graphic";
import { GRAPHIC_OPEN_ATTR, graphicOpenPayload } from "@/components/graphic/GraphicLightboxContext";

function posterSizes(sizes: string | ((index: number) => string), index: number) {
  return typeof sizes === "function" ? sizes(index) : sizes;
}

export function GraphicPosters({
  frames,
  sizes,
  projectTitle,
  className,
  gridClassName,
}: {
  frames: GraphicFrame[];
  sizes: string | ((index: number) => string);
  projectTitle: string;
  className?: string;
  gridClassName?: string;
}) {
  if (!frames.length) return null;

  const tile = (frame: GraphicFrame, i: number) => (
    <button
      type="button"
      className={cn(
        "group relative block w-full cursor-zoom-in border-0 bg-transparent p-0 text-left",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gd-ink)]",
        className,
      )}
      {...{ [GRAPHIC_OPEN_ATTR]: graphicOpenPayload(frames, i, projectTitle) }}
      aria-label={`View ${frame.alt ?? projectTitle} full size`}
    >
      <span className="pointer-events-none block overflow-hidden">
        <Image
          src={frame.src}
          alt=""
          width={frame.width}
          height={frame.height}
          sizes={posterSizes(sizes, i)}
          className="h-auto w-full transition-[transform,filter] duration-300 ease-out group-hover:brightness-[1.02] [@media(hover:hover)]:group-hover:scale-[1.01]"
        />
      </span>
    </button>
  );

  if (gridClassName) {
    return (
      <ul className={gridClassName}>
        {frames.map((frame, i) => (
          <li key={frame.src}>{tile(frame, i)}</li>
        ))}
      </ul>
    );
  }

  return (
    <>
      {frames.map((frame, i) => (
        <div key={frame.src} className="contents">
          {tile(frame, i)}
        </div>
      ))}
    </>
  );
}
