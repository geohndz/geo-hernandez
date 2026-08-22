import type { Metadata } from "next";
import { about, awards, testimonials } from "@/content/site";
import { AwardList } from "@/components/work/AwardList";
import { FooterCta } from "@/components/layout/FooterCta";
import { PageWidth } from "@/components/layout/PageWidth";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: about.seo,
};

export default function AboutPage() {
  return (
    <>
      <section className="px-6 pb-8 pt-16 md:px-12 md:pt-24 lg:px-16">
        <PageWidth>
          <Reveal className="text-center">
            <h1 className="font-display text-[42px] font-medium tracking-[-0.05em] md:text-[55px]">
              About
            </h1>
          </Reveal>
          <div className="mx-auto mt-10 max-w-2xl space-y-5 text-[17px] leading-[1.7] text-muted">
            {about.paragraphs.map((p) => (
              <Reveal key={p}>
                <p className="first:text-fg">{p}</p>
              </Reveal>
            ))}
          </div>
        </PageWidth>
      </section>

      <section className="px-6 py-16 md:px-12 lg:px-16">
        <PageWidth>
          <Reveal>
            <h2 className="mb-8 text-center font-display text-[29px] tracking-[-0.03em]">
              Achievements
            </h2>
          </Reveal>
          <AwardList items={awards} />
        </PageWidth>
      </section>

      <section className="px-6 py-8 md:px-12 lg:px-16">
        <PageWidth>
          <Reveal>
            <h2 className="mb-8 text-center font-display text-[29px] tracking-[-0.03em]">
              Words from Leadership
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {testimonials.map((t) => (
              <Reveal key={t.name}>
                <figure className="rounded-[22px] border border-line bg-card p-6 md:p-8">
                  <blockquote className="text-[15px] leading-relaxed text-muted">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6">
                    <p className="text-sm font-medium text-fg">{t.name}</p>
                    <p className="text-sm text-dim">{t.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </PageWidth>
      </section>

      <FooterCta />
    </>
  );
}
