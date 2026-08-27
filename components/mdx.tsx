import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import { DeviceCarousel, F1Visor } from "@/components/work/DeviceShowcase";
import { ResearchBoard } from "@/components/work/ResearchBoard";
import { PhaseCarousel } from "@/components/work/PhaseCarousel";
import { DecisionGlobe } from "@/components/work/DesignDecisions";
import { TeacherTools } from "@/components/work/TeacherTools";
import { Constraints } from "@/components/work/Constraints";
import { InternalTools } from "@/components/work/InternalTools";
import { Validation, Impact, Reflection } from "@/components/work/StudyClose";
import {
  F1Why,
  F1Opportunity,
  F1Solution,
  F1Constraints,
  F1Exploration,
  F1Direction,
  F1Validation,
  F1Reflection,
} from "@/components/work/F1Study";
import { F1VisualDirections } from "@/components/work/F1Directions";
import {
  F1SpatialDecision,
  F1SpatialModel,
} from "@/components/work/F1SpatialModel";
import { F1Modules } from "@/components/work/F1Modules";
import { F1Research } from "@/components/work/F1Research";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function textOf(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (typeof node === "object" && "props" in node) {
    return textOf((node as { props?: { children?: React.ReactNode } }).props?.children);
  }
  return "";
}

function headingId(children: React.ReactNode) {
  return slugify(textOf(children));
}

export function StudyGroup({ children }: { children: React.ReactNode }) {
  return <div className="study-group">{children}</div>;
}

export function Figure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="mt-12">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="mx-auto block h-auto max-h-[min(720px,80vh)] w-auto max-w-full object-contain"
      />
      {caption ? (
        <figcaption className="mt-3 text-center text-[15px] text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

const mapTypes = [
  {
    src: "/media/world-geography/map-base.png",
    label: "Base",
    alt: "Physical terrain map of South America without labels",
  },
  {
    src: "/media/world-geography/map-countries.png",
    label: "Countries and Capitals",
    alt: "South America map labeled with countries and capital cities",
  },
  {
    src: "/media/world-geography/map-physical.png",
    label: "Physical Features",
    alt: "South America map labeled with physical features and regions",
  },
  {
    src: "/media/world-geography/map-political.png",
    label: "Political Divisions",
    alt: "Political map of South America with colored countries and coordinates",
  },
] as const;

export function MapTypes() {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10">
      {mapTypes.map((item) => (
        <figure key={item.label}>
          <div className="overflow-hidden rounded-[10px] bg-[#d0eaf5]">
            <Image
              src={item.src}
              alt={item.alt}
              width={900}
              height={1160}
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-3 text-center text-[15px] text-muted">{item.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function WhyBuildIt() {
  const ideas = [
    "Interactive globes",
    "Real-time geographic data",
    "Complete teacher control",
    "Highly immersive experiences",
  ];

  return (
    <div className="study-text">
      <div className="study-card px-6 py-6 md:px-8 md:py-7">
        <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
          Why Build It?
        </h3>
        <p className="mt-3 text-[16px] leading-[1.75] text-muted">
          The project started when Abeka&apos;s HESS team (History, English, and
          Social Studies) brought us a new World Geography curriculum and a
          big ask: make it feel digital. The temptation was spectacle. The job
          was a class period.
        </p>
      </div>
      <p className="mt-10 text-center text-[16px] leading-[1.75] text-muted">They imagined:</p>
      <ul className="mx-auto mt-5 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
        {ideas.map((idea) => (
          <li
            key={idea}
            className="flex items-center justify-center rounded-full border border-line bg-card px-5 py-2.5 text-center text-[15px] leading-none text-fg"
          >
            {idea}
          </li>
        ))}
      </ul>
      <p className="mt-10 text-center text-[16px] leading-[1.75] text-muted">
        Meanwhile, teachers were already stuck. A geography period meant a pile
        of paper maps: political, physical, borders, latitude and longitude.
        They could swap them. They could not stack them. Whatever the last map
        had shown disappeared the moment the next one went up. That is the
        interaction they needed: keep the map, shuffle what sits on top.
      </p>
    </div>
  );
}

export function Opportunity() {
  return (
    <div className="study-text study-card mt-10 px-6 py-6 md:px-8 md:py-7">
      <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
        Opportunity
      </h3>
      <p className="mt-3 text-[16px] leading-[1.75] text-muted">
        In conversation after conversation, teachers said the same thing in
        different words.
      </p>
      <p className="mt-4 border-l border-white/80 pl-5 text-[16px] leading-relaxed text-fg">
        Give us the ability to mix and match information based on the lesson
        we&apos;re teaching.
      </p>
      <p className="mt-4 text-[16px] leading-[1.75] text-muted">
        A few even sketched it as transparent overlays: keep the map, shuffle
        what sits on top. That was the opening. Not a new globe. A stack
        teachers already knew how to teach from, rebuilt as a system.
      </p>
    </div>
  );
}

export function ResearchClusters() {
  const clusters = [
    {
      title: "Feature Identification",
      body: "Find the river, the mountain, the city, then keep it on screen while the conversation moves.",
    },
    {
      title: "Geography & Human Activity",
      body: "Show why a civilization settled here, which means terrain and borders in the same view.",
    },
    {
      title: "Mapping Exercises",
      body: "Compare regions against each other, not just name them in isolation.",
    },
    {
      title: "Classroom Collaboration",
      body: "Mark the map together so the whole class is looking at the same decision.",
    },
  ];

  return (
    <div className="study-text mt-8">
      <p className="text-[16px] leading-[1.75] text-muted">
        Those activities weren&apos;t random. They kept falling into the same
        four jobs, which is what let me design a small set of tools instead of
        a feature for every request.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {clusters.map((item) => (
          <div key={item.title} className="study-card p-5 md:p-6">
            <p className="font-medium tracking-tight text-fg">{item.title}</p>
            <p className="mt-2 text-[16px] leading-[1.75] text-muted">{item.body}</p>
          </div>
        ))}
      </div>
      <div className="study-card mt-4 border-[#a78bfa]/70 bg-[rgba(112,64,196,0.14)] p-5 md:p-6">
        <p className="font-medium tracking-tight text-fg">Key Insight</p>
        <p className="mt-2 text-[16px] leading-[1.75] text-[#d4c4ff]">
          Teachers weren&apos;t asking for more map. They were asking to
          rearrange the one they already had.
        </p>
      </div>
    </div>
  );
}

export function Pause() {
  return (
    <div className="study-text mt-12 rounded-[20px] border border-[#c4a574]/55 bg-[#241f14] px-6 py-6 md:px-8 md:py-7">
      <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
        Pause
      </h3>
      <p className="mt-3 text-[16px] leading-[1.75] text-muted">
        Then the third-party maps failed a curriculum review, and work stopped
        for about a year.
      </p>
      <p className="mt-3 text-[16px] leading-[1.75] text-muted">
        When it came back, I was the only designer on it, which meant I also
        owned what it should become: not a more impressive map, but a system a
        teacher could run a period with, and a team could still update next year.
      </p>
    </div>
  );
}

export function VisualRefinements() {
  const items = [
    {
      title: "Simplified Navigation",
      body: "Controls that used to compete for attention collapsed into a structure you can read at a glance.",
    },
    {
      title: "Improved Information Hierarchy",
      body: "The lesson sits in front. Chrome sits behind it.",
    },
    {
      title: "More Flexible Layout",
      body: "Room for a pen, a pin, and whatever teaching tool came next, without redrawing the product. The layout had to behave like a system, not a mockup of a map.",
    },
    {
      title: "Stronger Visual Identity",
      body: "It started to look like something you would project in a classroom, not a prototype of a map.",
    },
  ];

  return (
    <div className="study-text mt-8">
      <h3 className="text-center font-display text-[22px] font-medium tracking-tight text-fg md:text-[26px]">
        Visual Refinements
      </h3>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.title} className="study-card p-5 md:p-6">
            <p className="font-medium tracking-tight text-fg">
              {item.title}
            </p>
            <p className="mt-2 text-[16px] leading-[1.75] text-muted">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <p className="study-text mt-8 border-l border-white/80 pl-5 text-[16px] leading-relaxed text-fg">
      {children}
    </p>
  );
}

export function Decision({
  number,
  title,
  problem,
  solution,
  why,
}: {
  number: string;
  title: string;
  problem: string;
  solution: string;
  why: string;
}) {
  return (
    <article className="study-text study-card mt-4 px-6 py-6 md:px-8 md:py-7">
      <p className="text-[13px] text-muted">Decision {number}</p>
      <h3 className="mt-2 font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
        {title}
      </h3>
      <dl className="mt-5 space-y-4 text-[16px] leading-[1.75]">
        <div>
          <dt className="text-[13px] text-muted">Problem</dt>
          <dd className="mt-1 text-muted">{problem}</dd>
        </div>
        <div>
          <dt className="text-[13px] text-muted">Solution</dt>
          <dd className="mt-1 text-muted">{solution}</dd>
        </div>
        <div>
          <dt className="text-[13px] text-muted">Why</dt>
          <dd className="mt-1 text-muted">{why}</dd>
        </div>
      </dl>
    </article>
  );
}

export function Steps({
  items = [],
}: {
  items?: { title: string; body: string }[];
}) {
  return (
    <ol className="study-text mt-8 grid gap-4 md:grid-cols-3">
      {items.map((item, i) => (
        <li key={item.title} className="study-card p-5">
          <p className="text-[12px] tabular-nums text-dim">
            {String(i + 1).padStart(2, "0")}
          </p>
          <p className="mt-2 font-medium tracking-tight">{item.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function Metrics({
  items = [],
}: {
  items?: { label: string; from: string; to: string }[];
}) {
  return (
    <div className="study-text mt-8 grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="study-card p-6">
          <p className="text-sm text-dim">{item.label}</p>
          <p className="mt-3 text-[29px] font-medium tracking-tight">
            <span className="text-dim line-through decoration-white/20">{item.from}</span>
            <span className="mx-3 text-dim">→</span>
            <span>{item.to}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export function CardStack({ children }: { children: React.ReactNode }) {
  return <div className="study-text mt-8 space-y-4">{children}</div>;
}

export function Constraint({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className="study-card p-5 md:px-6 md:py-5">
      <p className="text-[13px] text-muted">{number}</p>
      <p className="mt-2 font-medium tracking-tight text-fg">{title}</p>
      <p className="mt-2 text-[16px] leading-[1.75] text-muted">{body}</p>
    </div>
  );
}

export function MetricRow({ children }: { children: React.ReactNode }) {
  return <div className="study-text mt-8 grid gap-4 sm:grid-cols-2">{children}</div>;
}

export function Metric({
  label,
  from,
  to,
}: {
  label: string;
  from: string;
  to: string;
}) {
  return (
    <div className="study-card p-6">
      <p className="text-sm text-dim">{label}</p>
      <p className="mt-3 text-[29px] font-medium tracking-tight">
        <span className="text-dim line-through decoration-white/20">{from}</span>
        <span className="mx-3 text-dim">→</span>
        <span>{to}</span>
      </p>
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  StudyGroup,
  Figure,
  MapTypes,
  WhyBuildIt,
  Opportunity,
  ResearchClusters,
  VisualRefinements,
  Pause,
  DecisionGlobe,
  Callout,
  Decision,
  ResearchBoard,
  PhaseCarousel,
  DeviceCarousel,
  F1Visor,
  TeacherTools,
  Constraints,
  InternalTools,
  Validation,
  Impact,
  Reflection,
  F1Why,
  F1Opportunity,
  F1Solution,
  F1Constraints,
  F1Exploration,
  F1VisualDirections,
  F1Direction,
  F1SpatialDecision,
  F1SpatialModel,
  F1Research,
  F1Modules,
  F1Validation,
  F1Reflection,
  Steps,
  Metrics,
  Constraint,
  CardStack,
  Metric,
  MetricRow,
  h2: ({ children }) => (
    <h2
      id={headingId(children)}
      className="study-heading study-text mt-28 mb-10 scroll-mt-28 font-display text-[29px] font-medium tracking-[-0.03em] md:text-[34px]"
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="study-text font-display text-[21px] font-medium tracking-tight">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="study-text mt-4 text-[16px] leading-[1.75] text-muted">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="study-text mt-4 list-disc space-y-2 pl-5 text-[16px] leading-relaxed text-muted">
      {children}
    </ul>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => <strong className="font-medium text-fg">{children}</strong>,
};
