import Image from "next/image";
import { WorkflowClock } from "@/components/work/WorkflowClock";
import { InViewVideo } from "@/components/work/InViewVideo";

function QuoteLine({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 border-l border-white/80 pl-5 text-[16px] leading-relaxed text-fg">
      {children}
    </p>
  );
}

export function InternalTools() {
  return (
    <div className="mt-2">
      <p className="study-text text-[16px] leading-[1.75] text-muted">
        The classroom was only half the problem. Making a new interactive still
        meant a designer and a developer passing files around for twenty minutes
        at a time. That workflow had to get simpler if the product was going to
        scale with the curriculum.
      </p>

      <div className="mt-12">
        <div className="study-text mx-auto text-center">
          <h3 className="font-display text-[22px] font-medium tracking-tight text-fg md:text-[26px]">
            Existing Workflow
          </h3>
          <p className="mt-4 text-[16px] leading-[1.75] text-muted">
            Each map started in InDesign and crawled through export, conversion,
            hand-encoding, and code edits before anyone could even change a title.
          </p>
        </div>
        <WorkflowClock />
      </div>

      <div className="study-text mt-12 rounded-[20px] border border-[#c4a574]/55 bg-[#241f14] px-6 py-6 md:px-8 md:py-7">
        <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
          Additional Problem
        </h3>
        <p className="mt-3 text-[16px] leading-[1.75] text-muted">
          Legends were printed into the map image. Zoom in and they fell apart.
          Change a symbol and you redesigned the file. Every revision paid that
          tax again.
        </p>
      </div>

      <article className="study-text study-card mt-12 px-6 py-6 md:px-8 md:py-8">
        <p className="text-[13px] text-muted">Solution #1</p>
        <h3 className="mt-2 font-display text-[26px] font-medium tracking-tight text-fg md:text-[32px]">
          Dynamic Map Legend
        </h3>
        <p className="mt-3 text-[16px] leading-[1.75] text-muted">
          I pulled the legend out of the artwork and into the interface: a
          panel that sits on the map, stays sharp when you zoom, and updates
          without a new export.
        </p>
        <div className="mt-8 space-y-6">
          <div className="overflow-hidden rounded-[16px] bg-[#d0eaf5]">
            <Image
              src="/media/world-geography/legend-baked.png"
              alt="Map legend baked into the Chile map image"
              width={1024}
              height={550}
              className="h-auto w-full"
            />
          </div>
          <div className="overflow-hidden rounded-[16px] bg-[#d0eaf5]">
            <Image
              src="/media/world-geography/legend-dynamic.png"
              alt="Map Legend interface overlay on the Chile map"
              width={658}
              height={351}
              className="h-auto w-full"
            />
          </div>
        </div>
        <p className="mt-8 text-[16px] font-medium text-fg">Outcome</p>
        <QuoteLine>Reduced map production time from:</QuoteLine>
        <p className="mt-5 text-[32px] font-medium tracking-tight text-fg md:text-[40px]">
          3 days → 1.5 Days
        </p>
      </article>

      <article className="study-text study-card mt-8 px-6 py-6 md:px-8 md:py-8">
        <p className="text-[13px] text-muted">Solution #2</p>
        <h3 className="mt-2 font-display text-[26px] font-medium tracking-tight text-fg md:text-[32px]">
          Interactive Builder
        </h3>
        <p className="mt-4 text-[16px] leading-[1.75] text-muted">
          Then I built a map builder so content teams could upload layers,
          rename them, add or remove one, set the legend, and update titles
          without waiting on engineering.
        </p>
        <div className="mt-8 overflow-hidden rounded-[16px] border border-line bg-black">
          <InViewVideo
            src="/media/world-geography/builder.mp4"
            alt="Interactive map builder in use"
            className="h-auto w-full"
            loop
          />
        </div>
        <p className="mt-8 text-[16px] font-medium text-fg">Outcome</p>
        <QuoteLine>Reduced setup time from:</QuoteLine>
        <p className="mt-5 text-[32px] font-medium tracking-tight text-fg md:text-[40px]">
          10 Minutes → 1 Minute
        </p>
      </article>
    </div>
  );
}
