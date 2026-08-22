"use client";

import { Reveal } from "@/components/motion/Reveal";
import { PageWidth } from "@/components/layout/PageWidth";
import { FolderCard, type FolderItem } from "./FolderCard";

export function WorkIndex({ items }: { items: FolderItem[] }) {
  return (
    <section className="px-6 py-24 md:px-12 lg:px-16">
      <PageWidth>
      <Reveal className="text-center">
        <p className="font-display text-[29px] font-medium tracking-[-0.04em] md:text-[38px]">
          Designing, Building, Exploring
        </p>
        <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-muted">
          A mix of product design, web experiences, and experimental projects driven by
          curiosity and craft.
        </p>
      </Reveal>
      <div className="mt-10 flex flex-wrap justify-center gap-5 pt-4">
        {items.map((item, i) => (
          <Reveal key={item.href} delay={i * 0.06} className="w-full max-w-folder">
            <FolderCard item={item} />
          </Reveal>
        ))}
      </div>
      </PageWidth>
    </section>
  );
}
