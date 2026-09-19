import Link from "next/link";
import type { CaseStudyMeta } from "@/content/projects";
import { CardVideo } from "@/components/work/CardVideo";
import { FeaturedDeviceCard } from "@/components/home/FeaturedDeviceCard";
import {
  chipAccents,
  chipBase,
  chipCategoryAccents,
  chipCategoryBase,
  chipCategoryHover,
} from "@/lib/chip-accents";
import { cn } from "@/lib/cn";

export function FeaturedStudyCard({ study }: { study: CaseStudyMeta }) {
  if (study.carousel) {
    return <FeaturedDeviceCard study={study} />;
  }

  if (!study.video) return null;

  return (
    <Link href={study.href} className="group block">
      <article className="hover-card overflow-hidden rounded-[24px] border border-line bg-card transition-[border-color,background] duration-200 group-hover:border-line-strong group-hover:[background-image:linear-gradient(145deg,#2a1848_0%,#1a1428_46%,transparent_100%)]">
        <div className="relative aspect-[16/10] overflow-hidden bg-black md:aspect-[16/8.4]">
          <CardVideo
            src={study.video}
            poster={study.poster}
            className="hover-media h-full w-full object-cover transition-transform duration-200"
          />
        </div>
        <div className="px-6 py-6 md:px-8 md:py-7">
          <div className="flex flex-col items-start gap-3 md:flex-row md:items-start md:justify-between md:gap-4">
            <h2 className="order-2 min-w-0 font-display text-[23px] font-medium tracking-[-0.03em] md:order-1 md:text-[27px]">
              {study.title}
            </h2>
            <p
              className={cn(
                chipCategoryBase,
                chipCategoryAccents.purple,
                chipCategoryHover.purple,
                "order-1 md:order-2",
              )}
            >
              {study.category}
            </p>
          </div>
          <p className="mt-3 w-full text-[15px] leading-relaxed text-muted md:w-4/5">
            {study.summary}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <li key={tag} className={cn(chipBase, chipAccents.purple)}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Link>
  );
}
