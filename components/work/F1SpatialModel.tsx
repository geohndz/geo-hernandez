"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Lightbulb, Puzzle } from "lucide-react";
import { cn } from "@/lib/cn";

type Tier = "zones" | "windows" | "components";

type Decision = {
  title: string;
  problem: string;
  solution: string;
  why?: string[];
  outcome: string;
};

// Percentages of the content boundary. The middle zone carries the stream, so it
// takes roughly half the field of view and the sides stay deliberately narrow.
const zones = {
  left: {
    left: 0,
    width: 21,
    label: "Left",
    holds: "Leaderboard and team radio",
  },
  middle: {
    left: 23,
    width: 54,
    label: "Middle",
    holds: "Race stream and camera browser",
  },
  right: {
    left: 79,
    width: 21,
    label: "Right",
    holds: "Driver and team information",
  },
} as const;

const PANEL_INSET = 0.8;

const panels = [
  { id: "standings", zone: "left", top: 0, height: 56, role: "Secondary", component: "Leaderboard" },
  { id: "radio", zone: "left", top: 60, height: 40, role: "Secondary", component: "Team radio" },
  { id: "stream", zone: "middle", top: 0, height: 64, role: "Primary", component: "Race stream" },
  { id: "cameras", zone: "middle", top: 68, height: 32, role: "Secondary", component: "Camera browser" },
  { id: "driver", zone: "right", top: 0, height: 100, role: "Secondary", component: "Driver and team" },
] as const;

const spatialZonesDecision: Decision = {
  title: "Spatial zones",
  problem: "Race information competes for attention.",
  solution:
    "The interface is divided into three spatial zones, left, middle, and right, and each one serves a distinct purpose.",
  outcome:
    "Users spend less time searching for information and more time watching the race.",
};

const tiers: {
  id: Tier;
  tab: string;
  lead: string;
  points?: { term: string; body: string }[];
  figure?: { src: string; alt: string; caption: string };
  decisions: Decision[];
}[] = [
  {
    id: "zones",
    tab: "Zones",
    lead: "Three fixed areas in the viewer's field of view. A zone never holds content itself. It decides where a window is allowed to land, which is how the layout stays predictable for two hours and how the viewer's body stays out of the interface.",
    decisions: [
      {
        title: "Fixed central stream",
        problem: "Users should never lose the race.",
        solution:
          "The live broadcast stays anchored in the middle zone and never moves.",
        why: [
          "Reduces head steering",
          "Creates a consistent focal point",
          "Mimics familiar television behavior",
          "Improves comfort during long sessions",
        ],
        outcome:
          "Users can glance at supporting information and immediately return to the race.",
      },
    ],
  },
  {
    id: "windows",
    tab: "Windows",
    lead: "Containers. A window is a surface that holds content and can be collapsed from its own header, resized, or moved to another zone. Every window carries a role, and the role is the hierarchy: one anatomy, reused, so a new module does not need a new frame.",
    points: [
      { term: "Primary", body: "the race stream, fixed as the anchor, never moves" },
      { term: "Secondary", body: "broadcast-adjacent live data, rearrangeable and minimizable" },
      {
        term: "Support",
        body: "context and immersion, peripheral and world-anchored outside the boundary",
      },
    ],
    figure: {
      src: "/media/formula-1/process/window-anatomy.png",
      alt: "Annotated window with a title, top bar, action icon, and content region",
      caption:
        "Every window is the same shell: a title, a top bar, an action, and a content region. The role changes. The anatomy does not.",
    },
    decisions: [
      {
        title: "Window hierarchy",
        problem: "Not every piece of information deserves equal prominence.",
        solution:
          "Windows are classified as primary, secondary, or support, and the classification decides how much attention a window is allowed to ask for.",
        outcome: "Clear visual hierarchy reduces cognitive load.",
      },
    ],
  },
  {
    id: "components",
    tab: "Components",
    lead: "The actual content inside a window. A component does not know which window it sits in, or which zone that window belongs to. That independence is the design system: the same leaderboard can collapse, relocate, or sit under a new shell without a redesign.",
    points: [
      { term: "Positionless", body: "the same component works in any window, in any zone" },
      {
        term: "Swappable",
        body: "the camera and driver tabs change content in place, without moving the window",
      },
      {
        term: "Additive",
        body: "a new module drops into an existing window instead of forcing a new layout",
      },
    ],
    figure: {
      src: "/media/formula-1/process/leaderboard-collapse.png",
      alt: "Leaderboard expanded to sixteen rows beside the same module collapsed to the top three",
      caption:
        "The leaderboard is one component. Collapsing it is a window action, not a redesign, so the zone stays put while the race gets more of the field of view.",
    },
    decisions: [
      {
        title: "Modular window system",
        problem: "Future race experiences may require new information modules.",
        solution:
          "Windows were designed as reusable system components, so a module can be added, removed, resized, or repositioned without redesigning the interface.",
        outcome: "The system can scale as new race features are introduced.",
      },
    ],
  },
];

function Panel({ panel, tier }: { panel: (typeof panels)[number]; tier: Tier }) {
  const zone = zones[panel.zone];
  const primary = panel.role === "Primary";
  const label =
    tier === "windows" ? panel.role : tier === "components" ? panel.component : "";

  return (
    <div
      className={cn(
        "absolute rounded-[7px] border transition-[opacity,border-color,background-color] duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
        tier === "zones"
          ? "border-white/10 bg-white/[0.03]"
          : primary
            ? "border-white/45 bg-white/[0.09]"
            : "border-white/20 bg-white/[0.05]",
      )}
      style={{
        left: `${zone.left + PANEL_INSET}%`,
        width: `${zone.width - PANEL_INSET * 2}%`,
        top: `${2 + panel.top * 0.96}%`,
        height: `${panel.height * 0.96}%`,
      }}
    >
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center px-1 text-center text-[8px] leading-tight transition-opacity duration-200 md:text-[11px]",
          primary ? "text-white/85" : "text-white/60",
          label ? "opacity-100" : "opacity-0",
        )}
      >
        {label}
      </span>
    </div>
  );
}

function Support({ side, tier }: { side: "top" | "bottom"; tier: Tier }) {
  const label =
    tier === "windows"
      ? "Support"
      : tier === "components"
        ? side === "top"
          ? "Race control"
          : "Track map"
        : "";

  return (
    <div
      className={cn(
        "absolute rounded-[7px] border transition-[opacity,border-color,background-color] duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
        tier === "zones"
          ? "border-[#c4a574]/25 bg-[#c4a574]/[0.04]"
          : "border-[#c4a574]/60 bg-[#c4a574]/[0.09]",
      )}
      style={
        side === "top"
          ? { left: "32%", right: "32%", top: "2.5%", height: "8%" }
          : { left: "38%", right: "38%", bottom: "2.5%", height: "8%" }
      }
    >
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center text-[8px] text-[#e0cba8] transition-opacity duration-200 md:text-[11px]",
          label ? "opacity-100" : "opacity-0",
        )}
      >
        {label}
      </span>
    </div>
  );
}

function DecisionBlock({
  decision,
  standalone = false,
}: {
  decision: Decision;
  standalone?: boolean;
}) {
  return (
    <article
      className={cn(
          standalone
          ? "study-text study-card px-6 py-6 md:px-8 md:py-7"
          : "mt-10 rounded-[16px] border border-line px-4 py-5 md:px-5 md:py-6",
      )}
    >
      <p className="text-[13px] text-muted">Decision</p>
      <h4 className="mt-1.5 font-display text-[19px] font-medium tracking-tight text-fg md:text-[21px]">
        {decision.title}
      </h4>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="pair-challenge flex gap-3 rounded-[14px] px-4 py-4 text-[15px] leading-relaxed">
          <Puzzle className="mt-0.5 h-4 w-4 shrink-0 text-[#ffc4c4]" />
          <p>{decision.problem}</p>
        </div>
        <div className="pair-solution flex gap-3 rounded-[14px] px-4 py-4 text-[15px] leading-relaxed">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[#b6f0c8]" />
          <p>{decision.solution}</p>
        </div>
      </div>

      {decision.why ? (
        <ul className="mt-5 list-disc space-y-1.5 pl-5 text-[16px] leading-[1.75] text-muted">
          {decision.why.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      <p className="mt-5 border-l border-white/80 pl-5 text-[16px] leading-relaxed text-fg">
        {decision.outcome}
      </p>
    </article>
  );
}

export function F1SpatialDecision() {
  return <DecisionBlock decision={spatialZonesDecision} standalone />;
}

export function F1SpatialModel() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const tier = tiers[index];

  return (
    <div>
      <div className="study-card px-5 py-8 md:px-10 md:py-10">
        <div
          role="tablist"
          aria-label="Spatial content model"
          className="mx-auto mb-8 grid w-max max-w-full grid-flow-col auto-cols-fr rounded-lg border border-line bg-card p-1"
        >
          {tiers.map((item, i) => {
            const active = i === index;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setIndex(i)}
                className={cn(
                  "relative rounded-lg px-3 py-1.5 text-center text-[13px] font-medium transition-colors md:px-4",
                  active ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                {active ? (
                  reduce ? (
                    <span className="absolute inset-0 rounded-lg bg-white/[0.06]" />
                  ) : (
                    <motion.span
                      layoutId="f1-spatial-tab"
                      className="absolute inset-0 rounded-lg bg-white/[0.06]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )
                ) : null}
                <span className="relative z-10 whitespace-nowrap">{item.tab}</span>
              </button>
            );
          })}
        </div>

        <div
          className="relative aspect-[16/9] w-full overflow-hidden rounded-[16px] border border-line bg-black"
          role="img"
          aria-label={`Spatial layout diagram highlighting ${tier.tab.toLowerCase()}`}
        >
          <Support side="top" tier={tier.id} />
          <Support side="bottom" tier={tier.id} />

          <div
            className="absolute rounded-[14px] border border-dashed transition-colors duration-500"
            style={{
              left: "7%",
              right: "7%",
              top: "15%",
              bottom: "15%",
              borderColor:
                tier.id === "zones" ? "rgba(196,165,116,0.7)" : "rgba(196,165,116,0.28)",
            }}
          >
            {(["left", "middle", "right"] as const).map((key) => {
              const zone = zones[key];
              return (
                <div
                  key={key}
                  className={cn(
                    "absolute rounded-[10px] border transition-[opacity,border-color,background-color] duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                    tier.id === "zones"
                      ? "border-white/40 bg-white/[0.02]"
                      : "border-white/[0.07] bg-transparent",
                  )}
                  style={{
                    left: `${zone.left}%`,
                    width: `${zone.width}%`,
                    top: "0%",
                    bottom: "0%",
                  }}
                >
                  <div
                    className={cn(
                      "absolute inset-x-0 top-1/2 -translate-y-1/2 px-1.5 text-center transition-opacity duration-200",
                      tier.id === "zones" ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <p className="text-[10px] font-medium text-fg md:text-[14px]">
                      {zone.label}
                    </p>
                    <p className="mt-1 text-[8px] leading-tight text-muted md:text-[11px]">
                      {zone.holds}
                    </p>
                  </div>
                </div>
              );
            })}

            {panels.map((panel) => (
              <Panel key={panel.id} panel={panel} tier={tier.id} />
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-[52.5rem]">
          <p className="text-[16px] leading-[1.75] text-muted">{tier.lead}</p>
          {tier.points ? (
            <dl className="mt-5 space-y-2.5">
              {tier.points.map((point) => (
                <div key={point.term} className="flex gap-2.5 text-[16px] leading-[1.75]">
                  <dt className="shrink-0 font-medium text-fg">{point.term}</dt>
                  <dd className="text-muted">{point.body}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          {tier.figure ? (
            <figure className="mt-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tier.figure.src}
                alt={tier.figure.alt}
                className="mx-auto block h-auto max-h-[min(520px,70vh)] w-auto max-w-full object-contain"
              />
              <figcaption className="mt-3 text-[15px] leading-relaxed text-muted">
                {tier.figure.caption}
              </figcaption>
            </figure>
          ) : null}
          {tier.decisions.map((decision) => (
            <DecisionBlock key={decision.title} decision={decision} />
          ))}
        </div>
      </div>
    </div>
  );
}
