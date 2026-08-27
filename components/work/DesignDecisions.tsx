import Image from "next/image";
import { Lightbulb, Unplug } from "lucide-react";

export function DecisionGlobe() {
  return (
    <article className="study-text study-card mt-2 px-6 py-6 md:px-8 md:py-7">
      <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
        Globe to Layered Maps
      </h3>

      <p className="mt-5 text-[16px] font-medium text-fg">Stakeholder Vision</p>
      <p className="mt-3 text-[16px] leading-[1.75] text-muted">
        The HESS team wanted the new World Geography curriculum to feel like a
        leap from paper maps: a 3D globe with live geographic data and
        immersive interaction. That vision treated the product as a digital
        spectacle. It did not start from how teachers actually ran a lesson,
        and it would not have survived the constraints we already knew.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-[13px] text-muted">Challenge</p>
          <div className="flex gap-3 rounded-[14px] bg-red-950/45 px-4 py-4 text-[15px] leading-relaxed text-red-200">
            <Unplug className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
            <p>
              Existing tools already provided those experiences. A novel globe
              would also break from the maps students already saw in their books
              and lessons.
            </p>
          </div>
        </div>
        <div>
          <p className="mb-2 text-[13px] text-muted">Solution</p>
          <div className="flex gap-3 rounded-[14px] bg-emerald-950/45 px-4 py-4 text-[15px] leading-relaxed text-emerald-200">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
            <p>
              A layered map system built around the exact maps used throughout
              the curriculum.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[14px] bg-white">
        <Image
          src="/media/world-geography/map-layers.png"
          alt="Map Layers panel with Physical Features, Borders, and Political Division selected"
          width={575}
          height={395}
          className="h-auto w-full"
        />
      </div>

      <p className="mt-6 text-[16px] font-medium text-fg">Why?</p>
      <p className="mt-3 text-[16px] leading-[1.75] text-muted">
        Lessons required mixing political, physical, and border information on
        one map, then revealing capitals or latitude lines only when the
        activity called for them. Layers made that possible on the same image
        teachers already used in books and lectures, so students never had to
        relearn the geography of a page they already knew.
      </p>

      <p className="mt-6 text-[16px] font-medium text-fg">Outcome</p>
      <p className="mt-3 border-l border-white/80 pl-5 text-[16px] leading-relaxed text-fg">
        A simpler system that supported classroom instruction, with the same
        visual language across every learning environment.
      </p>
    </article>
  );
}
