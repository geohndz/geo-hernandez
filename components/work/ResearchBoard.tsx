"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LayoutGroup, motion } from "motion/react";
import { cn } from "@/lib/cn";
import { isReallyVisible } from "@/lib/in-view";

type BucketId =
  | "annotations"
  | "cities"
  | "physical"
  | "identification"
  | "terrain";

const buckets: {
  id: BucketId;
  title: string;
  header: string;
  fill: string;
  border: string;
}[] = [
  {
    id: "annotations",
    title: "Map Features and Annotations",
    header: "bg-[#7c5cbf] text-white",
    fill: "bg-[#efe8f8]",
    border: "border-[#c4b5e0]",
  },
  {
    id: "cities",
    title: "Geography and Major Cities",
    header: "bg-[#3b82f6] text-white",
    fill: "bg-[#e8f1fc]",
    border: "border-[#93c5fd]",
  },
  {
    id: "physical",
    title: "Physical Features and Mapping",
    header: "bg-[#4ade80] text-[#14532d]",
    fill: "bg-[#eafae8]",
    border: "border-[#86efac]",
  },
  {
    id: "identification",
    title: "Feature Identification and Comparison",
    header: "bg-[#67e8f9] text-[#164e63]",
    fill: "bg-[#e7fbfd]",
    border: "border-[#a5f3fc]",
  },
  {
    id: "terrain",
    title: "Terrain and Climate Effects",
    header: "bg-[#84cc16] text-[#1a2e05]",
    fill: "bg-[#f1f8e4]",
    border: "border-[#bef264]",
  },
];

const notes: { id: string; text: string; bucket: BucketId }[] = [
  { id: "n1", bucket: "identification", text: "Have students identify major features" },
  {
    id: "n2",
    bucket: "annotations",
    text: "Use the unlabeled map for quizzes where students come up and annotate features",
  },
  {
    id: "n3",
    bucket: "cities",
    text: "Discuss how geography influences where people live and build cities",
  },
  {
    id: "n4",
    bucket: "physical",
    text: "Compare physical map with political map to see how borders sometimes follow natural features",
  },
  { id: "n5", bucket: "identification", text: "Annotate or trace major features" },
  {
    id: "n6",
    bucket: "terrain",
    text: "Have students color-code different elevation zones or climate regions",
  },
  {
    id: "n7",
    bucket: "annotations",
    text: "Create scavenger hunts where students race to locate specific features, countries, etc",
  },
  {
    id: "n8",
    bucket: "cities",
    text: "Mark the locations where major people groups established",
  },
  {
    id: "n9",
    bucket: "annotations",
    text: "Have students take turns marking features while explaining what they know",
  },
  {
    id: "n10",
    bucket: "annotations",
    text: "Start with blank map, each student adds one label until it's complete",
  },
  { id: "n11", bucket: "identification", text: "Draw circles around features and compare sizes" },
  {
    id: "n12",
    bucket: "annotations",
    text: "Show unlabeled, student makes prediction by marking with a star, then reveal labeled to check",
  },
  {
    id: "n13",
    bucket: "annotations",
    text: "Call out a feature, student must touch/mark the correct location",
  },
  {
    id: "n14",
    bucket: "annotations",
    text: "Student draws arrows, symbols, or shapes to help class guess a feature without words",
  },
  {
    id: "n15",
    bucket: "cities",
    text: "Students place dots where they think major cities might be located based on geography",
  },
  {
    id: "n16",
    bucket: "terrain",
    text: "Students draw a route across Africa, must explain how terrain affects their journey",
  },
  {
    id: "n17",
    bucket: "physical",
    text: "Draw/place icons showing where different animals live based on terrain",
  },
  {
    id: "n18",
    bucket: "physical",
    text: "Mark areas vulnerable to drought, flooding, etc., based on physical features",
  },
];

function noteTilt(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return (hash % 11) - 5;
}

function Sticky({
  note,
  sorted,
  delay,
}: {
  note: (typeof notes)[number];
  sorted: boolean;
  delay: number;
}) {
  return (
    <motion.article
      layout
      layoutId={note.id}
      transition={{
        layout: { type: "spring", stiffness: 380, damping: 34, delay },
      }}
      className="relative aspect-square w-[7.4rem] overflow-hidden rounded-[3px] bg-[#ffc9d6] px-2 pb-5 pt-2.5 shadow-[0_5px_12px_rgba(30,20,40,0.12)] md:w-[8rem]"
      style={{
        rotate: sorted ? 0 : noteTilt(note.id),
        clipPath:
          "polygon(1.5% 0.8%, 98.4% 0%, 100% 3%, 99.2% 97.4%, 97% 100%, 2.4% 99.1%, 0% 96.5%, 0.8% 2.6%)",
      }}
    >
      <p className="text-center text-[10px] leading-snug text-[#2a2a2a] md:text-[11px]">
        {note.text}
      </p>
      <p className="absolute bottom-1.5 left-2 text-[8px] text-[#6b4a55]">Geo Hernandez</p>
    </motion.article>
  );
}

export function ResearchBoard() {
  const [sorted, setSorted] = useState(false);
  const boardRef = useRef<HTMLElement>(null);
  const autoSorted = useRef(false);
  const timer = useRef<number>(0);
  const grouped = useMemo(
    () =>
      buckets.map((bucket) => ({
        ...bucket,
        notes: notes.filter((note) => note.bucket === bucket.id),
      })),
    [],
  );

  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(timer.current);
        if (autoSorted.current || !isReallyVisible(entry)) return;
        timer.current = window.setTimeout(() => {
          autoSorted.current = true;
          setSorted(true);
        }, 1000);
      },
      { threshold: [0, 0.25, 0.5, 1], rootMargin: "-12% 0px" },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer.current);
    };
  }, []);

  function selectSorted(next: boolean) {
    window.clearTimeout(timer.current);
    autoSorted.current = true;
    setSorted(next);
  }

  return (
    <figure ref={boardRef} className="mt-10">
      <div
        role="tablist"
        aria-label="Research board view"
        className="mx-auto mb-4 grid w-max max-w-full grid-flow-col auto-cols-fr rounded-lg border border-line bg-card p-1"
      >
        {(
          [
            [false, "Scattered notes"],
            [true, "Sorted into themes"],
          ] as const
        ).map(([value, label]) => {
          const active = sorted === value;
          return (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => selectSorted(value)}
              className={cn(
                "relative rounded-lg px-4 py-1.5 text-center text-[13px] font-medium transition-colors",
                active ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              {active ? (
                <motion.span
                  layoutId="research-tab"
                  className="absolute inset-0 rounded-lg bg-white/[0.06]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              ) : null}
              <span className="relative z-10 whitespace-nowrap">{label}</span>
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#ececee] shadow-[0_24px_70px_rgba(0,0,0,0.35)]">

        <LayoutGroup>
          <div
            className="relative px-3 py-4 md:px-5 md:py-5"
            style={{
              backgroundImage: "radial-gradient(#c9c9ce 0.9px, transparent 0.9px)",
              backgroundSize: "16px 16px",
            }}
          >
            {sorted ? (
              <div className="space-y-3">
                {grouped.map((bucket, bucketIndex) => (
                  <motion.section
                    key={bucket.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: bucketIndex * 0.05, duration: 0.35 }}
                    className={cn("rounded-[16px] border p-3 pt-4 md:p-4", bucket.fill, bucket.border)}
                  >
                    <p
                      className={cn(
                        "mb-3 inline-flex rounded-full px-3 py-1 text-[11px] font-medium",
                        bucket.header,
                      )}
                    >
                      {bucket.title}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {bucket.notes.map((note, i) => (
                        <Sticky
                          key={note.id}
                          note={note}
                          sorted
                          delay={0.04 + bucketIndex * 0.03 + i * 0.02}
                        />
                      ))}
                    </div>
                  </motion.section>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-2">
                {notes.map((note, i) => (
                  <Sticky key={note.id} note={note} sorted={false} delay={i * 0.015} />
                ))}
              </div>
            )}
          </div>
        </LayoutGroup>
      </div>
      <figcaption className="mt-3 text-center text-[13px] text-muted">
        I grouped classroom activities from those conversations into the themes
        that kept repeating.
      </figcaption>
    </figure>
  );
}
