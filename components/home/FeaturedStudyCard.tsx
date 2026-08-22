import Link from "next/link";
import type { CaseStudyMeta } from "@/content/projects";
import { CardVideo } from "@/components/work/CardVideo";
import { FeaturedDeviceCard } from "@/components/home/FeaturedDeviceCard";

export function FeaturedStudyCard({ study }: { study: CaseStudyMeta }) {
  if (study.carousel) {
    return <FeaturedDeviceCard study={study} />;
  }

  if (!study.video) return null;

  return (
    <Link href={study.href} className="group block">
      <article className="overflow-hidden rounded-[24px] border border-line bg-card transition-[border-color,transform] duration-500 group-hover:-translate-y-0.5 group-hover:border-line-strong">
        <div className="relative aspect-[16/10] overflow-hidden bg-black md:aspect-[16/8.4]">
          <CardVideo
            src={study.video}
            poster={study.poster}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
        <div className="px-6 py-6 md:px-8 md:py-7">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="font-display text-[23px] font-medium tracking-[-0.03em] md:text-[27px]">
              {study.title}
            </h2>
            <p className="text-sm text-muted">{study.category}</p>
          </div>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            {study.summary}
          </p>
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
      </article>
    </Link>
  );
}
