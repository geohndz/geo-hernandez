"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { isReallyVisible } from "@/lib/in-view";

const workflow = [
  "Exporting InDesign assets",
  "Converting images",
  "Encoding assets manually",
  "Editing code",
  "Updating titles",
  "Updating icons",
];

const COUNT = workflow.length;
const VIEW = 280;
const CX = VIEW / 2;
const CY = VIEW / 2;
const RADIUS = 112;
const RADIUS_PCT = (RADIUS / VIEW) * 100;
const STEP_MS = 3000;

function nodePoint(index: number) {
  const angle = (index / COUNT) * Math.PI * 2 - Math.PI / 2;
  return {
    x: 50 + RADIUS_PCT * Math.cos(angle),
    y: 50 + RADIUS_PCT * Math.sin(angle),
  };
}

function arcPath(t: number) {
  const amount = Math.min(Math.max(t, 0), 0.9999);
  const start = -Math.PI / 2;
  const end = start + amount * Math.PI * 2;
  const x1 = CX + RADIUS * Math.cos(start);
  const y1 = CY + RADIUS * Math.sin(start);
  const x2 = CX + RADIUS * Math.cos(end);
  const y2 = CY + RADIUS * Math.sin(end);
  const large = amount > 0.5 ? 1 : 0;
  return `M ${x1} ${y1} A ${RADIUS} ${RADIUS} 0 ${large} 1 ${x2} ${y2}`;
}

export function WorkflowClock() {
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const autoRan = useRef(false);
  const timer = useRef(0);
  const progressRef = useRef(0);

  const complete = progress >= COUNT;
  const step =
    progress <= 0 ? 0 : complete ? COUNT + 1 : Math.min(COUNT, Math.floor(progress) + 1);
  const current = Math.max(0, Math.min(COUNT - 1, step - 1));
  const amount = Math.min(progress, COUNT) / COUNT;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(timer.current);
        if (autoRan.current || !isReallyVisible(entry)) return;
        timer.current = window.setTimeout(() => {
          autoRan.current = true;
          progressRef.current = 0;
          setProgress(0);
          setPlaying(true);
        }, 600);
      },
      { threshold: [0, 0.25, 0.5, 1], rootMargin: "-12% 0px" },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const next = progressRef.current + (now - last) / STEP_MS;
      last = now;
      if (next >= COUNT) {
        progressRef.current = COUNT;
        setProgress(COUNT);
        setPlaying(false);
        return;
      }
      progressRef.current = next;
      setProgress(next);
      frame = window.requestAnimationFrame(loop);
    };

    frame = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(frame);
  }, [playing]);

  function jump(next: number) {
    autoRan.current = true;
    window.clearTimeout(timer.current);
    setPlaying(false);
    const value = Math.max(0.001, next - 1);
    progressRef.current = value;
    setProgress(value);
  }

  function replay() {
    autoRan.current = true;
    window.clearTimeout(timer.current);
    progressRef.current = 0;
    setProgress(0);
    setPlaying(true);
  }

  return (
    <div ref={wrapRef} className="mt-10">
      <div className="relative mx-auto aspect-square w-full max-w-[520px] md:max-w-[580px]">
        <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="h-full w-full overflow-visible">
          <circle
            cx={CX}
            cy={CY}
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.75"
          />
          {amount > 0 ? (
            <path
              d={arcPath(amount)}
              fill="none"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="2"
              strokeLinecap="butt"
            />
          ) : null}
        </svg>

        {workflow.map((item, i) => {
          const point = nodePoint(i);
          const reached = progress > i + 1 - 0.001;
          const active = !complete && step === i + 1;
          return (
            <button
              key={item}
              type="button"
              onClick={() => jump(i + 1)}
              aria-label={`Step ${i + 1}: ${item}`}
              aria-current={active ? "step" : undefined}
              className={cn(
                "absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[13px] tabular-nums transition-colors",
                active && "border-fg bg-fg text-bg",
                reached && !active && "border-line-strong bg-card text-fg",
                !reached && "border-line bg-bg text-dim",
              )}
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          );
        })}

        <div className="pointer-events-none absolute inset-[24%] flex flex-col items-center justify-center px-5 text-center">
          {step === 0 ? (
            <p className="text-[14px] text-muted">Six steps</p>
          ) : complete ? (
            <>
              <p className="text-[36px] font-medium leading-none tracking-tight text-fg md:text-[42px]">
                20 min
              </p>
              <p className="mt-2 text-[14px] text-muted">per interactive</p>
            </>
          ) : (
            <>
              <p className="text-[13px] tabular-nums text-dim">
                {String(step).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
              </p>
              <p className="mt-2 text-[18px] font-medium leading-snug tracking-tight text-fg md:text-[22px]">
                {workflow[current]}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="mt-5 flex justify-center">
        <button
          type="button"
          onClick={replay}
          className="text-[13px] text-muted underline-offset-4 hover:text-fg hover:underline"
        >
          Replay
        </button>
      </div>
    </div>
  );
}
