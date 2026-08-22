"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { isReallyVisible } from "@/lib/in-view";

type GateId = "technical" | "content" | "business";
type Place = GateId | "cleared";

const gates: {
  id: GateId;
  title: string;
  prompt: string;
  items: string[];
  caption: string;
}[] = [
  {
    id: "technical",
    title: "Technical",
    prompt: "Abeka products must:",
    items: [
      "Work offline",
      "Run across all supported devices",
      "Remain stable for long sessions",
    ],
    caption:
      "This immediately eliminated many stakeholder ideas involving live geographic data.",
  },
  {
    id: "content",
    title: "Content",
    prompt: "The maps also needed to:",
    items: [
      "Match the curriculum exactly",
      "Align with textbook content",
      "Support teacher lesson plans",
    ],
    caption: "Educational accuracy took priority over visual novelty.",
  },
  {
    id: "business",
    title: "Business",
    prompt: "The team needed a solution that was:",
    items: ["Maintainable", "Scalable", "Easy to update"],
    caption:
      "Future curriculum revisions could not require rebuilding entire experiences.",
  },
];

const ideas: {
  id: string;
  label: string;
  killedBy: GateId[];
  caption?: string;
}[] = [
  {
    id: "globe",
    label: "Interactive globes",
    killedBy: ["technical", "content", "business"],
    caption: "Educational accuracy took priority over visual novelty.",
  },
  {
    id: "live",
    label: "Real-time geographic data",
    killedBy: ["technical", "content", "business"],
    caption:
      "This immediately eliminated many stakeholder ideas involving live geographic data.",
  },
  {
    id: "control",
    label: "Complete teacher control",
    killedBy: ["content", "business"],
    caption: "Educational accuracy took priority over visual novelty.",
  },
  {
    id: "immersive",
    label: "Highly immersive experiences",
    killedBy: ["technical", "content", "business"],
    caption: "Educational accuracy took priority over visual novelty.",
  },
  { id: "layered", label: "Layered maps", killedBy: [] },
];

const order: GateId[] = ["technical", "content", "business"];

const sequence: { ideaId: string; where: Place }[] = ideas.flatMap((idea) =>
  idea.killedBy.length === 0
    ? [{ ideaId: idea.id, where: "cleared" as Place }]
    : order
        .filter((gate) => idea.killedBy.includes(gate))
        .map((gate) => ({ ideaId: idea.id, where: gate as Place })),
);

function Chip({
  id,
  label,
  state,
  fly = true,
}: {
  id: string;
  label: string;
  state?: "live" | "vetoed" | "cleared";
  fly?: boolean;
}) {
  return (
    <motion.span
      layout={fly}
      layoutId={fly ? id : undefined}
      initial={fly ? undefined : { opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "inline-flex h-9 items-center rounded-full border px-4 text-[14px] leading-none md:text-[15px]",
        state === "vetoed" && "border-red-500/25 bg-red-950/25 text-red-300/80 line-through",
        state === "cleared" && "border-emerald-500/30 bg-emerald-950/30 text-emerald-200",
        (!state || state === "live") && "border-line bg-card text-fg",
      )}
    >
      {label}
    </motion.span>
  );
}

function GateColumn({
  gate,
  children,
  lit,
}: {
  gate: (typeof gates)[number];
  children: React.ReactNode;
  lit: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-[16px] border p-3 transition-colors md:p-4",
        lit ? "border-line-strong bg-card" : "border-line bg-transparent",
      )}
    >
      <p className="text-[16px] font-medium tracking-tight text-fg">
        {gate.title}
      </p>
      <p className="mt-1 text-[12px] text-muted">{gate.prompt}</p>
      <ul className="mt-3 space-y-1.5">
        {gate.items.map((item, i) => (
          <li
            key={item}
            className="flex items-center gap-2 rounded-[10px] border border-line bg-bg/60 px-2.5 py-2 text-[12px] leading-none text-fg"
          >
            <span className="tabular-nums text-dim">
              {String(i + 1).padStart(2, "0")}
            </span>
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex min-h-[5.5rem] flex-1 flex-wrap content-start items-start gap-2">
        {children}
      </div>
    </div>
  );
}

function GateFlow() {
  const [progress, setProgress] = useState(0);
  const [target, setTarget] = useState(0);
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const autoRan = useRef(false);
  const timer = useRef(0);

  const done = useMemo(() => sequence.slice(0, progress), [progress]);

  function isPlaced(ideaId: string, where: Place) {
    return done.some((step) => step.ideaId === ideaId && step.where === where);
  }

  function inVision(idea: (typeof ideas)[number]) {
    if (idea.killedBy.length === 0) return !isPlaced(idea.id, "cleared");
    return !idea.killedBy.some((gate) => isPlaced(idea.id, gate));
  }

  function firstFail(idea: (typeof ideas)[number]): GateId | null {
    return order.find((gate) => isPlaced(idea.id, gate)) ?? null;
  }

  const filtered = target === sequence.length;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(timer.current);
        if (autoRan.current || !isReallyVisible(entry)) return;
        timer.current = window.setTimeout(() => {
          autoRan.current = true;
          if (reduce) {
            setProgress(sequence.length);
            setTarget(sequence.length);
            return;
          }
          setProgress(0);
          setTarget(sequence.length);
        }, 3000);
      },
      { threshold: [0, 0.25, 0.5, 1], rootMargin: "-12% 0px" },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer.current);
    };
  }, [reduce]);

  useEffect(() => {
    if (progress === target) return;
    if (reduce) {
      setProgress(target);
      return;
    }
    const dir = target > progress ? 1 : -1;
    const next = sequence[dir > 0 ? progress : progress - 1];
    const prev = sequence[dir > 0 ? progress - 1 : progress];
    const newIdea = Boolean(next && prev && next.ideaId !== prev.ideaId);
    const delay = dir > 0 ? (newIdea ? 3000 : 380) : 90;
    const id = window.setTimeout(() => setProgress((value) => value + dir), delay);
    return () => window.clearTimeout(id);
  }, [progress, target, reduce]);

  function selectFiltered(next: boolean) {
    autoRan.current = true;
    window.clearTimeout(timer.current);
    const end = next ? sequence.length : 0;
    if (reduce) {
      setProgress(end);
      setTarget(end);
      return;
    }
    setTarget(end);
  }

  const current = sequence[progress - 1];
  const midCaption =
    current && current.where !== "cleared"
      ? (ideas.find((idea) => idea.id === current.ideaId)?.caption ?? null)
      : null;
  const endCaption = isPlaced("layered", "cleared") ? gates[2].caption : null;

  return (
    <div ref={wrapRef} className="study-card px-5 py-6 md:px-8 md:py-8">
      <div
        role="tablist"
        aria-label="Constraint board view"
        className="mx-auto mb-6 flex w-fit rounded-lg border border-line bg-card p-1"
      >
        {(
          [
            [false, "Constraints"],
            [true, "Filtered"],
          ] as const
        ).map(([value, label]) => {
          const active = filtered === value;
          return (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => selectFiltered(value)}
              className={cn(
                "relative rounded-lg px-4 py-1.5 text-[13px] font-medium transition-colors",
                active ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              {active ? (
                <motion.span
                  layoutId="constraints-tab"
                  className="absolute inset-0 rounded-lg bg-white/[0.06]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              ) : null}
              <span className="relative z-10">{label}</span>
            </button>
          );
        })}
      </div>

      <LayoutGroup>
        <div className="flex min-h-9 flex-wrap items-center gap-2">
          {ideas.filter(inVision).map((idea) => (
            <Chip key={idea.id} id={`gate-${idea.id}`} label={idea.label} />
          ))}
        </div>

        {midCaption ? (
          <motion.p
            key={`caption-top-${current?.ideaId}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-[15px] leading-relaxed text-muted lg:hidden"
          >
            {midCaption}
          </motion.p>
        ) : null}

        <div className="mt-6 grid items-stretch gap-3 lg:grid-cols-3">
          {gates.map((gate) => {
            const held = ideas.filter((idea) => isPlaced(idea.id, gate.id));
            return (
              <GateColumn
                key={gate.id}
                gate={gate}
                lit={held.length > 0}
              >
                {held.map((idea) => {
                  const primary = firstFail(idea) === gate.id;
                  return (
                    <Chip
                      key={idea.id}
                      id={`gate-${idea.id}`}
                      label={idea.label}
                      state="vetoed"
                      fly={primary}
                    />
                  );
                })}
              </GateColumn>
            );
          })}
        </div>

        {midCaption ? (
          <motion.p
            key={`caption-bottom-${current?.ideaId}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5 hidden text-center text-[15px] leading-relaxed text-muted lg:block"
          >
            {midCaption}
          </motion.p>
        ) : null}

        <div
          className={cn(
            "rounded-[16px] border border-line px-4 py-4 transition-[margin] duration-500",
            endCaption ? "mt-3" : "mt-5",
          )}
        >
          <p className="text-[13px] text-muted">What could pass every gate</p>
          <div className="mt-3 flex min-h-9 flex-wrap items-center gap-2">
            {ideas.filter((idea) => isPlaced(idea.id, "cleared")).length === 0 ? (
              <p className="text-[14px] text-dim">Nothing yet.</p>
            ) : (
              ideas
                .filter((idea) => isPlaced(idea.id, "cleared"))
                .map((idea) => (
                  <Chip
                    key={idea.id}
                    id={`gate-${idea.id}`}
                    label={idea.label}
                    state="cleared"
                  />
                ))
            )}
          </div>
          {endCaption ? (
            <p className="mt-3 text-[15px] leading-relaxed text-emerald-200">
              {endCaption}
            </p>
          ) : null}
        </div>
      </LayoutGroup>
    </div>
  );
}

export function Constraints() {
  return (
    <div className="mt-2">
      <p className="study-text text-[16px] leading-[1.75] text-muted">
        The original vision had to survive three filters. Classrooms needed
        something that would still work offline, match the textbook, and
        survive the next curriculum revision. User needs and business needs had
        to clear the same gates.
      </p>
      <div className="mt-8">
        <GateFlow />
      </div>
    </div>
  );
}
