import type { GalleryProject } from "@/content/projects";
import { PhoneShowcase } from "@/components/work/PhoneShowcase";
import {
  chipAccentsActive,
  chipCategoryBase,
  chipCategoryFilled,
  chipTagBase,
} from "@/lib/chip-accents";
import { cn } from "@/lib/cn";

const washes = {
  orange:
    "[background-image:linear-gradient(145deg,#3d2414_0%,#1c1612_46%,#141414_100%)]",
  red: "[background-image:linear-gradient(145deg,#3a1418_0%,#1c1214_46%,#141414_100%)]",
  navy: "[background-image:linear-gradient(145deg,#1a2450_0%,#141828_46%,#141414_100%)]",
  ice: "[background-image:linear-gradient(145deg,#0d3038_0%,#12181c_46%,#141414_100%)]",
} as const;

export function ApplicationArtifactCard({ project }: { project: GalleryProject }) {
  const wash = project.wash ?? "orange";

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-[24px] border border-line-strong bg-card",
        washes[wash],
      )}
    >
      <header className="relative z-0 px-6 pt-6 md:px-8 md:pt-8">
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-start md:justify-between md:gap-4">
          <h2 className="order-2 min-w-0 font-display text-[23px] font-medium tracking-[-0.03em] md:order-1 md:text-[27px]">
            {project.title}
          </h2>
          {project.category ? (
            <p className={cn(chipCategoryBase, chipCategoryFilled[wash], "order-1 md:order-2")}>
              {project.category}
            </p>
          ) : null}
        </div>
        <p className="mt-2 w-full text-[15px] leading-relaxed text-muted md:w-4/5">
          {project.description}
        </p>
        {project.challenge || project.focus ? (
          <dl className="mt-5 w-full space-y-3 text-[13.5px] leading-relaxed md:w-4/5">
            {project.challenge ? (
              <div>
                <dt className="font-medium text-fg">Challenge</dt>
                <dd className="mt-0.5 text-muted">{project.challenge}</dd>
              </div>
            ) : null}
            {project.focus ? (
              <div>
                <dt className="font-medium text-fg">Design focus</dt>
                <dd className="mt-0.5 text-muted">{project.focus}</dd>
              </div>
            ) : null}
          </dl>
        ) : null}
        {project.tags ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className={cn(chipTagBase, chipAccentsActive[wash])}>
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <PhoneShowcase project={project} className="mt-6" controls="card" />
    </article>
  );
}
