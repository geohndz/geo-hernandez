"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/cn";
import type { GraphicFrame } from "@/content/graphic";

export const GRAPHIC_OPEN_ATTR = "data-gd-open";

type OpenState = {
  frames: GraphicFrame[];
  index: number;
  projectTitle: string;
};

export function graphicOpenPayload(frames: GraphicFrame[], index: number, projectTitle: string) {
  return JSON.stringify({ frames, index, projectTitle } satisfies OpenState);
}

function parsePayload(raw: string | null): OpenState | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as OpenState;
    if (!Array.isArray(data.frames) || data.frames.length === 0) return null;
    const index = Number.isInteger(data.index) ? data.index : 0;
    if (!data.frames[index]?.src) return null;
    return { frames: data.frames, index, projectTitle: data.projectTitle || "Graphic" };
  } catch {
    return null;
  }
}

export function GraphicLightboxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OpenState | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const open = useCallback((next: OpenState) => {
    setZoomed(false);
    setState(next);
  }, []);

  const close = useCallback(() => {
    setZoomed(false);
    setState(null);
  }, []);

  const shift = useCallback((delta: number) => {
    setZoomed(false);
    setState((prev) => {
      if (!prev) return prev;
      const count = prev.frames.length;
      return { ...prev, index: (prev.index + delta + count) % count };
    });
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const trigger = target.closest(`[${GRAPHIC_OPEN_ATTR}]`);
      if (!trigger) return;
      const next = parsePayload(trigger.getAttribute(GRAPHIC_OPEN_ATTR));
      if (!next) return;
      event.preventDefault();
      open(next);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  useEffect(() => {
    if (!state) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft" && state.frames.length > 1) shift(-1);
      if (event.key === "ArrowRight" && state.frames.length > 1) shift(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [close, shift, state]);

  const frame = state?.frames[state.index];
  const hasMultiple = (state?.frames.length ?? 0) > 1;

  const overlay =
    mounted && frame && state
      ? createPortal(
          <div
            className="fixed inset-0 z-[1000] flex flex-col bg-[#121212]/72 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={state.projectTitle}
          >
          <div className="flex h-full flex-col">
            <div className="flex shrink-0 items-center justify-between gap-3 px-4 py-3 md:px-6">
              <p className="truncate text-[13px] font-medium text-[#F5F5F5] md:text-[14px]">
                {state.projectTitle}
                {hasMultiple ? (
                  <span className="ml-2 font-normal text-white/60">
                    {state.index + 1} / {state.frames.length}
                  </span>
                ) : null}
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setZoomed((value) => !value)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-[#F5F5F5] hover:border-white/50"
                  aria-label={zoomed ? "Zoom out" : "Zoom in for detail"}
                >
                  {zoomed ? <ZoomOut className="h-[18px] w-[18px]" aria-hidden /> : <ZoomIn className="h-[18px] w-[18px]" aria-hidden />}
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-[#F5F5F5] hover:border-white/50"
                  aria-label="Close"
                >
                  <X className="h-[18px] w-[18px]" aria-hidden />
                </button>
              </div>
            </div>
            <div className={cn("relative flex min-h-0 flex-1 items-center justify-center px-4 pb-8 md:px-16", zoomed && "overflow-auto")}>
              <button
                type="button"
                className={cn("max-h-full border-0 bg-transparent p-0", zoomed ? "cursor-zoom-out" : "cursor-zoom-in")}
                onClick={() => setZoomed((value) => !value)}
                aria-label={zoomed ? "Zoom out" : "Zoom in for detail"}
              >
                <Image
                  src={frame.src}
                  alt={frame.alt ?? state.projectTitle}
                  width={frame.width}
                  height={frame.height}
                  sizes="96vw"
                  className={cn(
                    "mx-auto h-auto max-h-[min(78svh,900px)] w-auto max-w-full origin-center transition-transform duration-300",
                    zoomed && "scale-[1.8]",
                  )}
                  priority
                />
              </button>
              {hasMultiple ? (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#121212]/60 text-[#F5F5F5] hover:border-white/50 md:left-4"
                    onClick={() => shift(-1)}
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden />
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#121212]/60 text-[#F5F5F5] hover:border-white/50 md:right-4"
                    onClick={() => shift(1)}
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden />
                  </button>
                </>
              ) : null}
            </div>
          </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      {children}
      {overlay}
    </>
  );
}
