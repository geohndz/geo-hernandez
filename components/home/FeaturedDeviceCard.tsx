import Link from "next/link";
import type { CaseStudyMeta } from "@/content/projects";
import { DeviceShowcase } from "@/components/work/DeviceShowcase";
import {
  chipAccents,
  chipBase,
  chipCategoryAccents,
  chipCategoryBase,
  chipCategoryHover,
} from "@/lib/chip-accents";
import { cn } from "@/lib/cn";

export function FeaturedDeviceCard({ study }: { study: CaseStudyMeta }) {
  const accent = study.deviceImage ? "teal" : "purple";

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[24px] border border-line bg-card transition-[border-color,background] duration-500 hover:border-line-strong",
        accent === "purple"
          ? "hover:[background-image:linear-gradient(145deg,rgba(112,64,196,0.30)_0%,rgba(62,28,118,0.16)_46%,transparent_100%)]"
          : "hover:[background-image:linear-gradient(145deg,rgba(10,78,82,0.38)_0%,rgba(6,42,46,0.20)_46%,transparent_100%)]",
      )}
    >
      <Link
        href={study.href}
        className="absolute inset-0 z-[1]"
        aria-label={study.title}
      />
      <header className="relative z-0 px-6 pt-6 md:px-8 md:pt-8">
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-start md:justify-between md:gap-4">
          <h2 className="order-2 min-w-0 font-display text-[23px] font-medium tracking-[-0.03em] md:order-1 md:text-[27px]">
            {study.title}
          </h2>
          <p
            className={cn(
              chipCategoryBase,
              chipCategoryAccents[accent],
              chipCategoryHover[accent],
              "order-1 md:order-2",
            )}
          >
            {study.category}
          </p>
        </div>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">
          {study.summary}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <li key={tag} className={cn(chipBase, chipAccents[accent])}>
              {tag}
            </li>
          ))}
        </ul>
      </header>

      <DeviceShowcase study={study} className="mt-3 md:mt-6" controls="card" />
    </article>
  );
}
