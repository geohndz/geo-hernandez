import type { Metadata } from "next";
import { about, awards, testimonials } from "@/content/site";
import { AboutPortrait } from "@/components/about/AboutPortrait";
import { AwardList } from "@/components/work/AwardList";
import { FooterCta } from "@/components/layout/FooterCta";
import { PageWidth } from "@/components/layout/PageWidth";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: about.seo,
};

const [lead, ...rest] = about.paragraphs;

export default function AboutPage() {
  return (
    <>
      <section className="px-6 pb-8 pt-16 md:px-12 md:pt-24 lg:px-16">
        <PageWidth>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-x-12 md:gap-y-0 lg:gap-x-16">
            <Reveal className="order-1 min-w-0 md:col-start-1 md:row-start-1">
              <h1 className="max-w-xl font-display text-[34px] font-medium leading-[1.15] tracking-[-0.04em] md:text-[46px]">
                {lead}
              </h1>
            </Reveal>

            <div className="relative order-2 mx-auto w-full max-w-[460px] self-stretch md:col-start-2 md:row-span-2 md:row-start-1 md:mx-0 md:max-w-none">
              <div className="md:sticky md:top-16">
                <AboutPortrait />
              </div>
            </div>

            <div className="order-3 min-w-0 md:col-start-1 md:row-start-2 md:mt-10">
              <div className="space-y-5 text-[16px] leading-[1.75] text-muted md:text-[17px]">
                {rest.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </PageWidth>
      </section>

      <section className="px-6 py-16 md:px-12 lg:px-16">
        <PageWidth>
          <Reveal>
            <h2 className="mb-8 font-display text-[29px] tracking-[-0.03em] md:text-[34px]">
              Achievements
            </h2>
          </Reveal>
          <AwardList items={awards} />
        </PageWidth>
      </section>

      <section className="px-6 py-8 md:px-12 lg:px-16">
        <PageWidth>
          <Reveal>
            <h2 className="mb-8 font-display text-[29px] tracking-[-0.03em] md:text-[34px]">
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
