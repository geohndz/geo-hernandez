import Link from "next/link";
import { awards } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { PageWidth } from "@/components/layout/PageWidth";
import { AwardList } from "@/components/work/AwardList";

export function AwardsTeaser() {
  const featured = awards.filter((a) => a.featured);

  return (
    <section className="px-6 pb-8 md:px-12 lg:px-16">
      <PageWidth>
      <Reveal className="text-center">
        <h2 className="font-display text-[29px] font-medium tracking-[-0.04em] md:text-[36px]">
          Featured Achievements
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
          National and regional recognition for interaction design and visual craft, including ADDY Awards, Communication Arts, and collegiate competitions.
        </p>
      </Reveal>
      <div className="mt-8">
        <AwardList items={featured} />
      </div>
      <Reveal className="mt-6 text-center">
        <Link
          href="/about"
          className="inline-flex text-sm text-muted underline decoration-white/20 transition-colors hover:text-fg"
        >
          View All Achievements
        </Link>
      </Reveal>
      </PageWidth>
    </section>
  );
}
