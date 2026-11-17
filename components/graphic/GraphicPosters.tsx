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
  layout,
}: {
  frames: GraphicFrame[];
  sizes: string | ((index: number) => string);
  projectTitle: string;
  className?: string;
  gridClassName?: string;
  layout?: "collage" | "band";
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
    >
      <span className="pointer-events-none block overflow-hidden">
        <Image
          src={frame.src}
          alt={frame.alt ?? ""}
          width={frame.width}
          height={frame.height}
          sizes={
            layout === "collage"
              ? i === 0
                ? "(min-width: 768px) 46vw, 100vw"
                : "(min-width: 768px) 22vw, 50vw"
              : layout === "band"
                ? i === frames.length - 1
                  ? "(min-width: 768px) 92vw, 100vw"
                  : "(min-width: 768px) 30vw, 33vw"
                : posterSizes(sizes, i)
          }
          className="h-auto w-full transition-[transform,filter] duration-300 ease-out group-hover:brightness-[1.02] [@media(hover:hover)]:group-hover:scale-[1.01]"
        />
      </span>
      <span className="sr-only">{frame.alt ? "View full size" : `View ${projectTitle} full size`}</span>
    </button>
  );

  if (layout === "band" && frames.length > 1) {
    const row = frames.slice(0, -1);
    const wide = frames[frames.length - 1];
    return (
      <ul className="grid grid-cols-3 gap-3 sm:gap-4">
        {row.map((frame, i) => (
          <li key={frame.src}>{tile(frame, i)}</li>
        ))}
        <li key={wide.src} className="col-span-3">
          {tile(wide, row.length)}
        </li>
      </ul>
    );
  }

  if (layout === "collage" && frames.length > 1) {
    const [lead, ...rest] = frames;
    return (
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        <li className="col-span-2 md:row-span-2">{tile(lead, 0)}</li>
        {rest.map((frame, i) => (
          <li key={frame.src}>{tile(frame, i + 1)}</li>
        ))}
      </ul>
    );
  }

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
