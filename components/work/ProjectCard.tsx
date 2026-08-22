"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { GalleryProject } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";
import { CardVideo } from "@/components/work/CardVideo";

export function ProjectCard({ project }: { project: GalleryProject }) {
  const media = (
    <div
      className={
        project.kind === "phone"
          ? "relative mx-auto aspect-[9/17] w-[min(52%,240px)] overflow-hidden rounded-[28px] border border-white/10 bg-black shadow-[0_0_0_8px_rgba(0,0,0,0.45)]"
          : "relative aspect-[16/10] overflow-hidden bg-black"
      }
    >
      {project.video ? (
        <CardVideo
          src={project.video}
          poster={project.image}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      ) : project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes={project.kind === "phone" ? "240px" : "80vw"}
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
        />
      ) : null}
    </div>
  );

  const body = (
    <>
      {project.kicker || project.meta ? (
        <p className="text-[12px] uppercase tracking-[0.14em] text-dim">
          {project.kicker ?? project.meta}
        </p>
      ) : null}
      <div className="mt-2 flex items-start justify-between gap-3">
        <h2 className="font-display text-[25px] font-medium tracking-[-0.03em] md:text-[29px]">
          {project.title}
        </h2>
        {project.href ? (
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-dim" />
        ) : null}
      </div>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
        {project.description}
      </p>
      {project.tools ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <li
              key={tool}
              className="rounded-full border border-line px-2.5 py-1 text-[11px] text-dim"
            >
              {tool}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );

  const card = (
    <article className="group overflow-hidden rounded-[24px] border border-line bg-card transition-[border-color,transform] duration-500 hover:-translate-y-0.5 hover:border-white/20">
      {project.kind === "phone" ? (
        <div className="grid items-center gap-8 px-6 py-8 md:grid-cols-[1fr_auto] md:px-10 md:py-10">
          <div>{body}</div>
          <div className="flex justify-center py-4">{media}</div>
        </div>
      ) : (
        <>
          {media}
          <div className="px-6 py-7 md:px-8">{body}</div>
        </>
      )}
    </article>
  );

  return (
    <Reveal>
      {project.href ? (
        <a href={project.href} target="_blank" rel="noreferrer" className="block">
          {card}
        </a>
      ) : (
        card
      )}
    </Reveal>
  );
}
