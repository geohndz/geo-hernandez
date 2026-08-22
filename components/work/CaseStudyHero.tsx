"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import type { CaseFrontmatter } from "@/lib/mdx";

export function CaseStudyHero({
  frontmatter,
  readingMinutes,
  image,
}: {
  frontmatter: CaseFrontmatter;
  readingMinutes: number;
  image?: string;
}) {
  return (
    <header className="relative flex h-[80vh] flex-col justify-end overflow-hidden border-b border-line">
      <div className="absolute inset-0 bg-card">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            preload
            className="object-cover object-center"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 px-6 pb-10 pt-40 md:px-12 md:pb-14 lg:px-16">
        <div className="mx-auto w-full max-w-content">
        <Reveal>
          <h1 className="max-w-4xl font-display text-[38px] font-medium tracking-[-0.05em] md:text-[55px]">
            {frontmatter.title}
          </h1>
          <p className="mt-3 text-sm text-fg/80">
            {frontmatter.eyebrow}
            <span className="mx-2 text-fg/35">·</span>
            {readingMinutes} min read
          </p>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/85">
            {frontmatter.description ?? frontmatter.subtitle}
          </p>
        </Reveal>
        <Reveal className="mt-10 grid max-w-4xl gap-6 border-t border-white/10 pt-8 text-sm md:grid-cols-4">
          <Meta label="Role" value={frontmatter.role} />
          <Meta label="Timeline" value={frontmatter.timeline} />
          <Meta label="Type" value={frontmatter.type} />
          <Meta label="Tools" value={frontmatter.tools.join(", ")} />
        </Reveal>
        </div>
      </div>
    </header>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[13px] text-white/70">{label}</p>
      <p className="mt-1 text-fg">{value}</p>
    </div>
  );
}
