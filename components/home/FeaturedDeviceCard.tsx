import Link from "next/link";
import type { CaseStudyMeta } from "@/content/projects";
import { DeviceShowcase } from "@/components/work/DeviceShowcase";
import { cn } from "@/lib/cn";

export function FeaturedDeviceCard({ study }: { study: CaseStudyMeta }) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[24px] border border-line bg-card transition-[border-color,background] duration-500 hover:border-line-strong",
        !study.deviceImage
          ? "hover:[background-image:linear-gradient(145deg,rgba(112,64,196,0.30)_0%,rgba(62,28,118,0.16)_46%,transparent_100%)]"
          : "hover:[background-image:linear-gradient(145deg,rgba(10,78,82,0.38)_0%,rgba(6,42,46,0.20)_46%,transparent_100%)]",
      )}
    >
      <Link
        href={study.href}
        className="absolute inset-0 z-[1]"
        aria-label={study.title}
      />
      <header className="relative z-0 flex flex-col gap-4 px-6 pt-6 md:flex-row md:items-start md:justify-between md:px-8 md:pt-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-[23px] font-medium tracking-[-0.03em] md:text-[27px]">
            {study.title}
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">{study.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line px-2.5 py-1 text-[11px] text-dim"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <p className="shrink-0 self-start rounded-full border border-line px-3 py-1 text-[12px] text-muted">
          {study.category}
        </p>
      </header>

      <DeviceShowcase study={study} className="mt-6" controls="card" />
    </article>
  );
}
