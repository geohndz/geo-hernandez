import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudyMeta, GalleryProject } from "@/content/projects";
import { DeviceShowcase } from "@/components/work/DeviceShowcase";
import {
  chipAccents,
  chipBase,
  chipCategoryAccents,
  chipCategoryBase,
  chipCategoryHover,
  chipCategoryWhiteOutline,
  type ChipAccent,
} from "@/lib/chip-accents";
import { cn } from "@/lib/cn";

const hoverWashes: Partial<Record<ChipAccent, string>> = {
  purple:
    "hover:[background-image:linear-gradient(145deg,#2a1848_0%,#1a1428_46%,transparent_100%)]",
  green:
    "hover:[background-image:linear-gradient(145deg,#0d3d22_0%,#122018_46%,transparent_100%)]",
  yellow:
    "hover:[background-image:linear-gradient(145deg,#3d3208_0%,#221c10_46%,transparent_100%)]",
  blue: "hover:[background-image:linear-gradient(145deg,#1a2f6e_0%,#141828_46%,transparent_100%)]",
};

export function ExplorationDeviceCard({
  project,
  compact = false,
  hoverWash = "purple",
}: {
  project: GalleryProject;
  compact?: boolean;
  hoverWash?: ChipAccent;
}) {
  const study: CaseStudyMeta = {
    slug: project.slug,
    href: project.href ?? "/creative-explorations",
    title: project.title,
    category: project.category ?? project.kicker ?? "Exploration",
    summary: project.description,
    tags: project.tools ?? project.tags ?? [],
    video: project.video,
    poster: project.image,
  };
  const linked = Boolean(project.href);

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-[24px] border border-line bg-card",
        linked &&
          cn(
            "hover-card group transition-[border-color,background] duration-200 hover:border-line-strong",
            hoverWashes[hoverWash],
          ),
      )}
    >
      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="absolute inset-0 z-[1]"
          aria-label={`Open ${study.title}`}
        />
      ) : null}
      <header
        className={cn(
          "relative z-0 px-6 pt-6",
          compact ? "md:px-6 md:pt-6" : "md:px-8 md:pt-8",
        )}
      >
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-start md:justify-between md:gap-4">
          <div className="order-2 flex min-w-0 items-start gap-2 md:order-1">
            <h2 className="font-display text-[23px] font-medium tracking-[-0.03em] md:text-[27px]">
              {study.title}
            </h2>
            {linked ? <ArrowUpRight className="mt-1.5 h-4 w-4 shrink-0 text-dim" /> : null}
          </div>
          <p
            className={cn(
              chipCategoryBase,
              linked ? chipCategoryAccents[hoverWash] : chipCategoryWhiteOutline,
              linked && chipCategoryHover[hoverWash],
              "order-1 md:order-2",
            )}
          >
            {study.category}
          </p>
        </div>
        <p className="mt-2 w-full text-[15px] leading-relaxed text-muted md:w-4/5">
          {study.summary}
        </p>
        {study.tags.length ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <li key={tag} className={cn(chipBase, linked && chipAccents[hoverWash])}>
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className="relative">
        <DeviceShowcase
          study={study}
          className="mt-3 md:mt-6"
          controls="card"
          compact={compact}
        />
        {project.award ? (
          <a
            href={project.award.href}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "absolute z-10 drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]",
              compact ? "right-3 top-2 w-[88px]" : "right-5 top-3 w-[110px]",
            )}
            aria-label={project.award.label}
          >
            <Image
              src={project.award.src}
              alt={project.award.label}
              width={220}
              height={220}
              className="h-auto w-full"
            />
          </a>
        ) : null}
      </div>
    </article>
  );
}
