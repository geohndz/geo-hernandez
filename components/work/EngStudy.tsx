"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

function EngStill({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label: string;
}) {
  return (
    <figure>
      <div className="overflow-hidden rounded-[10px] bg-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="h-auto w-full" />
      </div>
      <figcaption className="mt-3 text-center text-[15px] text-muted">
        {label}
      </figcaption>
    </figure>
  );
}

export function EngWhy() {
  return (
    <div className="study-text mt-2 space-y-4">
      <article className="study-card px-6 py-6 md:px-8 md:py-7">
        <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
          The cost of starting over
        </h3>
        <p className="mt-3 text-[16px] leading-[1.75] text-muted">
          Our team built interactive English lessons that still had to move
          through validation, content revisions, and proofing. When the English
          team requested changes, work often came back to us to rebuild —
          because progress couldn&apos;t be saved and revised through the
          existing workflow.
        </p>
        <p className="mt-4 border-l border-white/80 pl-5 text-[16px] leading-relaxed text-fg">
          A minor content correction could trigger the same production steps as
          a substantial change.
        </p>
      </article>
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <EngStill
          src="/media/english-lesson-authoring/old/01-empty.png"
          alt="Original yellow authoring interface with empty lesson canvas"
          label="The legacy authoring UI"
        />
        <EngStill
          src="/media/english-lesson-authoring/old/04-content-types.png"
          alt="Legacy editor showing dense content-type controls and green tool chrome"
          label="Dense controls, little persistence"
        />
      </div>
      <h3 className="pt-8 font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
        Friction in the old UI
      </h3>
      <p className="text-[16px] leading-[1.75] text-muted">
        Day-to-day authoring meant opaque save steps, caret-style block
        controls, and editing text through browser prompts instead of on the
        page.
      </p>
      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        <EngStill
          src="/media/english-lesson-authoring/old-ui/prep-to-save.png"
          alt="Old UI with prep to save and edit buttons above a yellow ribbon header"
          label="Prep to save — not a clear save-and-continue flow"
        />
        <EngStill
          src="/media/english-lesson-authoring/old-ui/sentence-block.png"
          alt="Old sentence block with green caret controls and class button"
          label="Block controls that read like code, not content tools"
        />
        <EngStill
          src="/media/english-lesson-authoring/old-ui/caret-controls.png"
          alt="Old vertical green X and caret buttons beside a content block"
          label="Cryptic icons for move, indent, and remove"
        />
        <EngStill
          src="/media/english-lesson-authoring/old-ui/text-popup.png"
          alt="Browser prompt saying Enter new text with New sentence selected"
          label="Text edits through a popup, not inline"
        />
      </div>
    </div>
  );
}

export function EngWorkflow() {
  const steps = [
    {
      title: "Build",
      body: "Our team authored the lesson from scratch.",
    },
    {
      title: "Validate",
      body: "The project manager checked it against English-team content.",
    },
    {
      title: "Rebuild",
      body: "Requested changes returned to us — often another full authoring pass.",
    },
    {
      title: "Proof",
      body: "Proofing could send it back through the same cycle again.",
    },
  ];

  return (
    <div className="study-text mt-10">
      <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
        The existing workflow
      </h3>
      <p className="mt-3 text-[16px] leading-[1.75] text-muted">
        A typical authoring pass took around an hour. We estimate five to six
        revision rounds before a lesson went live. Other departments could spot
        what needed to change — they still depended on us to implement it.
      </p>
      <ol className="mt-8 grid gap-4 sm:grid-cols-2">
        {steps.map((step, i) => (
          <li key={step.title} className="study-card p-5">
            <p className="text-[12px] tabular-nums text-dim">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 font-medium tracking-tight text-fg">
              {step.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function EngOpportunity() {
  const goals = [
    {
      number: "01",
      title: "Persist progress",
      body: "Revise an existing lesson instead of recreating it.",
    },
    {
      number: "02",
      title: "Expose authoring in the UI",
      body: "Give non-developers the tools without code edits or popup windows.",
    },
    {
      number: "03",
      title: "Own corrections at the source",
      body: "Let content teams fix issues as close as possible to where they appear.",
    },
  ];

  return (
    <div className="study-text mt-12">
      <div className="study-card px-6 py-6 md:px-8 md:py-7">
        <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
          The opportunity
        </h3>
        <p className="mt-3 text-[16px] leading-[1.75] text-muted">
          Instead of making our team responsible for every stage, what if we
          created the initial structure and let the teams responsible for the
          content manage it directly?
        </p>
      </div>
      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {goals.map((goal) => (
          <li key={goal.number} className="study-card p-5">
            <p className="text-[13px] text-muted">{goal.number}</p>
            <p className="mt-2 font-medium tracking-tight text-fg">
              {goal.title}
            </p>
            <p className="mt-2 text-[16px] leading-[1.75] text-muted">
              {goal.body}
            </p>
          </li>
        ))}
      </ul>
      <figure className="mt-10">
        <div className="overflow-hidden rounded-[14px] border border-line bg-black">
          <video
            className="h-auto w-full"
            src="/media/english-lesson-authoring/old-demo.mp4"
            poster="/media/english-lesson-authoring/old/04-content-types.png"
            muted
            loop
            playsInline
            controls
            preload="metadata"
          />
        </div>
        <figcaption className="mt-3 text-center text-[15px] text-muted">
          The old authoring UI in use — yellow chrome, caret controls, and
          popup-driven edits.
        </figcaption>
      </figure>
    </div>
  );
}

const phaseSlides = {
  1: {
    label: "Phase 1 — Personal MVP",
    slides: [
      {
        src: "/media/english-lesson-authoring/mvp/01-empty.png",
        alt: "Modern white MVP authoring tool with empty lesson state",
        caption:
          "A personal MVP: block-based authoring, word tools, and export — outside the legacy shell.",
      },
      {
        src: "/media/english-lesson-authoring/mvp/02-workspace.png",
        alt: "MVP authoring workspace with content blocks and outline panel",
        caption:
          "Text, media, activities, and tagging in the interface — not buried in code.",
      },
    ],
  },
  2: {
    label: "Phase 2 — Legacy integration",
    slides: [
      {
        src: "/media/english-lesson-authoring/new/01-chrome.png",
        alt: "Production blue authoring UI with edit, save, and export",
        caption:
          "Capabilities integrated into the original files. Student-facing experience unchanged.",
      },
      {
        src: "/media/english-lesson-authoring/new/05-steps.png",
        alt: "Blue production editor with sentence steps and diagram controls",
        caption:
          "Four weeks to ship the first lesson while learning the system as I built.",
      },
      {
        src: "/media/english-lesson-authoring/new/03-content.png",
        alt: "Production authoring tool with content modules on navy background",
        caption:
          "Early lessons meant regressions and back-and-forth — reverting still meant the old bottleneck.",
      },
    ],
  },
  3: {
    label: "Phase 3 — Stabilized workflow",
    slides: [
      {
        src: "/media/english-lesson-authoring/new/02-edit.png",
        alt: "Stable production authoring interface in edit mode",
        caption:
          "Lessons no longer needed reconstruction after every feedback round.",
      },
      {
        src: "/media/english-lesson-authoring/new/04-tools.png",
        alt: "Authoring toolbar and teaching aid chrome in production UI",
        caption:
          "Content owners could revise from the existing state. Production pace changed.",
      },
      {
        src: "/media/english-lesson-authoring/new/06-detail.png",
        alt: "Detail view of production lesson authoring controls",
        caption:
          "Reliable enough for real production — not just a polished prototype.",
      },
    ],
  },
} as const;

export function EngPhases({
  phase = 1,
}: {
  phase?: 1 | 2 | 3 | "1" | "2" | "3";
}) {
  const key = (Number(phase) === 2 ? 2 : Number(phase) === 3 ? 3 : 1) as
    | 1
    | 2
    | 3;
  const config = phaseSlides[key];
  const frameRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [bleedW, setBleedW] = useState(0);

  useLayoutEffect(() => {
    setIndex(0);
  }, [key]);

  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    function measure() {
      if (!el) return;
      const frame = el.getBoundingClientRect();
      setBleedW(Math.max(el.clientWidth, window.innerWidth - frame.left));
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [key]);

  function go(next: number) {
    setIndex((next + config.slides.length) % config.slides.length);
  }

  const slide = config.slides[index];

  return (
    <figure
      ref={frameRef}
      className="study-text mt-8 [container-type:inline-size]"
    >
      <p className="mb-4 text-[13px] text-muted">{config.label}</p>
      <div
        className="relative overflow-hidden"
        style={{ width: bleedW || "100%" }}
      >
        <motion.div
          className="flex gap-5"
          animate={{ x: `calc(${-index} * (100cqw + 1.25rem))` }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 280, damping: 34, mass: 0.8 }
          }
        >
          {config.slides.map((item, i) => {
            const active = i === index;
            return (
              <button
                key={item.src}
                type="button"
                aria-label={item.alt}
                aria-current={active ? "true" : undefined}
                onClick={() => setIndex(i)}
                className="w-[100cqw] shrink-0 text-left"
              >
                <div
                  className={cn(
                    "overflow-hidden rounded-[18px] border border-line bg-[#ececec] transition-opacity duration-500",
                    active ? "opacity-100" : "opacity-45",
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={1024}
                    height={660}
                    className="aspect-[16/10] h-auto w-full object-cover object-top"
                  />
                </div>
              </button>
            );
          })}
        </motion.div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent md:w-36"
        />
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous screen"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-muted hover:text-fg"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <div
          role="tablist"
          aria-label={config.label}
          className="flex min-w-0 flex-1 justify-center gap-1.5"
        >
          {config.slides.map((item, i) => {
            const active = i === index;
            return (
              <button
                key={item.src}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Screen ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 w-5 origin-center rounded-full transition-[transform,background-color] duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                  active
                    ? "scale-x-100 bg-fg"
                    : "scale-x-[0.3] bg-white/25 hover:bg-white/45",
                )}
              />
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next screen"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-muted hover:text-fg"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <figcaption className="mt-4 text-center text-[15px] leading-relaxed text-muted">
        {slide.caption}
      </figcaption>
    </figure>
  );
}

export function EngAuthoring() {
  const groups = [
    { title: "Text blocks", body: "Titles, body, lists — structured in the canvas." },
    { title: "Media", body: "Images and assets without leaving the workspace." },
    { title: "Activities", body: "Sentence activities and diagram builders." },
    { title: "Sentence & word tools", body: "Tagging, case, and grammar markup in-place." },
  ];

  const features = [
    {
      title: "Inline editing instead of popups",
      body: "The old flow asked for text in a browser prompt. The new one lets you select on the page and apply bold, italic, or underline — and set sentence activities to italic — without leaving the canvas.",
      before: {
        src: "/media/english-lesson-authoring/old-ui/text-popup.png",
        alt: "Old browser prompt Enter new text with New sentence selected",
        label: "Before — edit via popup",
      },
      after: {
        src: "/media/english-lesson-authoring/features/inline-format.png",
        alt: "Floating bold, italic, and underline controls above selected text",
        label: "After — format in place",
      },
    },
    {
      title: "Readable block controls + duplicate",
      body: "Caret-style green buttons gave way to clearer icons for delete, reorder, indent, and preview — plus the ability to duplicate an entire activity block.",
      before: {
        src: "/media/english-lesson-authoring/old-ui/caret-controls.png",
        alt: "Old vertical green X and caret buttons beside a content block",
        label: "Before — cryptic carets",
      },
      after: {
        src: "/media/english-lesson-authoring/features/block-controls.png",
        alt: "Vertical activity toolbar with duplicate and reorder",
        label: "After — duplicate and reorder at the block level",
      },
    },
    {
      title: "Safer deletes, clearer save",
      body: "Destructive actions now confirm first. Save and export sit in the header instead of a prep-to-save step that did not feel like continuing work.",
      before: {
        src: "/media/english-lesson-authoring/old-ui/prep-to-save.png",
        alt: "Old prep to save and edit buttons on yellow UI",
        label: "Before — prep to save",
      },
      after: {
        src: "/media/english-lesson-authoring/features/save-export.png",
        alt: "Edit, save, and export controls in production header",
        label: "After — edit, save, export",
      },
    },
  ];

  return (
    <div className="study-text mt-2 space-y-4">
      <article className="study-card px-6 py-6 md:px-8 md:py-7">
        <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
          Tools in the interface
        </h3>
        <p className="mt-3 text-[16px] leading-[1.75] text-muted">
          Roughly 40% of authoring tasks used to require code edits or popup
          windows. The redesign brought those operations into recognizable
          groups so the English team could build and revise without touching
          the underlying code.
        </p>
      </article>
      <ul className="grid gap-4 sm:grid-cols-2">
        {groups.map((group) => (
          <li key={group.title} className="study-card p-5">
            <p className="font-medium tracking-tight text-fg">{group.title}</p>
            <p className="mt-2 text-[16px] leading-[1.75] text-muted">
              {group.body}
            </p>
          </li>
        ))}
      </ul>

      <h3 className="pt-6 font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
        Features that changed the daily work
      </h3>
      <p className="text-[16px] leading-[1.75] text-muted">
        Beyond persistence and export, I pushed authoring closer to how content
        people already think: format in place, reuse blocks, and make mistakes
        recoverable.
      </p>
      <div className="mt-8 space-y-12">
        {features.map((feature) => (
          <div key={feature.title}>
            <p className="font-medium tracking-tight text-fg">{feature.title}</p>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
              {feature.body}
            </p>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <EngStill
                src={feature.before.src}
                alt={feature.before.alt}
                label={feature.before.label}
              />
              <EngStill
                src={feature.after.src}
                alt={feature.after.alt}
                label={feature.after.label}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <EngStill
          src="/media/english-lesson-authoring/features/sentence-italic.png"
          alt="Sentence activity type with italic formatting indicator"
          label="Sentence activities can be italicized from the toolbar"
        />
        <EngStill
          src="/media/english-lesson-authoring/features/delete-confirm.png"
          alt="Confirmation dialog asking Delete this sentence"
          label="Confirmation before destructive actions"
        />
        <EngStill
          src="/media/english-lesson-authoring/features/activity-toolbar.png"
          alt="Horizontal activity toolbar with clearer icon controls"
          label="Cleaner activity toolbar"
        />
      </div>

      <article className="study-card px-6 py-6 md:px-8 md:py-7">
        <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
          Preserve progress, then export
        </h3>
        <p className="mt-3 text-[16px] leading-[1.75] text-muted">
          The biggest improvement wasn&apos;t a particular button. It was
          continuing work on an existing lesson. Saving and exporting became
          part of the workflow — a single self-contained HTML file — so handoff
          no longer meant manually minimizing and combining files.
        </p>
      </article>
    </div>
  );
}

export function EngConstraints() {
  return (
    <div className="study-text mt-2 space-y-4">
      <article className="study-card px-6 py-6 md:px-8 md:py-7">
        <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
          What mattered most
        </h3>
        <p className="mt-3 text-[16px] leading-[1.75] text-muted">
          Integrating into the legacy codebase meant the authoring view
          didn&apos;t always render as cleanly as I wanted. Controls competed
          for space. With a four-week deadline, a full editor restructure risked
          the student-facing experience we had to preserve.
        </p>
      </article>
      <div className="tint-olive rounded-[20px] px-6 py-6 md:px-8 md:py-7">
        <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
          Validating the tradeoff
        </h3>
        <p className="tint-olive-copy mt-3 text-[16px] leading-[1.75]">
          I asked the English team what mattered most. Their priority was the
          finished lesson for students — not polish inside the authoring
          workspace. The project manager agreed: if the structure wasn&apos;t
          breaking the workflow, it didn&apos;t need a rebuild for visual sake.
        </p>
        <p className="mt-4 border-l border-[#c4a574]/80 pl-5 text-[16px] leading-relaxed text-fg">
          Ship reliable authoring and remove bottlenecks. Perfect the chrome
          later — if it still needs it.
        </p>
      </div>
    </div>
  );
}

export function EngPipeline() {
  return (
    <div className="study-text mt-2 grid gap-4 md:grid-cols-2">
      <article className="study-card px-6 py-6 md:px-8 md:py-7">
        <p className="text-[13px] text-muted">Before</p>
        <h3 className="mt-2 font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
          Sequential handoffs
        </h3>
        <p className="mt-3 text-[16px] leading-[1.75] text-muted">
          Our team built, revised, rebuilt, and fixed proofing issues. The cycle
          repeated until the lesson went live. Every content change depended on
          the same bottleneck.
        </p>
      </article>
      <article className="study-card px-6 py-6 md:px-8 md:py-7">
        <p className="text-[13px] text-muted">After</p>
        <h3 className="mt-2 font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
          Shared ownership
        </h3>
        <p className="mt-3 text-[16px] leading-[1.75] text-muted">
          We create the lesson shell. The English team adds and revises content.
          Proofers correct eligible errors themselves. Work no longer returns to
          us for every change.
        </p>
      </article>
      <article className="study-card px-6 py-6 md:col-span-2 md:px-8 md:py-7">
        <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
          Designed for adoption
        </h3>
        <p className="mt-3 text-[16px] leading-[1.75] text-muted">
          The English team took the tool without a formal walkthrough. That
          mattered: a tool that still needed us to explain every operation would
          have preserved the dependency we were trying to remove.
        </p>
      </article>
    </div>
  );
}

export function EngImpact() {
  return (
    <div className="study-text mt-2 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="study-card p-6">
          <p className="text-sm text-dim">Initial authoring pass</p>
          <p className="mt-3 text-[29px] font-medium tracking-tight">
            <span className="text-dim line-through decoration-white/20">
              60 min
            </span>
            <span className="mx-3 text-dim">→</span>
            <span>20 min</span>
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            A 67% cut on the first pass — and subsequent revisions no longer
            meant another full rebuild.
          </p>
        </div>
        <div className="study-card p-6">
          <p className="text-sm text-dim">Revision rounds</p>
          <p className="mt-3 text-[29px] font-medium tracking-tight">
            <span className="text-dim line-through decoration-white/20">
              5–6
            </span>
            <span className="mx-3 text-dim">→</span>
            <span>2–3</span>
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            Content still changes. Those changes stay with the team responsible
            for the content.
          </p>
        </div>
      </div>
      <article className="study-card px-6 py-6 md:px-8 md:py-7">
        <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
          Independent ownership
        </h3>
        <p className="mt-3 text-[16px] leading-[1.75] text-muted">
          The English team took over authoring. Proofers gained the ability to
          correct eligible errors. Routine revisions stopped routing through our
          team by default.
        </p>
      </article>
      <article className="study-card px-6 py-6 md:px-8 md:py-7">
        <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
          Three weeks ahead
        </h3>
        <p className="mt-3 text-[16px] leading-[1.75] text-muted">
          On October 16, 2026, the project manager confirmed the team was three
          weeks ahead of the PCA production schedule, with C-6 and G-17 through
          G-20 uploaded — and our work already through G-28. The schedule lead
          was a team outcome; the redesigned workflow removed several of the
          bottlenecks that had slowed production before.
        </p>
      </article>
    </div>
  );
}

export function EngRole() {
  return (
    <div className="study-text mt-2">
      <article className="study-card px-6 py-6 md:px-8 md:py-7">
        <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
          My role
        </h3>
        <p className="mt-3 text-[16px] leading-[1.75] text-muted">
          Sole UX/UI designer and developer for the redesign: MVP, interface,
          front-end, legacy integration, English-team feature requests, and
          production stabilization — while keeping the student experience
          unchanged.
        </p>
      </article>
    </div>
  );
}

export function EngTeam() {
  const people = [
    {
      name: "Ashlee Oropeza",
      role: "Project Manager",
      body: "Coordinated production, validation, and milestones.",
    },
    {
      name: "Mary See",
      role: "Proofing",
      body: "Lesson quality assurance and the proofing process.",
    },
    {
      name: "Katie Robison",
      role: "Interaction Designer",
      body: "Supported production by helping build several lessons.",
    },
  ];

  return (
    <div className="study-text mt-2">
      <p className="text-[16px] leading-[1.75] text-muted">
        Broader lesson production and validation involved these collaborators.
        I independently led the authoring tool redesign and implementation.
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {people.map((person) => (
          <li key={person.name} className="study-card p-5">
            <p className="font-medium tracking-tight text-fg">{person.name}</p>
            <p className="mt-1 text-[13px] text-muted">{person.role}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              {person.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function EngReflection() {
  return (
    <div className="study-text mt-2">
      <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
        What I learned
      </h3>
      <p className="mt-5 text-[16px] leading-[1.75] text-muted">
        This started as a chance to modernize an interface. It became a lesson
        in designing for the system around a product — real users, changing
        content, and a workflow that has to hold under production constraints.
      </p>
      <p className="mt-5 text-[16px] leading-[1.75] text-muted">
        The hardest part wasn&apos;t adding features. It was making them work
        inside the legacy system without disrupting students. Good design
        doesn&apos;t always mean perfecting every surface. Sometimes it means
        validating which problems matter most, then deciding what to improve
        now.
      </p>
      <p className="mt-5 text-[16px] leading-[1.75] text-muted">
        A lesson that takes 20 minutes to create is useful. A lesson that can
        be revised without rebuilding is better. A workflow where content owners
        make those revisions themselves is better still.
      </p>
      <p className="mt-5 border-l border-white/80 pl-5 text-[16px] leading-relaxed text-fg">
        Build the tool around the way work actually moves, and the impact
        extends far beyond the interface.
      </p>
    </div>
  );
}
